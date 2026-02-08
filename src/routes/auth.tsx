import { lazy, Suspense } from 'react';
import { Outlet, type RouteObject } from 'react-router-dom';

const Auth = {
  LoginInPage: lazy(() => import('../features/auth/Pages/login-in')),
  SignUpPage: lazy(() => import('../features/auth/Pages/sign-up')),
};

// ----------------------------------------------------------------------

export const authRoutes: RouteObject[] = [
  {
    path: 'Account',
    element: (
      <Suspense fallback={<>Loading</>}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: 'login',
        element: <Auth.LoginInPage />,
      },
      { path: 'sign-up', element: <Auth.SignUpPage /> },
    ],
  },
];
