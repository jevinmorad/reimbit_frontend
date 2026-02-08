import { moduleRoutes } from '@/features/routes';
import { CONFIG } from '@/global-config';
import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { authRoutes } from './auth';

const Page404 = lazy(() => import('../pages/404'));

export const routesSection: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={CONFIG.auth.redirectPath} replace />,
  },

  // Auth
  ...authRoutes,

  // Module
  ...moduleRoutes,

  // No match
  { path: '*', element: <Page404 /> },
];
