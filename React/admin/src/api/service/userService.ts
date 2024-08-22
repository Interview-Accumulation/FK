import apiClient from "../apiClient";
import { UserInfo, UserToken } from "#/entity";

export interface SignInReq {
    username: string;
    password: string;
}

export interface SignUoReq extends SignInReq {
    email: string;
}

export type SignInRes = UserToken & {
    user: UserInfo;
}

export enum UserApi {
    SignIn = '/auth/signin',
    SignUp = '/auth/signup',
    Logout = '/auth/logout',
    Refresh = '/auth/refresh',
    User = '/user',
}

const signin = (data: SignInReq) => apiClient.post<SignInRes>({url: UserApi.SignIn, data});
const signup = (data: SignUoReq) => apiClient.post<UserInfo>({url: UserApi.SignUp, data});
const logout = () => apiClient.post({url: UserApi.Logout});


export default {
    signin,
    signup,
    logout
}