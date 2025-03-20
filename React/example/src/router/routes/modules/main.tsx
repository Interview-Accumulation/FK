import { Suspense, lazy } from "react";

import Card from "@/components/card";
import { Iconify, SvgIcon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";
import { Navigate } from "react-router";

import { Tag } from "antd";
import type { AppRouteObject } from "#/router";

const Dashboard = lazy(() => import("@/pages/dashboard"));
const DeviceLedger = lazy(() => import("@/pages/device/ledger"));
const DeviceTypeManage = lazy(() => import("@/pages/device/type-manage"));
const TerminalManage = lazy(() => import("@/pages/iot/terminal"));
const TerminalClassification = lazy(() => import("@/pages/iot/terminal-classification"));
const TerminalLog = lazy(() => import("@/pages/iot/terminal-log"));
const IotSetting = lazy(() => import("@/pages/iot-setting"));
const EnergyConsumption = lazy(() => import("@/pages/energy-consumption"));
const DeviceTypeParamsSetting = lazy(() => import("@/pages/device/type-manage/params-setting"));
const TerminalParamsSetting = lazy(() => import("@/pages/iot/terminal-classification/params-setting"));
const IotParamsSetting = lazy(() => import("@/pages/iot-setting/params-setting"));

function Wrapper({ children }: any) {
	return <Suspense fallback={<CircleLoading />}>{children}</Suspense>;
}
const others: AppRouteObject[] = [
	{
		path: "/dashboard",
		element: (
			<Wrapper>
				<Dashboard />
			</Wrapper>
		),
		meta: {
			label: "sys.menu.dashboard",
			icon: <SvgIcon icon="ic_dashboard" className="ant-menu-item-icon" size="24" />,
			key: "/dashboard",
		},
	},
	{
		path: "device",
		meta: {
			label: "sys.menu.device.index",
			icon: <SvgIcon icon="ic-device" className="ant-menu-item-icon" size="24" />,
			key: "/device",
		},
		children: [
			{
				index: true,
				element: <Navigate to="/device/ledger" replace />,
			},
			{
				path: "ledger",
				element: (
					<Wrapper>
						<DeviceLedger />
					</Wrapper>
				),
				meta: {
					label: "sys.menu.device.ledger",
					key: "/device/ledger",
				},
			},
			{
				path: "type_manage",
				element: (
					<Wrapper>
						<DeviceTypeManage />
					</Wrapper>
				),
				meta: {
					label: "sys.menu.device.type",
					key: "/device/type_manage",
				},
			},
			{
				path: "type_manage/params_setting",
				element: (
					<Wrapper>
						<DeviceTypeParamsSetting />
					</Wrapper>
				),
				meta: {
					label: "sys.menu.device.params",
					key: "/device/type_manage/params_setting",
					hideMenu: true,
					hideTab: true,
					parentKey: "/device/type_manage",
					parentlabel: "sys.menu.device.type",
				},
			},
		],
	},
	{
		path: "iot",
		meta: {
			label: "sys.menu.iot.index",
			icon: <SvgIcon icon="ic-iot" className="ant-menu-item-icon" size="24" />,
			key: "/iot",
		},
		children: [
			{
				index: true,
				element: <Navigate to="/iot/terminal" replace />,
			},
			{
				path: "terminal",
				element: (
					<Wrapper>
						<TerminalManage />
					</Wrapper>
				),
				meta: {
					label: "sys.menu.iot.terminal",
					key: "/iot/terminal",
				},
			},
			{
				path: "terminal_classification",
				element: (
					<Wrapper>
						<TerminalClassification />
					</Wrapper>
				),
				meta: {
					label: "sys.menu.iot.classification",
					key: "/iot/terminal_classification",
				},
			},
			{
				path: "terminal_log",
				element: (
					<Wrapper>
						<TerminalLog />
					</Wrapper>
				),
				meta: {
					label: "sys.menu.iot.log",
					key: "/iot/terminal_log",
				},
			},
			{
				path: "terminal_classification/params_setting",
				element: (
					<Wrapper>
						<TerminalParamsSetting />
					</Wrapper>
				),
				meta: {
					label: "sys.menu.iot.params",
					key: "/iot/terminal_classification/params_setting",
					hideMenu: true,
					hideTab: true,
					parentKey: "/iot/terminal_classification",
					parentlabel: "sys.menu.iot.classification",
				},
			},
		],
	},
	{
		path: "iot_setting",
		element: (
			<Wrapper>
				<IotSetting />
			</Wrapper>
		),
		meta: {
			label: "sys.menu.iot.setting.index",
			key: "/iot_setting",
			icon: <SvgIcon icon="ic-setting" className="ant-menu-item-icon" size="24" />,
		},
	},
	{
		path: "iot_setting/params_setting",
		element: (
			<Wrapper>
				<IotParamsSetting />
			</Wrapper>
		),
		meta: {
			label: "sys.menu.iot.setting.params",
			key: "/iot_setting/params_setting",
			hideMenu: true,
			hideTab: true,
			parentKey: "/iot_setting",
			parentlabel: "sys.menu.iot.setting.index",
		},
	},
	// {
	// 	path: "energy_consumption",
	// 	element: (
	// 		<Wrapper>
	// 			<EnergyConsumption />
	// 		</Wrapper>
	// 	),
	// 	meta: {
	// 		label: "sys.menu.consumption",
	// 		key: "/energy_consumption",
	// 		icon: <SvgIcon icon="ic-energy" className="ant-menu-item-icon" size="24" />,
	// 	},
	// },
];

// export default others;
