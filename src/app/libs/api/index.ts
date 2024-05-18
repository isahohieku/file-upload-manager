import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import _axios from 'axios';
import { API_BASE_URL, API_KEY } from '../../app-constants';

export const axios: AxiosInstance = _axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: API_KEY
    },
});

const handleApiSuccess = <T>(res: AxiosResponse<T>): T => {
    return res.data;
};

export const handleApiError = (error: AxiosError): void => {
    let errorMessage = '';

    if (!error.status) {
        errorMessage = error.message;
    }

    if (_axios.isCancel(error)) {
        return; // Fail silently
    }

    throw errorMessage;
};

export const Api = {
    get: <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> =>
        axios.get(endpoint, config).then(handleApiSuccess).catch(handleApiError),
    post: <T, U>(endpoint: string, data: T, config?: AxiosRequestConfig): Promise<U> =>
        axios.post(endpoint, data, config).then(handleApiSuccess).catch(handleApiError),
    put: <T, U>(endpoint: string, data: T, config?: AxiosRequestConfig): Promise<U> =>
        axios.put(config?.url || endpoint, data, config).then(handleApiSuccess).catch(handleApiError),
};
