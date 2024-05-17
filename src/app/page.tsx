'use client'
import { useCallback, useState } from 'react';
import FileUploader from './components/FileUploader';
import FileUploadProgress from './components/FileUploadProgress';

export default function Home() {

  const [uploadProgress, setUploadProgress] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Upload Your Files</h2>
        <p className="text-gray-500 dark:text-gray-400">Drag and drop your files or click to select.</p>
      </div>
      <FileUploader />
      <FileUploadProgress />
      <FileUploadProgress />
      <FileUploadProgress />
    </div>
  );
}
