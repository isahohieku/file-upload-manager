export type UploadedFile = { file: File, progress: number, status: boolean };

export type FilesUploadContextProps = {
  allFiles: UploadedFile[];
  handleOnFilesUploaded(files: File[]): void;
};
