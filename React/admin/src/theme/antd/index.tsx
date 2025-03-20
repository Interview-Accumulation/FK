import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css'
import useLocale from '@/locales/useLocale';
import { useSettings } from '@/store/settingStore';

import {
  customThemeTokenConfig,
  themeModeToken,
  colorPrimarys,
  customComponentConfig,
} from './theme';

import { ThemeMode } from '#/enum';

function AntdConfig({children}: {children: React.ReactNode}) {
  const {themeMode, themeColorPresets} = useSettings();
  const { language } = useLocale();
  const algorithm = themeMode === ThemeMode.Light ? theme.defaultAlgorithm : theme.darkAlgorithm;
  const colorPrimary = colorPrimarys[themeColorPresets];


  return (
    <ConfigProvider
      locale={language}
      theme={{
        token: {colorPrimary, ...customThemeTokenConfig, ...themeModeToken[themeMode].token},
        components: {...customComponentConfig, ...themeModeToken[themeMode].components,
        },
       algorithm 
      }}
    >
      <StyleProvider hashPriority='high'>{children}</StyleProvider>
    </ConfigProvider>
  );
}

export default AntdConfig;
