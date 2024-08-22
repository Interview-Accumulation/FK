import { Button } from "antd";
import {t} from "@/locales/i18n";
import {LeftOutlined} from "@ant-design/icons";


function ReturnButton({onClick}: {onClick: () => void}) {
  return (
    <Button type="link" icon={<LeftOutlined />} onClick={onClick}>
      {t('sys.login.backSignIn')}
    </Button>
  );
}

export default ReturnButton;
