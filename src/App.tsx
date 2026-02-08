import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/features/auth/context/jwt';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routesSection } from './routes';

type AppProps = {
  children?: React.ReactNode;
};

function App({ children }: AppProps) {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  const router = createBrowserRouter(routesSection);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <AuthProvider>
        <RouterProvider router={router} />
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;