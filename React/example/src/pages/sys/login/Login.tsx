import { Layout } from "antd";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router";

import Bg from "@/assets/images/background/bg4.png";
import DashboardImg from "@/assets/images/background/dashboard.png";
import Overlay from "@/assets/images/background/overlay.jpg";
import LogoDark from "@/assets/images/logo/logo-large-white.png";

import LocalePicker from "@/components/locale-picker";
import { useUserToken } from "@/store/userStore";

import { themeVars } from "@/theme/theme.css";
import { rgbAlpha } from "@/utils/theme";
import LoginForm from "./LoginForm";
import { LoginStateProvider } from "./providers/LoginStateProvider";

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

function Login() {
	const { t } = useTranslation();
	const token = useUserToken();

	// 判断用户是否有权限
	if (token.accessToken) {
		// 如果有授权，则跳转到首页
		return <Navigate to={HOMEPAGE} replace />;
	}

	const gradientBg = rgbAlpha(themeVars.colors.background.defaultChannel, 0.9);
	const bg = `linear-gradient(${gradientBg}, ${gradientBg}) center center / cover no-repeat,url(${Overlay})`;

	return (
		<Layout
			className="relative flex !min-h-screen !w-full !flex-row"
			style={{
				background: `url(${Bg}) center center / cover no-repeat, url(${DashboardImg}) center center / cover no-repeat, ${bg}`,
			}}
		>
			<div className="hidden grow flex-col items-center justify-center gap-[80px] bg-center  bg-no-repeat md:flex">
				<img className="max-w-[400px] xl:max-w-[500px] min-w-[280px]" src={LogoDark} alt="" />
				<div className="text-3xl font-bold leading-normal text-[#fff] lg:text-4xl xl:text-5xl">
					{t("sys.login.signInSecondTitle")}
				</div>
			</div>

			<div className="m-auto flex !h-screen w-full max-w-[480px] flex-col justify-center px-[16px] lg:px-[64px]">
				<LoginStateProvider>
					<LoginForm />
				</LoginStateProvider>
			</div>

			<div className="absolute right-2 top-0 flex flex-row">
				<LocalePicker />
			</div>
		</Layout>
	);
}
export default Login;
