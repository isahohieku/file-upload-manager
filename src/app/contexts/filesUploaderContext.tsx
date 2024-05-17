'use client'
import { createContext, useContext, useState } from 'react';
import { FilesUploadContextProps, UploadedFile } from '../types/files';

export const FilesUploadContext = createContext<FilesUploadContextProps | null>(null);

export const FilesUploadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allFiles, setFiles] = useState<UploadedFile[]>([]);

  const handleOnFilesUploaded = (files: File[]) => {
    console.log({ files })
    setFiles((prevFiles) => {
      const newFiles: UploadedFile[] = [];
      files.forEach(_file => newFiles.push({ file: _file, progress: 0, status: false }));
      return [...newFiles, ...prevFiles];
    });
  }

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