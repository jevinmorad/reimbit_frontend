import { api } from '@/api/client';
import { paths } from '@/paths';

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
      api.setAuthToken(accessToken);
      const decodedToken = jwtDecode(accessToken);

      if (decodedToken && 'exp' in decodedToken) {
        tokenExpired(decodedToken.exp);
      }
    } else {
      api.setAuthToken(null);
    }
  } catch (error) {
    throw error;
  }
}
