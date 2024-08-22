import { Layout, Typography } from 'antd';
import Color from 'color';
import { t } from '@/locales/i18n';
import LocalePicker from '@/components/locale-picker';

import {useThemeToken} from '@/theme/hooks'

import DashboardImg from '@/assets/images/background/dashboard.png';
import Overlay2 from '@/assets/images/background/overlay_2.jpg'
import { LoginStateProvider } from './provider';
import LoginForm from './LoginForm';
import MobileForm from './MobileForm';
import QrCodeForm from './QrCodeForm';
import RegisterForm from './RegisterForm';
import ResetForm from './ResetForm';

function Login() {
  const {colorBgElevated} = useThemeToken();
  const gradientBg = Color(colorBgElevated).alpha(0.8).string();
  const bg = `linear-gradient(${gradientBg}, ${gradientBg})center center / cover no-repeat, url(${Overlay2})`;
  return (
    <Layout className="relative flex !min-h-screen !w-full !flex-row">
      <div 
        className='hidden grow flex-col items-center justify-center gap-[80px] bg-center  bg-no-repeat md:flex'
        style={{
          background: bg,
        }}
      >
        <div className='text-3xl font-bold leading-normal lg:text-4xl xl:text-5xl'>K Admin</div>
        <img src={DashboardImg} alt='dashboard' className='max-w-[480px] xl:max-w-[560px]' />
        <Typography.Text
          className='flex flex-row gap-[16px] text-2xl'
        >{t('sys.login.signInSecondTitle')}</Typography.Text>
      </div>

      <div className='m-auto max-w-[480px] w-full !h-screen flex flex-col justify-center px-[16px] lg:px-[64px]'>
        <LoginStateProvider>
          <LoginForm />
          <MobileForm />
          <QrCodeForm />
          <RegisterForm />
          <ResetForm />
        </LoginStateProvider>
      </div>

      <div className='absolute top-4 right-4'>
        <LocalePicker />
      </div>
    </Layout>
  );
}

export default Login;
