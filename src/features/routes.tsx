import { lazy, Suspense } from 'react';
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

const EXP_ExpenseListPage = lazy(() => import('./MyExpenses/pages/EXP_ExpenseListPage'));
const EXP_CategoryListPage = lazy(() => import('./Categories/pages/EXP_CategoryListPage'));
const ApprovalInboxListPage = lazy(() => import('./Approvals/pages/ApprovalInboxListPage'));

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
        path: 'MyExpenses',
        element: <SuspenseOutlet />,
        children: [
          { element: <EXP_ExpenseListPage />, index: true }
        ],
      },
      {
        path: 'Categories',
        element: <SuspenseOutlet />,
        children: [
          { element: <EXP_CategoryListPage />, index: true }
        ],
      },
      {
        path: 'Approvals',
        element: <SuspenseOutlet />,
        children: [
          {
            path: 'ApprovalInbox',
            element: <ApprovalInboxListPage />,
            index: true
          }
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
