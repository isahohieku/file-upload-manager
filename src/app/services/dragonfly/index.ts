import { Api } from "@/app/libs/api";
import qs from 'querystring';

const GENERATE_PATH = 'stage';
const START_PROCESSING_PATH = 'process';
const STATUS_PATH = 'status';

export const generateURL = () => Api.post(GENERATE_PATH, {});

export const startProcessing = () => {
    const data = {
        key: 'key',
        pipeline: 'dragonfly-img-basic',
    };

    const search = qs.stringify(data);

    return Api.put(`${START_PROCESSING_PATH}?${search}`, data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
}

export const checkStatus = (taskId: string) => Api.post(STATUS_PATH, { taskId }, {
    headers: {
        'Cache-Control': 'no-store'
    }
})

