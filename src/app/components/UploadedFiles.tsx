import FileUploadProgress from './FileUploadProgress';
import { useFilesUpload } from '../contexts/filesUploaderContext';


export default function UploadedFiles() {
  const { allFiles } = useFilesUpload();

    return (allFiles.map(file => <FileUploadProgress {...file} key={file.id} />));
  }