import { ThemeProvider } from "@/components/theme-provider";
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
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  const router = createBrowserRouter(routesSection);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster position="top-right" />
        <AuthProvider>
          <RouterProvider router={router} />
          {children}
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;