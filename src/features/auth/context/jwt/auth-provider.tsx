import { api } from '@/api/client';
import { CONFIG } from '@/global-config';
import { JWT_ACCESS_KEY } from '@/types/constant';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type GlobalPermissions from '../../GlobalPermissions';
import type GlobalPagePermissions from '../../PagePermissions';
import { type AuthState } from '../../types';
import { AuthContext } from '../auth-context';
import { getStoredAccessToken, isValidToken, setSession } from './utils';

api.setBaseURL(CONFIG.apiBaseUrl);

const endpoints = {
  auth: {
    info: '/api/User/info',
    refreshToken: '/api/Security/Account/refresh-token'
  },
};

const DefaultPermissions: GlobalPermissions = {};
const DefaultPagesPermissions: GlobalPagePermissions = {};

type Props = {
  children: React.ReactNode;
};

function useSetState<T>(initialState: T) {
  const [state, set] = useState<T>(initialState);
  const setState = useCallback((patch: Partial<T> | ((prevState: T) => Partial<T>)) => {
    set(prev => Object.assign({}, prev, typeof patch === 'function' ? patch(prev) : patch));
  }, []);

  return { state, setState };
}

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({
    User: null,
    loading: true,
    UserPermissions: DefaultPermissions,
    GlobalPagePermissions: DefaultPagesPermissions,
  });

  type AuthUser = {
    UserId: string;
    OrganizationId: string;
    Email: string;
    RoleId: string;
  };

  type AuthInfoResponse = {
    User: AuthUser;
    permissions: GlobalPermissions;
  };

  const checkUserSession = useCallback(async () => {
    try {
      const authData = await api.get<AuthInfoResponse>(endpoints.auth.info);

      const user = authData?.User;
      const userPermissions =
        authData?.permissions != null ? authData?.permissions : DefaultPermissions;

      setState({
        User: user,
        loading: false,
        UserPermissions: userPermissions,
      });
    } catch (error: any) {
      setState({ User: null, loading: false });
    }
  }, [setState]);

  const bootstrap = useCallback(async () => {
    try {
      // Step 1: Check if accessToken exists in memory (API client)
      let accessToken = api.getAuthToken();

      // Step 2: If not in memory, check localStorage
      if (!accessToken) {
        accessToken = getStoredAccessToken();
        if (accessToken) {
          // Restore to API client from localStorage
          api.setAuthToken(accessToken);
        }
      }

      // Step 3: Validate the token if it exists
      if (accessToken && isValidToken(accessToken)) {
        // Token is valid, set up session and fetch user data
        await setSession(accessToken);
        await checkUserSession();
        return;
      }

      // Step 4: No valid accessToken, try to refresh using HttpOnly cookie
      try {
        const response = await api.post<{ [key: string]: string }>(endpoints.auth.refreshToken, {});
        const newAccessToken = response[JWT_ACCESS_KEY];

        if (newAccessToken) {
          await setSession(newAccessToken);
          await checkUserSession();
          return;
        }
      } catch (error) {
        // Refresh token failed or expired
        setState({ User: null, loading: false });
        return;
      }

      // Step 5: If we reach here, no valid tokens exist
      setState({ User: null, loading: false });
    } catch (error) {
      console.error('Bootstrap error:', error);
      setState({ User: null, loading: false });
    }
  }, [checkUserSession, setState]);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const checkAuthenticated = state.User ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      User: state.User ? state.User : null,
      checkUserSession,
      loading: status === 'loading',
      UserPermissions:
        status !== 'loading' && state.UserPermissions ? state.UserPermissions : DefaultPermissions,
      DefaultPagesPermissions,
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [
      checkUserSession,
      state.User,
      state.UserPermissions,
      status,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
