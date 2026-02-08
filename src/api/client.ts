/**
 * Modern API client built for React Query integration
 *
 * Design principles:
 * - Returns Promise<T> (no wrappers)
 * - Throws ApiError on failure (React Query idiomatic)
 * - Perfect TypeScript inference
 * - Matches backend contract exactly
 */

import axios, {
  AxiosHeaders,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';

import { CONFIG } from '@/global-config';
import { JWT_ACCESS_KEY } from '@/types/constant';
import type {
  ApiClientConfig,
  ApiError,
  ErrorInterceptor,
  PagedResult,
  PostModel,
  RequestInterceptor,
  ResponseInterceptor,
} from './types';

interface FailedRequestPromise {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

interface RefreshTokenResponse {
  [key: string]: string | undefined;
}

/**
 * Modern API Client for React Query integration
 *
 * Features:
 * - Perfect TypeScript inference with `Promise<T>` returns
 * - Automatic error typing as `ApiError`
 * - Safe methods that return errors as values
 */
export class ApiClient {
  private client: AxiosInstance;
  private authToken: string | null = null; // Store locally to apply to defaults
  private isRefreshing = false;
  private failedQueue: FailedRequestPromise[] = [];

  constructor(baseURL: string = '', defaultTimeout: number = 30000) {
    this.client = axios.create({
      baseURL,
      timeout: defaultTimeout,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // Initialize auth token from cookie if available
    // Do not read cookies from client-side; backend manages HttpOnly cookies.
    this.authToken = null;

    this.client.interceptors.request.use(config => {
      const headers = config.headers as AxiosHeaders;

      // Auth Token (if not already set in config headers)
      if (this.authToken && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${this.authToken}`);
      }

      return config;
    });

    this.client.interceptors.response.use(
      response => response,
      async (error: unknown) => {
        if (!axios.isAxiosError(error) || !error.config) {
          return Promise.reject(error);
        }

        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (originalRequest.url?.includes('/api/Security/Account/refresh-token')) {
            this.isRefreshing = false;
            this.processQueue(error, null);
            return Promise.reject(error);
          }

          if (this.isRefreshing) {
            return new Promise<string>((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then(token => {
                if (originalRequest.headers) {
                  originalRequest.headers['Authorization'] = 'Bearer ' + token;
                }
                return this.client(originalRequest);
              })
              .catch(err => {
                return Promise.reject(err);
              });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            // Attempt refresh. Backend uses HttpOnly refresh cookie.
            const response = await this.client.post<RefreshTokenResponse>(
              '/api/Security/Account/refresh-token',
              {}
            );

            const newAccessToken = response.data[JWT_ACCESS_KEY];

            if (newAccessToken) {
              this.setAuthToken(newAccessToken); // Update internal state
              this.processQueue(null, newAccessToken);
              if (originalRequest.headers) {
                originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
              }
              return this.client(originalRequest);
            }
          } catch (err) {
            this.processQueue(err, null);
            return Promise.reject(err);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private processQueue(error: unknown, token: string | null = null): void {
    this.failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token as string);
      }
    });

    this.failedQueue = [];
  }

  /**
   * Configure the API client with all options at once
   */
  configure(config: ApiClientConfig): void {
    if (config.baseURL !== undefined) {
      this.client.defaults.baseURL = config.baseURL;
    }
    if (config.authToken !== undefined) {
      this.authToken = config.authToken;
    }
    if (config.timeout !== undefined) {
      this.client.defaults.timeout = config.timeout;
    }
  }

  setBaseURL(url: string): void {
    this.client.defaults.baseURL = url;
  }

  getBaseURL(): string {
    return this.client.defaults.baseURL || '';
  }

  setAuthToken(token: string | null): void {
    this.authToken = token;
  }

  getAuthToken(): string | null {
    return this.authToken;
  }

  setTimeout(timeout: number): void {
    this.client.defaults.timeout = timeout;
  }

  /**
   * Add request interceptor
   */
  addRequestInterceptor(interceptor: RequestInterceptor): () => void {
    const id = this.client.interceptors.request.use(interceptor);
    return () => this.client.interceptors.request.eject(id);
  }

  /**
   * Add response interceptor (transforms data)
   */
  addResponseInterceptor(interceptor: ResponseInterceptor): () => void {
    const id = this.client.interceptors.response.use(async response => {
      // Apply interceptor to data
      response.data = await interceptor(response.data);
      return response;
    });
    return () => this.client.interceptors.response.eject(id);
  }

  /**
   * Add error interceptor
   */
  addErrorInterceptor(interceptor: ErrorInterceptor): () => void {
    const id = this.client.interceptors.response.use(
      resp => resp,
      async (error: unknown) => {
        // Ensure it's an ApiError before passing to interceptor
        const apiError = await this.normalizeError(error);
        const handledError = await interceptor(apiError);
        return Promise.reject(handledError);
      }
    );
    return () => this.client.interceptors.response.eject(id);
  }

  clearInterceptors(): void {
    this.client.interceptors.request.clear();
    this.client.interceptors.response.clear();
  }

  /**
   * Core request method
   */
  private async request<T>(
    endpoint: string,
    method: string,
    data?: unknown,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const response = await this.client.request<T>({
        url: endpoint,
        method,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      throw await this.normalizeError(error);
    }
  }

  /**
   * Helper to convert any error (Axios/Network) to ApiError
   */
  private async normalizeError(error: unknown): Promise<ApiError> {
    if (this.isApiError(error)) return error;

    let apiError: ApiError;

    if (axios.isAxiosError(error)) {
      const response = error.response;
      const errorData = (response?.data as Partial<ApiError>) || {};

      apiError = Object.assign(new Error(errorData.title || error.message), {
        name: 'ApiError',
        status: response?.status || error.status || 0,
        title: errorData.title || error.message,
        type: errorData.type,
        errors: errorData.errors,
        instance: errorData.instance,
        path: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        isAxiosError: true,
        response: response,
      }) as ApiError;
    } else {
      const message = error instanceof Error ? error.message : 'Unknown error';
      // Generic error
      apiError = Object.assign(new Error(message), {
        name: 'ApiError',
        status: 0,
        title: message,
      }) as ApiError;
    }

    return apiError;
  }

  private isApiError(error: unknown): error is ApiError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'name' in error &&
      (error as Record<string, unknown>).name === 'ApiError'
    );
  }

  /**
   * GET request
   * @typeParam T - Expected response type
   * @param endpoint - API endpoint (e.g., '/users/1')
   * @param config - Optional request configuration
   * @returns Promise resolving to response data
   * @throws {ApiError} On HTTP error or network failure
   * @example
   * ```typescript
   * const user = await api.get<User>('/users/1');
   * const users = await api.get<User[]>('/users', { params: { active: true } });
   * ```
   */
  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>(endpoint, 'GET', undefined, config);
  }

  /**
   * POST request
   * @typeParam T - Expected response type
   * @typeParam TData - Request body type
   * @param endpoint - API endpoint
   * @param data - Request body (JSON object or FormData)
   * @param config - Optional request configuration
   * @returns Promise resolving to response data
   * @throws {ApiError} On HTTP error or network failure
   * @example
   * ```typescript
   * const result = await api.post<Response>('/users', { name: 'Jevin' });
   * const upload = await api.post<Response>('/upload', formData);
   * ```
   */
  async post<T, TData = unknown>(
    endpoint: string,
    data?: TData,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, 'POST', data, config);
  }

  /**
   * PUT request (full resource replacement)
   * @typeParam T - Expected response type
   * @typeParam TData - Request body type
   * @param endpoint - API endpoint
   * @param data - Request body
   * @param config - Optional request configuration
   * @returns Promise resolving to response data
   * @throws {ApiError} On HTTP error or network failure
   */
  async put<T, TData = unknown>(
    endpoint: string,
    data?: TData,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, 'PUT', data, config);
  }

  /**
   * PATCH request (partial resource update)
   * @typeParam T - Expected response type
   * @typeParam TData - Request body type
   * @param endpoint - API endpoint
   * @param data - Partial update data
   * @param config - Optional request configuration
   * @returns Promise resolving to response data
   * @throws {ApiError} On HTTP error or network failure
   */
  async patch<T, TData = unknown>(
    endpoint: string,
    data?: TData,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, 'PATCH', data, config);
  }

  /**
   * DELETE request
   * @typeParam T - Expected response type
   * @param endpoint - API endpoint
   * @param config - Optional request configuration
   * @returns Promise resolving to response data
   * @throws {ApiError} On HTTP error or network failure
   */
  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>(endpoint, 'DELETE', undefined, config);
  }

  /**
   * POST with pagination/filtering (for list endpoints)
   *
   * Automatically merges `filterModel` properties into the request body
   * for backend compatibility.
   *
   * @typeParam T - Item type in the paginated result
   * @typeParam TFilter - Filter model type
   * @param endpoint - API list endpoint (e.g., '/products/list')
   * @param postModel - Pagination and filter parameters
   * @param config - Optional request configuration
   * @returns Promise resolving to paginated result with Data[] and Total
   * @throws {ApiError} On HTTP error or network failure
   * @example
   * ```typescript
   * const result = await api.filter<Product, ProductFilter>('/products/list', {
   *   pageOffset: 0,
   *   pageSize: 20,
   *   sortField: 'name',
   *   sortOrder: 'asc',
   *   filterModel: { category: 'Electronics' }
   * });
   * // result.Data: Product[], result.Total: number
   * ```
   */
  async filter<T, TFilter = unknown>(
    endpoint: string,
    postModel: PostModel<TFilter>,
    config?: AxiosRequestConfig
  ): Promise<PagedResult<T>> {
    const mergedData = { ...postModel, ...postModel.filterModel };
    return this.request<PagedResult<T>>(endpoint, 'POST', mergedData, config);
  }
}

/**
 * Global API client instance
 */
export const api = new ApiClient();

// Initialize from global config
try {
  api.setBaseURL(CONFIG.apiBaseUrl);
} catch (error) {
  console.warn('Failed to load global config, API baseURL not set', error);
}
