
  export function FileAttachment({ filename, type }) {
    return (
      <div className="flex items-center gap-3 p-3 bg-zinc-900 rounded-lg max-w-xs">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col min-w-0">
          <p className="text-sm font-medium text-white truncate">{filename}</p>
          <p className="text-xs text-zinc-400 uppercase">{type}</p>
        </div>
      </div>
    )
  }
  
  