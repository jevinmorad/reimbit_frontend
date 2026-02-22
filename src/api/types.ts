import type { InternalAxiosRequestConfig } from "axios";

/**
 * Core API types matching backend contracts
 * These types correspond to ASP.NET Core responses from GlobalExceptionHandler.cs
 */

/**
 * API Error matching ASP.NET Core ValidationProblemDetails
 * Returned by GlobalExceptionHandler for all error responses
 */
export interface ApiError extends Error {
  /**
   * HTTP status code (400, 401, 403, 404, 500, etc.)
   */
  status: number;

  /**
   * Human-readable error title
   * Examples: "Validation failed", "Database operation failed", "Access denied"
   */
  title: string;

  /**
   * RFC 7807 problem type URI
   * Examples: "https://tools.ietf.org/html/rfc7231#section-6.5.1"
   */
  type?: string;

  /**
   * Field-level validation errors from FluentValidation or ModelState
   * Key: field name, Value: array of error messages
   * Example: { "Email": ["Email is required", "Email is invalid"] }
   */
  errors?: Record<string, string[]>;

  /**
   * Problem instance URI
   */
  instance?: string;

  /**
   * Original request path that caused the error
   */
  path?: string;

  /**
   * HTTP method that caused the error
   */
  method?: string;
}

/**
 * Paginated response matching backend PagedResult<T>
 * Returned by filter/list endpoints
 */
export interface PagedResult<T> {
  /**
   * Array of items for current page
   */
  Data: T[];

  /**
   * Total count of items across all pages
   */
  Total: number;
}

/**
 * Post model for filtering/pagination requests
 * Sent to filter/list endpoints
 */
export interface PostModel<TFilter = unknown> {
  /**
   * Page offset (0-based)
   */
  pageOffset: number;

  /**
   * Page size (items per page)
   */
  pageSize: number;

  /**
   * Field name to sort by
   */
  sortField?: string | null;

  /**
   * Sort direction
   */
  sortOrder?: "asc" | "desc" | null;

  /**
   * Filter criteria specific to the entity
   */
  filterModel?: TFilter;
}

/**
 * Options response for dropdowns
 */
export type OptionsResponse = {
    Value: string;
    Label: string;
}

/**
 * Result type for safe methods that return errors as values
 * Discriminated union: either success or error (never both)
 */
export type Result<T, E = ApiError> =
  | { data: T; error: null }
  | { data: null; error: E };

/**
 * Request interceptor function
 * Takes InternalAxiosRequestConfig (standard for Axios interceptors)
 */
export type RequestInterceptor = (
  config: InternalAxiosRequestConfig
) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;

/**
 * Response interceptor function
 * Can modify response data after receiving
 */
export type ResponseInterceptor = <T>(data: T) => T | Promise<T>;

/**
 * Error interceptor function
 * Can modify or handle errors
 */
export type ErrorInterceptor = (
  error: ApiError
) => ApiError | Promise<ApiError>;

/**
 * Configuration options for ApiClient.configure()
 * Use this to configure the API client once at app initialization
 */
export interface ApiClientConfig {
  /**
   * Base URL for all API requests
   * Example: 'https://api.example.com'
   */
  baseURL?: string;

  /**
   * JWT authentication token
   * Automatically added as Bearer token to all requests
   */
  authToken?: string | null;

  /**
   * Default request timeout in milliseconds
   * Default: 30000 (30 seconds)
   */
  timeout?: number;
}

/**
 * Standard response for state-modifying operations (POST, PUT, DELETE)
 */
export interface OperationResponse {
  /**
   * Number of rows affected by the operation
   */
  rowsAffected: number;
  
  /**
   * Optional message from the server
   */
  message?: string;
}

/**
 * Callback handler for successful operations
 */
export type SuccessHandler = (isUpdate: boolean, rowsAffected?: number) => void;

/**
 * Callback handler for failed operations
 */
export type ErrorHandler = (error: ApiError) => void;
