import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@radix-ui/themes';

export default function FileUploader() {
    return (<div className="w-full max-w-md border-2 !border-gray-300 border-dashed rounded-lg p-6 flex flex-col items-center justify-center space-y-4">
    <CloudUploadIcon className="h-12 w-12 text-gray-400" />
    <p className="text-gray-500 dark:text-gray-400">Drag and drop your files here</p>
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant='outline'>
          Select Files
          <input className="hidden" type="file" />
        </Button>
      </Dialog.Trigger>
    </Dialog.Root>
  </div>)
}

function CloudUploadIcon(props) {
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
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M12 12v9" />
        <path d="m16 16-4-4-4 4" />
      </svg>
    );
  }