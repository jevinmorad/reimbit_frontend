import { api } from '@/api/client';
import { CONFIG } from '@/global-config';
import { JWT_ACCESS_KEY } from '@/types/constant';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type GlobalPermissions from '../../GlobalPermissions';
import type GlobalPagePermissions from '../../PagePermissions';
import { type AuthState } from '../../types';
import { AuthContext } from '../auth-context';
import { isValidToken, setSession } from './utils';

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

  type AuthInfoResponse = {
    user: any;
    permissions: GlobalPermissions;
  };

  const checkUserSession = useCallback(async () => {
    try {
      const authData = await api.get<AuthInfoResponse>(endpoints.auth.info);

      const user = authData?.user;
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
    const accessToken = api.getAuthToken();

    if (accessToken && isValidToken(accessToken)) {
      await setSession(accessToken);
    }

    if (!accessToken) {
      try {
        const response = await api.post<{ [key: string]: string }>(endpoints.auth.refreshToken, {});
        const newAccessToken = response[JWT_ACCESS_KEY];
        if (newAccessToken) {
          await setSession(newAccessToken);
          await checkUserSession();
          return;
        }
      } catch (error) {
        setState({ User: null, loading: false });
        return;
      }
    }

    await checkUserSession();
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
