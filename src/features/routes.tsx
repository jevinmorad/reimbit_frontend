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

const ExpenseListPage = lazy(() => import('./MyExpenses/pages/ExpenseListPage'));
const CategoryListPage = lazy(() => import('./Categories/pages/CategoryListPage'));
const ApprovalInboxListPage = lazy(() => import('./Approvals/pages/ApprovalInboxListPage'));
const EmployeeListPage = lazy(() => import('./Employees/pages/EmployeeListPage'));
const EmployeeAddEditPage = lazy(() => import('./Employees/pages/EmployeeAddEditPage'));

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
          { element: <ExpenseListPage />, index: true }
        ],
      },
      {
        path: 'Categories',
        element: <SuspenseOutlet />,
        children: [
          { element: <CategoryListPage />, index: true }
        ],
      },
      {
        path: 'ApprovalInbox',
        element: <SuspenseOutlet />,
        children: [
          {
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
      {
        path: 'Employees',
        element: <SuspenseOutlet />,
        children: [
          {
            index: true,
            element: <EmployeeListPage />,
          },
          {
            path: 'add',
            element: <EmployeeAddEditPage />,
          }
        ],
      },
    ],
  },
];
