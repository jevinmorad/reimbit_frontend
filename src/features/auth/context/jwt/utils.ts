import { api } from '@/api/client';
import { paths } from '@/paths';
import { JWT_STORAGE_KEY } from '@/types/constant';

// ----------------------------------------------------------------------
// localStorage helpers
// ----------------------------------------------------------------------

/**
 * Get stored accessToken from localStorage
 */
export function getStoredAccessToken(): string | null {
  try {
    return localStorage.getItem(JWT_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to get token from localStorage:', error);
    return null;
  }
}

/**
 * Store accessToken in localStorage
 */
export function setStoredAccessToken(token: string): void {
  try {
    localStorage.setItem(JWT_STORAGE_KEY, token);
  } catch (error) {
    console.error('Failed to store token in localStorage:', error);
  }
}

/**
 * Remove accessToken from localStorage
 */
export function clearStoredAccessToken(): void {
  try {
    localStorage.removeItem(JWT_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear token from localStorage:', error);
  }
}

// ----------------------------------------------------------------------
// JWT utilities
// ----------------------------------------------------------------------

export function jwtDecode(token: string) {
  // eslint-disable-next-line no-useless-catch
  try {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length < 2) {
      throw new Error('Invalid token!');
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));

    return decoded;
  } catch (error) {
    throw error;
  }
}

export function isValidToken(accessToken: string) {
  if (!accessToken) {
    return false;
  }

  try {
    const decoded = jwtDecode(accessToken);

    if (!decoded || !('exp' in decoded)) {
      return false;
    }

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
}

export function tokenExpired(exp: number) {
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;
  
  setTimeout(() => {
    // eslint-disable-next-line no-useless-catch
    try {
      api.setAuthToken(null);
      clearStoredAccessToken(); // Clear from localStorage
      window.location.href = paths.auth.login;
    } catch (error) {
      throw error;
    }
  }, timeLeft);
}

export async function setSession(accessToken: string | null) {
  // eslint-disable-next-line no-useless-catch
  try {
    if (accessToken) {
      // Set in API client (for immediate use)
      api.setAuthToken(accessToken);
      
      // Persist to localStorage (for page reloads)
      setStoredAccessToken(accessToken);
      
      const decodedToken = jwtDecode(accessToken);

      if (decodedToken && 'exp' in decodedToken) {
        tokenExpired(decodedToken.exp);
      }
    } else {
      // Clear from API client
      api.setAuthToken(null);
      
      // Clear from localStorage
      clearStoredAccessToken();
    }
  } catch (error) {
    throw error;
  }
}
