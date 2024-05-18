import { AxiosProgressEvent } from "axios";

export enum UploadStatus {
    NOT_STARTED = 'not_started',
    STARTED = 'started',
    COMPLETED = 'completed',
    FAILED = 'failed'
}

export type UploadedFile = { 
    file: File;
    progress: number;
    status: UploadStatus;
    id: string;
    taskId: string | null;
 };

export type FilesUploadContextProps = {
  allFiles: UploadedFile[];
  handleOnFilesUploaded(files: File[]): void;
};


export type AxiosOnProgress = ((progressEvent: AxiosProgressEvent) => void) | undefined;