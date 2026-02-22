import { Suspense } from 'react';
import { Navigate, Outlet, type RouteObject } from 'react-router-dom';
import { AuthGuard } from './auth/auth-guard';

import { LoadingSpinner } from '@/components/loading-page';

function SuspenseOutlet() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Outlet />
    </Suspense>
  );
}

import MainLayout from '@/layouts/main-layout';

import { EXP_ExpenseRoutes } from './Expenses/MyExpenses/routes';

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
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'Expenses',
        element: <SuspenseOutlet />,
        children: [
          EXP_ExpenseRoutes
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
