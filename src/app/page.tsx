'use client'
import FileUploader from './components/FileUploader';
import UploadedFiles from './components/UploadedFiles';
import { FilesUploadProvider } from './contexts/filesUploaderContext';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 mt-10">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Upload Your Files</h2>
        <p className="text-gray-500 dark:text-gray-400">Drag and drop your files or click to select.</p>
      </div>
      <FilesUploadProvider>
        <FileUploader />
        <UploadedFiles />
      </FilesUploadProvider>
    </div>
  );
}
