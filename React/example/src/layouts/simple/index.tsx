import type React from "react";
import HeaderSimple from "../_common/header-simple";

type Props = {
	children: React.ReactNode;
	header?: boolean;
};
export default function SimpleLayout({ children, header = true }: Props) {
	return (
		<div className="flex h-screen w-full flex-col text-text-base bg-bg">
			{header && <HeaderSimple />}
			{children}
		</div>
	);
}
