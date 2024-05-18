'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FilesUploadContextProps, UploadStatus, UploadedFile } from '../types/files';
import { handleProcessingFileUpload } from '../services/dragonfly';
import { AxiosProgressEvent } from 'axios';

export const FilesUploadContext = createContext<FilesUploadContextProps | null>(null);

export const FilesUploadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allFiles, setFiles] = useState<UploadedFile[]>([]);

  const handleUpdateStartStatus = (id: string) => {
    setFiles((files) => {
      const cloneFiles = [...files];
      const filePosition = getFilePosition(cloneFiles, id);
      cloneFiles[filePosition].status = UploadStatus.STARTED;
      return cloneFiles;
    });
  }

  const handleOnFilesUploaded = (files: File[]) => {
    setFiles((prevFiles) => {
      const newFiles: UploadedFile[] = [];
      files.forEach(_file => newFiles.push({
        file: _file,
        progress: 0,
        status: UploadStatus.NOT_STARTED,
        id: uuidv4(),
        taskId: null
      }));
      return [...newFiles, ...prevFiles];
    });
  }

  const getFilePosition = (files: UploadedFile[], id: string) => {
    const cloneFiles = [...files];
    return cloneFiles.findIndex(file => file.id = id);
  }

  const handleProgressUpdater = (progressEvent: AxiosProgressEvent, id: string) => {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent?.total || 0));
    setFiles((files) => {
      const cloneFiles = [...files];
      const filePosition = getFilePosition(cloneFiles, id);
      cloneFiles[filePosition].progress = percentCompleted;
      return cloneFiles;
    });
  }

  const handleOnProcessCompleted = (taskId: string, id: string) => {
    setFiles((files) => {
      const cloneFiles = [...files];
      const filePosition = getFilePosition(cloneFiles, id);
      cloneFiles[filePosition].taskId = taskId;
      return cloneFiles;
    });
  }

  const handleOnFailed = (id: string) => {
    setFiles((files) => {
      const cloneFiles = [...files];
      const filePosition = cloneFiles.findIndex(file => file.id = id);
      cloneFiles[filePosition].status = UploadStatus.FAILED;
      return cloneFiles;
    });
  }

  const uploadFile = () => {
    const newFiles = allFiles.filter(({ status }) => status === UploadStatus.NOT_STARTED);

    newFiles.forEach(({ file, id }) => {
      handleUpdateStartStatus(id)
      handleProcessingFileUpload(
        file,
        (progressEvent: AxiosProgressEvent) => handleProgressUpdater(progressEvent, id),
        (taskId: string) => handleOnProcessCompleted(taskId, id)),
        handleOnFailed
    })

  }

  useEffect(() => {
    uploadFile()
  }, [allFiles]);

  return (
    <FilesUploadContext.Provider
      value={{
        allFiles,
        handleOnFilesUploaded
      }}
    >
      {children}
    </FilesUploadContext.Provider>
  );
};

export const useFilesUpload = (): FilesUploadContextProps => {
  const context = useContext(FilesUploadContext);
  if (!context) {
    throw new Error('useFilesUpload must be used within a FilesUploadProvider');
  }
  return context;
};