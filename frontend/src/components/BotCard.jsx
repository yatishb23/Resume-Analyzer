import { useRef, useState, useEffect } from "react";
import { Send } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TextareaAutosize from "react-textarea-autosize";
import Markdown from "react-markdown";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useTheme } from "./theme";
import { Share2, Mic, X,File } from "lucide-react";
import { Progress } from "@radix-ui/react-progress";
import chat from "@/lib/gemini";

function ChatBotCard() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const messagesEndRef = useRef(null);
  const [file, setFile] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (newMessage.trim()) {
      const userMessage = { text: newMessage, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage("");

      await botMessage(newMessage);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const botMessage = async (userMessage) => {
    setIsLoading(true);

    let botMessageIndex;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const pdfData = reader.result.split(",")[1];
        try {
          setMessages((prevMessages) => {
            const updatedMessages = [
              ...prevMessages,
              { text: "", sender: "bot", isComplete: false },
            ];
            botMessageIndex = updatedMessages.length - 1;
            return updatedMessages;
          });
          const result = await chat.sendMessageStream([
            {
              inlineData: {
                data: pdfData,
                mimeType: "application/pdf",
              },
            },
            userMessage,
          ]);
          let accumulatedText = "";
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            console.log("Received chunk:", chunkText);
            accumulatedText += chunkText;

            setMessages((prevMessages) => {
              const updatedMessages = [...prevMessages];
              if (updatedMessages[botMessageIndex]) {
                updatedMessages[botMessageIndex].text = accumulatedText;
              }
              return updatedMessages;
            });
          }
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            if (updatedMessages[botMessageIndex]) {
              updatedMessages[botMessageIndex].isComplete = true;
            }
            return updatedMessages;
          });
        } catch (error) {
          console.error("Error summarizing PDF:", error);
          setSummary("Failed to generate summary.");
        } finally {
          setIsLoading(false);
        }
      };
      setFile(null);
      reader.readAsDataURL(file);
    } else {
      try {
        setMessages((prevMessages) => {
          const updatedMessages = [
            ...prevMessages,
            { text: "", sender: "bot", isComplete: false },
          ];
          botMessageIndex = updatedMessages.length - 1;
          return updatedMessages;
        });

        const result = await chat.sendMessageStream(userMessage);

        let accumulatedText = "";
        console.log("Stream started");

        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          console.log("Received chunk:", chunkText);
          accumulatedText += chunkText;

          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            if (updatedMessages[botMessageIndex]) {
              updatedMessages[botMessageIndex].text = accumulatedText;
            }
            return updatedMessages;
          });
        }

        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          if (updatedMessages[botMessageIndex]) {
            updatedMessages[botMessageIndex].isComplete = true;
          }
          return updatedMessages;
        });

        console.log("Stream finished");
      } catch (error) {
        console.error("Error generating bot response:", error);

        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          if (updatedMessages[botMessageIndex]) {
            updatedMessages[botMessageIndex].text =
              "Sorry, I encountered an error. Please try again.";
          }
          return updatedMessages;
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAttachment = (e) => {
    setFile(e.target.files[0]);
  };

  const removeAttachment = (e) => {
    setFile(null);
  };

  return (
    <Card className="w-full h-[670px] bg-white dark:bg-black-600 shadow-xl flex flex-col border border-white">
      <CardHeader className="flex-shrink-0 flex flex-row items-center justify-between p-4 ">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 pl-6">
          ChatBot
        </h2>
      </CardHeader>
      <CardContent className="pl-20 pr-20 flex flex-col item-center h-[calc(100%-5rem)] overflow-hidden">
        <div className="flex-grow overflow-y-auto space-y-4 p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
              <span className="text-purple-600 dark:text-purple-400">⚡</span>
              ATS PARSE RATE
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              An <span className="font-medium">Applicant Tracking System</span>{" "}
              commonly referred to as <span className="font-medium">ATS</span>{" "}
              is a system used by employers and recruiters to quickly scan a
              large number of job applications.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A high parse rate of your resume ensures that the ATS can read
              your resume, experience, and skills. This increases the chance of
              getting your resume seen by recruiters.
            </p>
            <Progress value={87} className="h-2" />
            <div className="text-center">
              <h4 className="font-semibold text-xl mb-2 text-gray-800 dark:text-gray-200">
                Great!
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                We parsed 87% of your resume successfully using an
                industry-leading ATS.
              </p>
            </div>
          </div>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <div className="flex-shrink-0 pt-4 mr-3">
                  {/* Bot Avatar */}
                  <svg
                    className={`h-5 w-5 ${
                      theme === "dark" ? "text-white" : "text-black-500"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                  </svg>
                </div>
              )}
              <div
                className={`message p-3 rounded-md ${
                  msg.sender === "user"
                    ? "bg-gray-500 text-white rounded-bl-md rounded-tr-md"
                    : "w-3/4 "
                }`}
              >
                <Markdown
                  className={`flex flex-col text-sm ${
                    msg.sender === "user"
                      ? "flex-end justify-end items-end text-right"
                      : "flex-start justify-start items-baseline text-left gap-4"
                  }`}
                >
                  {msg.text}
                </Markdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <svg
                className="animate-spin h-5 w-5 text-gray-500 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              <span className="text-sm">Bot is typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <div className="border-t p-4 sticky bottom-0 rounded-br-lg rounded-bl-lg border border-none bg-white dark:bg-black-600">
        <div className="relative flex flex-col w-full rounded-lg border border-gray-600 bg-[#2A2A2A] hover:bg-[#313131]  transition-colors">
          {file && (
            <div className="p-3 rounded-md flex items-center space-x-2 mb-2">
            <File className="h-6 w-6 text-white"/>
              <span className="text-sm text-gray-300 truncate max-w-full">
                {file.name}
              </span>
              <button
                onClick={removeAttachment}
                className="text-gray-400 hover:text-gray-200"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="relative flex items-center w-full">
            <label
              htmlFor="file-input"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-300"
            >
              <img
                src="/attachment.png"
                className="h-5 w-5"
                alt="Attach file"
              />
            </label>

            <input
              type="file"
              id="file-input"
              className="hidden"
              onChange={handleAttachment}
            />

            <TextareaAutosize
              className="pl-12 flex-grow resize-none bg-transparent text-gray-200 py-3 focus:outline-none placeholder-gray-400"
              placeholder="Send a message or drop a file..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              minRows={1}
              maxRows={6}
            />

            <button
              onClick={handleSend}
              disabled={isLoading}
              className="flex items-center justify-center h-10 w-10 mr-3 text-gray-400 hover:text-gray-300 disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ChatBotCard;
