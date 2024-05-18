import { Api } from "@/app/libs/api";
import { stageFile } from "../aws";
import { AxiosOnProgress } from "@/app/types/files";
import { readFileAsBinary } from "@/app/util/file-converter";

const GENERATE_PATH = 'stage';
const START_PROCESSING_PATH = 'process';
const STATUS_PATH = 'status';

export const generateURL = (): Promise<{ key: string; url: string }> => Api.post(GENERATE_PATH, undefined);

export const startProcessing = (key: string, onUploadProgress: AxiosOnProgress): Promise<{ key: string; taskId: string }> => {
    const query = new URLSearchParams({
        key,
        pipeline: 'dragonfly-img-basic',
    });

    return Api.post(START_PROCESSING_PATH, query, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        onUploadProgress,
    });
};

export const checkStatus = (taskId: string) => Api.post<{ taskId: string }, { status: string }>(
    STATUS_PATH,
    { taskId },
    {
        headers: {
            'Cache-Control': 'no-store',
        }
    });

export const handleProcessingFileUpload = async (
    file: File,
    onUploadProgress: AxiosOnProgress,
    onComplete: (taskId: string) => void
) => {
    const dataBinary = await readFileAsBinary(file);

    try {
        /* Generate url */
        const { url, key } = await generateURL();

        /* Stage file at AWS S3 */
        await stageFile(url, dataBinary);

        /* Start processing job */
        const { taskId } = await startProcessing(key, onUploadProgress);
        onComplete(taskId)
    } catch (error) {
        console.log('Error', error)
    }
}

