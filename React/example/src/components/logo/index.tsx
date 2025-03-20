import { NavLink } from "react-router";

// import { useTheme } from "@/theme/hooks";

import LogoIcon from "@/assets/images/logo.png";
// import { Iconify } from "../icon";

interface Props {
	size?: number | string;
}
function Logo({ size = 40 }: Props) {
	return (
		<NavLink to="/">
			<img src={LogoIcon} alt="logo" style={{ width: size, height: size }} />
			{/* <Iconify icon="bx:bxl-react" size={size} color={themeTokens.colors.primary} /> */}
		</NavLink>
	);
}

export default Logo;
