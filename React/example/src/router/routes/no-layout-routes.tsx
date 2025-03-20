import { Suspense, lazy } from "react";
import { Outlet } from "react-router";

import { CircleLoading } from "@/components/loading";
import SimpleLayout from "@/layouts/simple";

import AuthGuard from "../components/auth-guard";

import type { AppRouteObject } from "#/router";

const DeviceDetail = lazy(() => import("@/pages/device/ledger/detail"));
const DeviceMonitor = lazy(() => import("@/pages/device/ledger/monitor"));
const MultiParamsAnalyse = lazy(() => import("@/pages/device/ledger/multi-params-analyse.tsx"));

export const NoLayoutRoutes: AppRouteObject = {
	element: (
		<AuthGuard>
			<SimpleLayout header={false}>
				<Suspense fallback={<CircleLoading />}>
					<Outlet />
				</Suspense>
			</SimpleLayout>
		</AuthGuard>
	),
	children: [
		{
			path: "device/ledger/detail/:id",
			element: <DeviceDetail />,
		},
		{
			path: "device/ledger/monitor/:id",
			element: <DeviceMonitor />,
		},
		{
			path: "device/ledger/multi-params-analyse/:id",
			element: <MultiParamsAnalyse />,
		},
	],
};
