import { Progress } from '@radix-ui/themes';


export default function FileUploadProgress() {
    return (      <div className="flex items-center justify-between bg-gray-100 rounded-md p-2 w-full max-w-md">
    <div className="flex items-center space-x-2">
      <FileIcon className="h-5 w-5 text-gray-500" />
      <span className="font-medium">document.pdf</span>
    </div>
    <div className="flex items-center space-x-2">
      <Progress className="w-24" value={100} />
      <span className="text-gray-500">100%</span>
    </div>
  </div>)
}

function FileIcon(props) {
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