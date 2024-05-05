import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import store from "../app/store";
import { setLoading } from "../features/slices/loading.slice";


export const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosApi: AxiosInstance = axios.create({
    baseURL: BASE_URL,
})

axiosApi.interceptors.request.use(
    (config: any) => {
        const token = store.getState().user.token;
        if (config?.headers?.noAuth === 'true') {
            config.headers['api-access-token'] = `${token}`
        } else if (token) {
            config.headers['Authorization'] = `${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)


type TRequest = {
    url: string,
    config?: AxiosRequestConfig<AxiosHeaders>,
    showToast?: boolean,
    loading?: boolean,
    data?: {},
}

type TResponse<T> = AxiosResponse<T & { success: boolean, message?: string }>;

export const apiGet = async <T>({ url, config, showToast = false, loading = true }: TRequest): Promise<TResponse<T>> => {
    loading && store.dispatch(setLoading(true));
    return new Promise(async (resolve, reject) => {
        try {
            let response: TResponse<T> = await axiosApi.get(url, config);
            if (showToast && response.data.message) {
                toast.success(response.data.message);
            }
            if (loading) {
                store.dispatch(setLoading(false));
            }
            return resolve(response);
        } catch (error: any) {
            // console.log('error', error);
            if (loading) {
                store.dispatch(setLoading(false));
            }
            if (error.response && error.response.data) {
                toast.error(error.response.data["error"] || error.response.data["message"]);
                return reject(error)
            }
            toast.error(error.message);
            return reject(error);
        }
    })
}


export const apiPost = async <T>({ url, data, config, showToast = false, loading = true }: TRequest): Promise<TResponse<T>> => {
    loading && store.dispatch(setLoading(true));
    return new Promise(async (resolve, reject) => {
        try {
            let response: TResponse<T> = await axiosApi.post(url, data, config);
            if (showToast && response.data.message) {
                toast.success(response.data.message);
            }
            if (loading) {
                store.dispatch(setLoading(false));
            }
            return resolve(response);
        } catch (error: any) {
            console.log('error', error);
            if (loading) {
                store.dispatch(setLoading(false));
            }
            if (error.response && error.response.data) {
                toast.error(error.response.data["error"] || error.response.data["message"]);
                return reject(error)
            }
            toast.error(error.message);
            return reject(error);
        }
    })
}



export const apiDelete = async <T>({ url, config, showToast = false, loading = true }: TRequest): Promise<TResponse<T>> => {
    loading && store.dispatch(setLoading(true));
    return new Promise(async (resolve, reject) => {
        try {
            let response: TResponse<T> = await axiosApi.delete(url, config);
            if (showToast && response.data.message) {
                toast.success(response.data.message);
            }
            if (loading) {
                store.dispatch(setLoading(false));
            }
            return resolve(response);
        } catch (error: any) {
            console.log('error', error);
            if (loading) {
                store.dispatch(setLoading(false));
            }
            if (error.response && error.response.data) {
                toast.error(error.response.data["error"] || error.response.data["message"]);
                return reject(error)
            }
            toast.error(error.message);
            return reject(error);
        }
    })
}

export const apiPut = async <T>({ url, data, config, showToast = false, loading = true }: TRequest): Promise<TResponse<T>> => {
    loading && store.dispatch(setLoading(true));
    return new Promise(async (resolve, reject) => {
        try {
            let response: TResponse<T> = await axiosApi.put(url, data, config);
            if (showToast && response.data.message) {
                toast.success(response.data.message);
            }
            if (loading) {
                store.dispatch(setLoading(false));
            }
            return resolve(response);
        } catch (error: any) {
            console.log('error', error);
            if (loading) {
                store.dispatch(setLoading(false));
            }
            if (error.response && error.response.data) {
                toast.error(error.response.data["error"] || error.response.data["message"]);
                return reject(error)
            }
            toast.error(error.message);
            return reject(error);
        }
    })
}