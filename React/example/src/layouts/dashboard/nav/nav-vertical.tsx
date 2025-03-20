import { Layout, Menu, type MenuProps } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useMatches, useNavigate } from "react-router";

import Scrollbar from "@/components/scrollbar";
import { useFlattenedRoutes, usePathname, usePermissionRoutes, useRouteToMenuFn } from "@/router/hooks";
import { menuFilter } from "@/router/utils";
import { useSettingActions, useSettings } from "@/store/settingStore";

import { HEADER_HEIGHT, NAV_WIDTH } from "../config";

import NavLogo from "./nav-logo";

import { multiply } from "ramda";
import { ThemeLayout, ThemeMode } from "#/enum";

const { Sider } = Layout;

type Props = {
	closeSideBarDrawer?: () => void;
};
export default function NavVertical(props: Props) {
	const navigate = useNavigate();
	const matches = useMatches();
	const pathname = usePathname();

	const settings = useSettings();
	const { themeLayout, themeMode, darkSidebar } = settings;
	const { setSettings } = useSettingActions();

	const routeToMenuFn = useRouteToMenuFn();
	const permissionRoutes = usePermissionRoutes();
	const flattenedRoutes = useFlattenedRoutes();

	const collapsed = useMemo(() => themeLayout === ThemeLayout.Mini, [themeLayout]);

	const menuList = useMemo(() => {
		const menuRoutes = menuFilter(permissionRoutes);
		return routeToMenuFn(menuRoutes);
	}, [routeToMenuFn, permissionRoutes]);

	const selectedKeys = useMemo(() => {
		const hasPath = menuList.some((item) => {
			if (item?.key === pathname) {
				return true;
			}
			if (item?.children) {
				return item.children?.some((child) => child.key === pathname);
			}
			return false;
		});
		if (hasPath) {
			return [pathname];
		}
		let parentKey: unknown;
		for (const item of menuList) {
			if (item?.key && pathname.includes(item?.key as string)) {
				parentKey = item?.key || "";
			}
			if (item?.children) {
				for (const child of item.children) {
					if (child?.key && pathname.includes(child?.key as string)) {
						parentKey = child?.key || "";
					}
				}
			}
		}
		console.log("parentKey", menuList, parentKey);
		return [parentKey ?? ""];
	}, [pathname, menuList]);

	const [openKeys, setOpenKeys] = useState<string[]>([]);
	// 首次加载时设置 openKeys
	useEffect(() => {
		if (!collapsed) {
			const keys = matches
				.filter((match) => match.pathname !== "/" && match.pathname !== pathname)
				.map((match) => match.pathname);
			setOpenKeys(keys);
		}
	}, [collapsed, matches, pathname]);

	const handleToggleCollapsed = () => {
		setSettings({
			...settings,
			themeLayout: collapsed ? ThemeLayout.Vertical : ThemeLayout.Mini,
		});
	};

	const onClick: MenuProps["onClick"] = ({ key }) => {
		const nextLink = flattenedRoutes?.find((e) => e.key === key);
		if (nextLink?.hideTab && nextLink?.frameSrc) {
			window.open(nextLink?.frameSrc, "_blank");
			return;
		}

		navigate(key);
		props?.closeSideBarDrawer?.();
	};

	const handleOpenChange: MenuProps["onOpenChange"] = (keys) => {
		// 关闭时也触发一次，刚好设置为 []
		setOpenKeys(keys);
	};

	const sidebarTheme = useMemo(() => {
		if (themeMode === ThemeMode.Dark) {
			return darkSidebar ? "light" : "dark";
		}
		return darkSidebar ? "dark" : "light";
	}, [themeMode, darkSidebar]);

	return (
		<Sider
			trigger={null}
			collapsible
			collapsed={collapsed}
			width={NAV_WIDTH}
			theme={sidebarTheme}
			className="!fixed left-0 top-0 h-screen border-r border-dashed border-border"
		>
			<NavLogo collapsed={collapsed} onToggle={handleToggleCollapsed} />

			<div style={{ height: `calc(100% - ${HEADER_HEIGHT}px)` }}>
				<Scrollbar>
					<Menu
						mode="inline"
						items={menuList}
						theme={sidebarTheme}
						selectedKeys={selectedKeys}
						openKeys={openKeys}
						onOpenChange={handleOpenChange}
						className="!border-none"
						onClick={onClick}
					/>
				</Scrollbar>
			</div>
		</Sider>
	);
}
