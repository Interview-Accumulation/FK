import { message as Message } from 'antd'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import {t} from '@/locales/i18n'
import userStore from '@/store/userStore'
import { Result } from '#/api'
import { ResultEnum } from '#/enum';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 50 * 1000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
})

// Request interceptors
axiosInstance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = 'Bearer Token'
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

// Response interceptors
axiosInstance.interceptors.response.use(
    (response: AxiosResponse<Result>) => {
        if (!response.data) {
            throw new Error(t('sys.api.apiRequestFailed'))
        }
        const { status, message, data } = response.data;
        const isSuccess = data && Reflect.has(response.data, 'status') && status === ResultEnum.SUCCESS;
        if (isSuccess) {
            return data
        }

        throw new Error(message || t('sys.api.apiRequestFailed'))
    },
    (error: AxiosError<Result>) => {
        const {response, message} = error || {}
        const errorMessage = response?.data?.message || message || t('sys.api.errorMessage')
        Message.error(errorMessage)
        const status = response?.status
        if (status === 401) {
            userStore.getState().actions.clearUserInfoAndToken();
        }
        return Promise.reject(error)
    },
)

class APIClient {
    request<T = any>(config: AxiosRequestConfig): Promise<T> {
        return new Promise((resolve, reject) => {
            axiosInstance.request<any, AxiosResponse<Result>>(config)
            .then((res: AxiosResponse<Result>) => {
                resolve(res as unknown as Promise<T>)
            })
            .catch((error: AxiosError | Error) => {
                reject(error)
            })
        })
    }

    get<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request<T>({...config, method: 'GET'})
    }

    post<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request<T>({...config, method: 'POST'})
    }

    put<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request<T>({...config, method: 'PUT'})
    }

    delete<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request<T>({...config, method: 'DELETE'})
    }
}

export default new APIClient()