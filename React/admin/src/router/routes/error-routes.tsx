import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';

import { AppRouteObject } from '#/router';

const Page403 = lazy(() => import('@/pages/system/error/Page403'));
const Page404 = lazy(() => import('@/pages/system/error/Page404'));
const Page500 = lazy(() => import('@/pages/system/error/Page500'));

export const ErrorRoutes: AppRouteObject = {
  element: (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {path: '403', element: <Page403 />},
    {path: '404', element: <Page404 />},
    {path: '500', element: <Page500 />},
  ]
}