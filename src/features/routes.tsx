import { Suspense } from 'react';
import { Outlet, type RouteObject } from 'react-router-dom';
import { AuthGuard } from './auth/auth-guard';

function SuspenseOutlet() {
  const pathname = usePathname();
  return (
    <Suspense key={pathname} fallback={<>Loading...</>}>
      <Outlet />
    </Suspense>
  );
}

import MainLayout from '@/layouts/main-layout';
import { usePathname } from './auth/hooks/use-pathname';

export const moduleRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'expenses',
        element: <SuspenseOutlet />,
        // children: [EXP_ExpenseRoutes]
        children: [
          {
            index: true,
            element: <div>Expenses Home</div>,
          },
        ],
      },
      {
        path: 'dashboard',
        element: <SuspenseOutlet />,
        children: [
          {
            index: true,
            element: <div>Dashboard Home</div>,
          },
        ],
      },
    ],
  },
];
