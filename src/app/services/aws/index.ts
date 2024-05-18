import axios from 'axios';
import { handleApiError } from '@/app/libs/api';

export const stageFile = (url: string, data: Uint8Array) => axios.put(url, data, {
    headers: {
        "Content-Type": 'image/jpeg',
    }
}).catch(handleApiError);
