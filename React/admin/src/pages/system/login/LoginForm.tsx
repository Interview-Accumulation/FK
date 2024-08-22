import { useState } from "react";
import { Form, Input, Row, Col, Checkbox, Button } from "antd";
import { t } from "@/locales/i18n";
import { useThemeToken } from "@/theme/hooks";
import { LoginStateEnum, useLoginStateContext } from "./provider";

import { DEFAULT_USER, TEST_USER } from '@/_mock/assets';
import { SignInReq } from '@/api/service/userService';
import { useSignIn } from '@/store/userStore';
function LoginForm() {
  const themeToken = useThemeToken();
  const { loginState, setLoginState } = useLoginStateContext();
  const [loading, setLoading] = useState(false);
  const signIn = useSignIn();

  if (loginState !== LoginStateEnum.LOGIN) {
    return null;
  }

  const handleFinish = async ({ username, password }: SignInReq) => {
    setLoading(true);
    try {
      await signIn({ username, password });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4 text-2xl font-bold xl:text-3xl">
        {t("sys.login.signInFormTitle")}
      </div>
      <Form name="login" size="large" 
        initialValues={{
          remember: true,
          username: DEFAULT_USER.username,
          password: DEFAULT_USER.password,
        }}
        onFinish={handleFinish}>
        <Form.Item
          name="username"
          rules={[
            { required: true, message: t("sys.login.accountPlaceholder") },
          ]}
        >
          <Input placeholder={t("sys.login.userName")} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: t("sys.login.passwordPlaceholder") },
          ]}
        >
          <Input.Password placeholder={t("sys.login.password")} />
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item name="remeber" valuePropName="checked" noStyle>
                <Checkbox>{t("sys.login.rememberMe")}</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12} className="text-right">
              <a onClick={() => setLoginState(LoginStateEnum.RESET_PASSWORD)}>
                {t("sys.login.forgetPassword")}
              </a>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            {t("sys.login.loginButton")}
          </Button>
        </Form.Item>
        <Row align="middle" gutter={8}>
          <Col span={9}>
            <Button
              className="w-full !text-sm"
              onClick={() => setLoginState(LoginStateEnum.MOBILE)}
            >
              {t("sys.login.mobileSignInFormTitle")}
            </Button>
          </Col>
          <Col span={9} className="text-right">
            <Button
              className="w-full !text-sm"
              onClick={() => setLoginState(LoginStateEnum.QR_CODE)}
            >
              {t("sys.login.qrSignInFormTitle")}
            </Button>
          </Col>
          <Col span={6}>
            <Button
              className="w-full !text-sm"
              onClick={() => setLoginState(LoginStateEnum.REGISTER)}
              loading={loading}
            >
              {t("sys.login.registerButton")}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default LoginForm;
