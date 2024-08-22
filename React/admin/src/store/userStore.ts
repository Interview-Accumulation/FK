import {create} from 'zustand';
import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserInfo, UserToken } from '#/entity';
import { getItem, removeItem, setItem } from '@/utils/storage';
import { StorageEnum } from '#/enum';
import userService, {SignInReq} from '@/api/service/userService';

const { VITE_APP_HOMEPAGE: HOME_PAGE } = import.meta.env;


type UserStore = {
    userInfo: Partial<UserInfo>;
    userToken: UserToken;
    actions: {
        setUserInfo: (userInfo: Partial<UserInfo>) => void;
        setUserToken: (userToken: UserToken) => void;
        clearUserInfoAndToken: () => void;
    }
}

const useUserStore = create<UserStore>((set) => ({
    userInfo: getItem<UserInfo>(StorageEnum.User) || {},
    userToken: getItem<UserToken>(StorageEnum.Token) || {},
    actions: {
        setUserInfo: (userInfo) => {
            set({ userInfo });
            setItem(StorageEnum.User, userInfo);
        },
        setUserToken: (userToken) => {
            set({ userToken });
            setItem(StorageEnum.Token, userToken);
        },
        clearUserInfoAndToken: () => {
            set({ userInfo: {}, userToken: {} });
            removeItem(StorageEnum.User);
            removeItem(StorageEnum.Token);
        }
    }
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserPermission = () => useUserStore((state) => state.userInfo.permissions);
export const useUserActions = () => useUserStore((state) => state.actions);

export const useSignIn = () => {
    const navigate = useNavigate();
    const { message} = App.useApp();
    const { setUserInfo, setUserToken } = useUserActions();

    const signInMutaion = useMutation(userService.signin);
    const signIn = async (data: SignInReq) => {
        try {
            const res = await signInMutaion.mutateAsync(data);
            const { user, accessToken, refreshToken } = res;
            setUserInfo(user);
            setUserToken({ accessToken, refreshToken });
            navigate(HOME_PAGE, { replace: true });
        } catch (error) {
            message.warning({
                content: error.message,
                duration: 3
            })
        }
    };
    return signIn;
}


export default useUserStore;