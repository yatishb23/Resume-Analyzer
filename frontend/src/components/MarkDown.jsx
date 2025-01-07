// import ReactMarkdown from 'react-markdown'

// export default function MarkMessage({ text ,sender}) {
//   return (
//     <div className={`flex flex-col ${sender === "user" ? "justify-end" : "justify-start"} prose prose-sm dark:prose-invert max-w-none`}>
//       <ReactMarkdown
//         components={{
//           h1: ({ children }) => (
//             <h1 className="textext-xl font-semibold mb-4 mt-2 text-left items-baseline">{children}</h1>
//           ),
//           h2: ({ children }) => (
//             <h2 className="text-lg font-semibold mb-3 mt-4 text-left items-baseline">{children}</h2>
//           ),
//           h3: ({ children }) => (
//             <h3 className="text-base font-semibold mb-2 mt-3 text-left items-baseline">{children}</h3>
//           ),
//           p: ({ children }) => (
//             <p className="mb-2 text-gray-700 dark:text-gray-300 text-left">{children}</p>
//           ),
//           ul: ({ children }) => (
//             <ul className="list-disc list-inside mb-4 space-y-1 text-left">{children}</ul>
//           ),
//           ol: ({ children }) => (
//             <ol className="list-decimal list-inside mb-4 space-y-1 text-left inline-flex flex-wrap">{children}</ol>
//           ),
//           li: ({ children }) => (
//             <li className="text-gray-700 dark:text-gray-300 text-left">{children}</li>
//           ),
//           strong: ({ children }) => (
//             <strong className="font-semibold text-gray-900 dark:text-gray-100 text-left">{children}</strong>
//           ),
//           em: ({ children }) => (
//             <em className="italic text-gray-800 dark:text-gray-200 text-left">{children}</em>
//           ),
//         }}
//       >
//         {text}
//       </ReactMarkdown>
//     </div>
//   );
// }
import { FaUser, FaRobot } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { useTheme } from "./theme";

export default function MarkMessage({ text, sender, isStreaming }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`flex ${
        sender === "user" ? "justify-end" : "justify-start items-start"
      } mb-4`}
    >
      <div
        className={`flex items-start gap-3 max-w-[80%] ${
          sender === "user" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            sender === "user" ? "bg-gray-200 text-gray-600" : ""
          }`}
          style={{ alignSelf: "flex-start" }}
        >
          {sender === "user" ? (
            <FaUser className="h-4 w-4" />
          ) : (
            <FaRobot className="h-6 w-6" />
          )}
        </div>
        <div
          className={`rounded-lg px-3 py-2 ${
            sender === "user"
              ? "shadow bg-gray-100 text-black-700 dark:bg-gray-700 dark:text-gray-200 rounded-tl-none"
              : "shadow bg-white text-black-900 dark:bg-gray-800 dark:text-gray-200"
          }`}
        >
          <div
            className={`prose prose-sm max-w-none ${
              sender === "user" ? "prose-invert" : ""
            }`}
          >
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-xl font-semibold mb-4 mt-5 text-left">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-lg font-semibold mb-3 mt-4 text-left">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-base font-semibold mb-2 mt-3 text-left">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-2 text-left">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-4 space-y-1 text-left">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-4 space-y-1 text-left">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-left">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-left">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-left">{children}</em>
                ),
              }}
            >
              {text}
            </ReactMarkdown>
            {isStreaming && (
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 mt-2">
                <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
