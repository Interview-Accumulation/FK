import {createContext, useContext, useMemo, useState, PropsWithChildren} from 'react';

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE,
}

interface LoginStateContextType {
  loginState: LoginStateEnum;
  setLoginState: (state: LoginStateEnum) => void;
  backToLogin: () => void;
}

const LoginStateContext = createContext<LoginStateContextType | undefined>({
  loginState: LoginStateEnum.LOGIN,
  setLoginState: () => {},
  backToLogin: () => {},
});

export function useLoginStateContext() {
  const context = useContext(LoginStateContext);
  if (!context) {
    throw new Error('useLoginStateContext must be used within a LoginStateProvider');
  }
  return context;
}

export function LoginStateProvider({children}: PropsWithChildren) {
  const [loginState, setLoginState] = useState(LoginStateEnum.LOGIN);

  function backToLogin() {
    setLoginState(LoginStateEnum.LOGIN);
  }

  const value: LoginStateContextType = useMemo(() => {
    return {
      loginState,
      setLoginState,
      backToLogin,
    };
  }, [loginState]);

  return (
    <LoginStateContext.Provider value={value}>
      {children}
    </LoginStateContext.Provider>
  );
}


