import { Breadcrumb, type BreadcrumbProps, type GetProp } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useMatches } from "react-router";

import { Iconify } from "@/components/icon";
import { useFlattenedRoutes, usePermissionRoutes } from "@/router/hooks";
import { menuFilter } from "@/router/utils";

type MenuItem = GetProp<BreadcrumbProps, "items">[number];

/**
 * 动态面包屑解决方案：https://github.com/MinjieChang/myblog/issues/29
 */
export default function BreadCrumb() {
	const { t } = useTranslation();
	const matches = useMatches();
	const flattenedRoutes = useFlattenedRoutes();
	const permissionRoutes = usePermissionRoutes();

	const breadCrumbs = useMemo(() => {
		const menuRoutes = menuFilter(permissionRoutes);
		const paths = matches.filter((item) => item.pathname !== "/").map((item) => item.pathname);

		const pathRouteMetas = flattenedRoutes.filter((item) => paths.includes(item.key));

		const currentMenuItems = [...menuRoutes];

		return pathRouteMetas.reduce((pre: MenuItem[], routeMeta) => {
			const { key, label } = routeMeta;

			// Find current level menu items
			const currentRoute = currentMenuItems.find((item) => item.meta?.key === key);

			// Update menu items for next level
			// currentMenuItems = currentRoute?.children?.filter((item) => !item.meta?.hideMenu) ?? [];
			if (routeMeta.parentKey && routeMeta.parentlabel) {
				return pre.concat([
					{ key: routeMeta.parentKey, title: <Link to={routeMeta.parentKey}>{t(routeMeta.parentlabel)}</Link> },
					{ key, title: t(label) },
				]);
			}
			return pre.concat([{ key, title: t(label) }]);
		}, []);
	}, [matches, flattenedRoutes, t, permissionRoutes]);

	return <Breadcrumb items={breadCrumbs} className="!text-sm" separator={<Iconify icon="ph:dot-duotone" />} />;
}
