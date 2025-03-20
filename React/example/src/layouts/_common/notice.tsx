// import { faker } from "@faker-js/faker";
import { Badge, Drawer, Tabs, type TabsProps, Tag } from "antd";
import { type CSSProperties, type ReactNode, useState } from "react";

import CyanBlur from "@/assets/images/background/cyan-blur.png";
import RedBlur from "@/assets/images/background/red-blur.png";
import { IconButton, Iconify } from "@/components/icon";
import { themeVars } from "@/theme/theme.css";

export default function NoticeButton() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [count, setCount] = useState(4);

	const style: CSSProperties = {
		backdropFilter: "blur(20px)",
		backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
		backgroundRepeat: "no-repeat, no-repeat",
		backgroundColor: `rgba(${themeVars.colors.background.paperChannel}, 0.9)`,
		backgroundPosition: "right top, left bottom",
		backgroundSize: "50, 50%",
	};

	return (
		<div>
			<IconButton onClick={() => setDrawerOpen(true)}>
				<Badge
					count={count}
					styles={{
						root: { color: "inherit" },
						indicator: { color: themeVars.colors.common.white },
					}}
				>
					<Iconify icon="solar:bell-bing-bold-duotone" size={24} />
				</Badge>
			</IconButton>
			<Drawer
				placement="right"
				title="消息通知"
				onClose={() => setDrawerOpen(false)}
				open={drawerOpen}
				closable={false}
				width={420}
				styles={{
					body: { padding: 0 },
					mask: { backgroundColor: "transparent" },
				}}
				style={style}
				extra={
					<IconButton
						style={{ color: themeVars.colors.palette.primary.default }}
						onClick={() => {
							setCount(0);
							setDrawerOpen(false);
						}}
					>
						<Iconify icon="solar:check-read-broken" size={20} />
					</IconButton>
				}
			>
				<NoticeTab />
			</Drawer>
		</div>
	);
}

function NoticeTab() {
	const tabChildrenAll: ReactNode = <div className="text-sm">全部通知</div>;
	const tabChildrenRead: ReactNode = <div className="text-sm">已读通知内容</div>;
	const tabChildrenUnread: ReactNode = <div className="text-sm">未读通知内容</div>;

	const items: TabsProps["items"] = [
		{
			key: "1",
			label: (
				<div className="flex">
					<span>全部通知</span>
					<Tag color="processing">22</Tag>
				</div>
			),
			children: tabChildrenAll,
		},
		{
			key: "2",
			label: (
				<div className="flex">
					<span>未读</span>
					<Tag color="error">12</Tag>
				</div>
			),
			children: tabChildrenUnread,
		},
		{
			key: "3",
			label: (
				<div className="flex">
					<span>已读</span>
					<Tag color="green">10</Tag>
				</div>
			),
			children: tabChildrenRead,
		},
	];
	return (
		<div className="flex flex-col px-6">
			<Tabs defaultActiveKey="1" items={items} />
		</div>
	);
}
