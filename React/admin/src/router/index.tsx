import { lazy } from "react";
import { Navigate, RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from "@/layouts/dashboard";
import AuthGuard from '@/router/components/auth-guard';

import { AppRouteObject } from "#/router";
import { ErrorRoutes } from "./routes/error-routes";
import { usePermissionRoutes } from '@/router/hooks';

const { VITE_APP_HOMEPAGE: HOME_PAGE } = import.meta.env;

const LoginRoute: AppRouteObject = {
  path: '/login',
  Component: lazy(() => import('@/pages/system/login')),
}

const PAGE_NOT_FOUND: AppRouteObject = {
  path: '*',
  element: <Navigate to='/404' replace />,
}

export default function Router() {
  const permissionRoutes = usePermissionRoutes();
  console.log('permissionRoutes', permissionRoutes)
  const asyncRoutes: AppRouteObject = {
    path: '/',
    element: (
      <AuthGuard>
        <Dashboard/>  
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={HOME_PAGE} replace />,
      },
      ...permissionRoutes
    ]
  }
  const routes = [LoginRoute, asyncRoutes, ErrorRoutes, PAGE_NOT_FOUND];
  const router = createBrowserRouter(routes as RouteObject[]);
  return <RouterProvider router={router} />;
}