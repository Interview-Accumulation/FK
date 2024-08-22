import { Dropdown, Button } from "antd";
import useLocale, {LANGUAGE_MAP} from "@/locales/useLocale";

import { LocalEnum } from '#/enum';
import type { MenuProps } from 'antd';

type Locale = keyof typeof LocalEnum;


function LocalePicker() {
  const { setLocale, locale } = useLocale();

  const localeList: MenuProps['items'] = Object.values(LANGUAGE_MAP).map((language) => ({
    key: language.locale,
    label: language.label,
    onClick: () => setLocale(language.locale),
  }));

  return (
    <Dropdown
      placement="bottomRight"
      trigger={['click']}
      key={locale}
      menu={{
        items: localeList,
      }}
    >
      <Button type="text" className="flex items-center">
        <span className="ml-2">{LANGUAGE_MAP[locale].label}</span>
      </Button>
    </Dropdown>
  );
}

export default LocalePicker;
