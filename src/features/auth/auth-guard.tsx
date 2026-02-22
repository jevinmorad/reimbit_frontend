import { paths } from '@/paths';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './hooks/use-auth-context';

import LoadingPage from '@/components/loading-page';

type AuthGuardProps = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const { authenticated, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !authenticated) {
      navigate(paths.auth.login, { replace: true });
    }
  }, [loading, authenticated, navigate]);

  if (loading) return <LoadingPage />;

  return <>{children}</>;
}
