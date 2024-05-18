import { Progress } from '@radix-ui/themes';
import { SVGProps, useEffect, useState } from 'react';
import { UploadedFile } from '../types/files';
import { checkStatus } from '../services/dragonfly';
import { useProgress } from '../hooks/useProgressHook';

interface Prop extends UploadedFile { }

export default function FileUploadProgress({ progress, file, taskId }: Prop) {
  const [status, setStatus] = useState(false);

  const { killProgress, progressCount } = useProgress();

  useEffect(() => {
    if (taskId) {
      checkStatus(taskId)
        .then(({ status: _status }) => {
          setStatus(_status === 'SUCCEEDED');
          killProgress();
        }).catch(() => killProgress());
    }
  }, [taskId]);
  return (<div className="flex items-center justify-between bg-gray-100 rounded-md p-2 w-full max-w-md">
    <div className="flex items-center space-x-2">
      <FileIcon className="h-5 w-5 text-gray-500" />
      <span className="font-medium">{file.name}</span>
    </div>
    <div className="flex items-center space-x-2">
      <Progress className="w-24" value={progress === 100 ? progress : progressCount} />
      <span className="text-gray-500">{progress === 100 ? progress : progressCount}%</span>
    </div>
  </div>)
}

function FileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}