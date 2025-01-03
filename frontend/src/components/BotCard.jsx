import { useRef, useState, useEffect } from "react";
import { MessageSquareDashedIcon, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Message from "./Message";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Progress } from "./ui/progress";
import MarkMessage from "./MarkDown";
import { FaUser, FaRobot } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";

function ChatBotCard() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const divForScroll = useRef(null);

  const apiKey = import.meta.env.VITE_API_KEY;

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
    const genAI = new GoogleGenerativeAI(apiKey);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await model.generateContent(userMessage);
      const responseText = result.response.text();
      const botResponse = { text: responseText, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Error generating bot response:", error);
      const errorMessage = {
        text: "Sorry, I encountered an error. Please try again.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full h-[670px] bg-white dark:bg-gray-800 shadow-xl flex flex-col">
      <CardHeader className="flex-shrink-0 flex flex-row items-center justify-between p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
            <div className="h-6 w-6 text-purple-600 dark:text-purple-400">
              📄
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            CONTENT
          </h2>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 px-4 py-1 rounded-full text-sm text-gray-600 dark:text-gray-300">
          5 ISSUES FOUND
        </div>
      </CardHeader>
      <CardContent className="flex flex-col h-[calc(100%-5rem)] overflow-hidden">
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

          <div className="bg-purple-50 dark:bg-purple-900 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-4">
              Job-Winning Resume In Minutes
            </h3>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6">
              Create an Enhancy Resume
            </Button>
          </div>

          {/* <div className="messageBox mt-6">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === 'user' ? 'user-message-container' : 'bot-message-container'}>
                <MarkMessage text={msg.text} />
                {msg.sender === 'user' && <FaUser className="icon user-icon" />}
                {msg.sender === 'bot' && <FaRobot className="icon bot-icon" />}
              </div>
            ))}
            <div ref={divForScroll}></div>
            {isLoading && (
              <div className="bot-message-container loading-container">
                <FaRobot className="icon bot-icon" />
                <div className="loading-spinner"></div>
                <Message text="AI is generating a response..." />
              </div>
            )}
          </div> */}

          {messages.map((msg, index) => (
            <MarkMessage text={msg.text} sender={msg.sender} />
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce delay-200" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-4 sticky bottom-0 bg-white dark:bg-gray-800">
          <div className="relative flex items-center w-full">
            <TextareaAutosize
              className="flex-grow resize-none rounded-t-lg border border-gray-300 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-gray-200 p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-black-400 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              minRows={1}
              maxRows={6} 
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black-600 hover:bg-black-500 text-white rounded-full h-8 w-8 flex items-center justify-center disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ChatBotCard;
