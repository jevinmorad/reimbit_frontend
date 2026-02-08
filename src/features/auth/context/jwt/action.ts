import { api } from '@/api/client';
import { setSession } from './utils';

type AuthTokenResponse = {
  accessToken: string;
  refreshToken: string;
  user: object;
};

const endpoints = {
  auth: {
    signIn: '/api/Security/Account/login',
    signUp: '/api/Security/Account/register',
    logout: '/api/Security/Account/logout',
  },
};

export type SignInParams = {
  email: string;
  password: string;
};

export type SignUpParams = {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  mobileNo: string;
  password: string;
  organizationName: string;
};

/** **************************************
 * Login
 *************************************** */
export const login = async (params: SignInParams): Promise<void> => {
  try {
    const data = await api.post<AuthTokenResponse>(endpoints.auth.signIn, params);

    const accessToken = data.accessToken;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    await setSession(accessToken);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async (params: SignUpParams): Promise<void> => {

  try {
    const data = await api.post<AuthTokenResponse>(endpoints.auth.signUp, params);

    const accessToken = data.accessToken;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    await setSession(accessToken);
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    // Call backend to clear cookies
    await api.post(endpoints.auth.logout, {});
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    // Even if backend fails, clear local session
    await setSession(null);
    throw error;
  }
};
