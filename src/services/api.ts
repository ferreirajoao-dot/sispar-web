import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast, ToastOptions } from "react-toastify";

interface Config {
    isClub?: boolean;
    isCrafty?: boolean;
    isNext?: boolean;
    disableToast?: boolean;
    token?: string | null;
}

interface AccessProps {
    api_token: string | null;
}
export let access: AccessProps = {
    api_token: null
};

const genericCall = async (url: string, method: string, data: any, params?: object | null, config: Config = {}) => {
    const { isClub = false, disableToast = false, isCrafty, isNext } = config;

    let headers: object
    let baseUrl: string | undefined

    if (isClub) {
        headers = {...JSON.parse(`${process.env.NEXT_PUBLIC_HEADER_CLUB}`)}
        baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API_CLUB
    } else if (isNext) {
        headers = {...JSON.parse(`${process.env.NEXT_PUBLIC_HEADER_NEXT}`)}

    } else {
        headers = {...JSON.parse(`${ process.env.NEXT_PUBLIC_HEADER_CRAFTY}`)}
        baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API_CRAFTY
    }

    let payload: any = {
        headers: headers,
        baseURL: baseUrl,
        url,
        data,
        method,
        params
    }

    if(access.api_token && isClub) payload.headers.userToken = access.api_token || config.token;
    if(access.api_token && !isClub && !isNext) payload.headers[`X-Api-Key`] = access.api_token;

    if (config.token) {
        payload.headers.userToken = config.token
    }
    return fetchData(payload, (!disableToast ? (method === "GET" ? false : disableToast) : disableToast), config);
}

const get = (url: string, params?: object , config?: Config) => {
    return genericCall(url, 'GET', null, params, config);
}

const post = (url: string, data: any, config?: Config) => {
    return genericCall(url, 'POST', data, null, config);
}

const del = (url: string, data: any, config?: Config) => {
    return genericCall(url, 'DELETE', data, null, config);
}

const put = (url: string, data: any, config?: Config) => {
    return genericCall(url, 'PUT', data, null, config);
}

const handleError = (error: any, onlyShowToast?: boolean) => {
    if (typeof window !== "undefined") {
        toast?.update('1', { render: error || "Ops, ocorreu um erro!", type: "error", autoClose: 3000, pauseOnHover: true, closeOnClick: true, isLoading: false } as ToastOptions);
    }
    if (!onlyShowToast) {
        throw error
    }
}

const handleSuccess = (show: boolean, message?: string) => {
    if (typeof window !== "undefined") {
        show && toast?.update('1', { render: message || 'Tudo certo!', type: "success", closeOnClick: true, autoClose: 3000, isLoading: false } as ToastOptions);
    }
}

const isToastFetching = (show: boolean) => {
    if (typeof window !== "undefined") {
        show && toast?.loading("Carregando...", { toastId: '1' });
    }
}

const fetchData = async (params: AxiosRequestConfig, disableToast: boolean, config: Config) => {
    try {
        !disableToast && isToastFetching(params.method !== 'GET');
        let response: AxiosResponse = await axios.request(params);
        !disableToast && handleSuccess(params.method !== 'GET', (response.data?.message));
        return response.data;
    } catch (error: any) {
        if (error?.response) {

            if (error?.response?.data?.validator) {
                const validators = Object.keys(error.response.data?.validator);
                if (validators.length > 0) {
                    return handleError(error?.response?.data.validator[validators[0]][0])
                } else {
                    return handleError(error?.response?.data?.message)
                }
            } else if (error?.response?.data?.message) {
                if (config.isCrafty) {
                    handleError(error?.response?.data?.message, true)
                    throw error.response.data
                } else {
                    return handleError(error?.response?.data?.message)
                }
            } else {
                return handleError('Ops, ocorreu um erro!')
            }
        } else if (error?.request) {
            return handleError(error?.request);
        } else {
            return handleError(error?.message);
        }
    }
};

const api = {
    get,
    post,
    del,
    put,
}

export default api;
