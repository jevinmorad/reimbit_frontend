import { moduleRoutes } from '@/features/routes';
import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';
import { authRoutes } from './auth';

const Page404 = lazy(() => import('../pages/404'));

export const routesSection: RouteObject[] = [
  // Auth routes (login, signup)
  ...authRoutes,

  // Protected module routes
  ...moduleRoutes,

  // No match
  { path: '*', element: <Page404 /> },
];
