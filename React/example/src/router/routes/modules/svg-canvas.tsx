import { Suspense, lazy } from "react";

import { Iconify, SvgIcon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";
import { Navigate, Outlet } from "react-router";

import type { AppRouteObject } from "#/router";

const Ratio = lazy(() => import("@/pages/svg-canvas/ratio"));
const BigData = lazy(() => import("@/pages/svg-canvas/big-data"));
const DataChange = lazy(() => import("@/pages/svg-canvas/data-cahnge"));
const GLGPUCompare = lazy(() => import("@/pages/webgl-webgpu/comparison"));

function Wrapper({ children }: any) {
	return <Suspense fallback={<CircleLoading />}>{children}</Suspense>;
}

const svgCanvas: AppRouteObject[] = [
	{
		path: "svg-canvas",
		element: (
			<Wrapper>
				<Outlet />
			</Wrapper>
		),
		meta: {
			label: "svg-canvas",
			icon: <SvgIcon icon="ic_svg" className="ant-menu-item-icon" size="24" />,
			key: "/svg-canvas",
		},
		children: [
			{
				index: true,
				element: <Navigate to="/svg-canvas/ratio" replace />,
			},
			{
				path: "ratio",
				element: <Ratio />,
				meta: {
					label: "缩放分辨率",
					key: "/svg-canvas/ratio",
				},
			},
			{
				path: "big-data",
				element: <BigData />,
				meta: {
					label: "大数据",
					key: "/svg-canvas/big-data",
				},
			},
			{
				path: "data-change",
				element: <DataChange />,
				meta: {
					label: "数据变化",
					key: "/svg-canvas/data-change",
				},
			},
		],
	},
	{
		path: "webgl-webgpu",
		element: (
			<Wrapper>
				<Outlet />
			</Wrapper>
		),
		meta: {
			label: "webgl-webgpu",
			icon: <Iconify icon="mdi:web" className="ant-menu-item-icon" size="24" />,
			key: "/webgl-webgpu",
		},
		children: [
			{
				index: true,
				element: <Navigate to="/webgl-webgpu/comparison" replace />,
			},
			{
				path: "comparison",
				element: <GLGPUCompare />,
				meta: {
					label: "Comparison",
					key: "/webgl-webgpu/comparison",
				},
			},
		],
	},
];

export default svgCanvas;
