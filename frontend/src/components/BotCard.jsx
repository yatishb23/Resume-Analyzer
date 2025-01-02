import { useRef, useState } from "react";
import { FaUser, FaRobot } from "react-icons/fa";
import { Button} from "./ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "./ui/progress";
import Message from "./Message";
import { useTheme } from "./theme";

function ChatBotCard() {
  const [message, setMessage] = useState([]);
  const {theme, toggleTheme} = useTheme();
  const [newMessage, setNewMessage] = useState("");
  const divForScroll = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessage([...message, { text: newMessage, sender: "user" }]);
      botMessage(newMessage);
      setNewMessage("");
      setTimeout(() => {
        divForScroll.current.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setNewMessage("");
      setTimeout(() => {
        divForScroll.current.scrollIntoView({ behavior: "smooth" });
      }, 0);
      handleSend();
    }
  };

  const botMessage = async (userMessage) => {
    const { GoogleGenerativeAI } = require("@google/generative-ai");

    const genAI = new GoogleGenerativeAI();

    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(userMessage);
      const responseText = result.response.text();

      const botResponse = { text: responseText, sender: "bot" };
      setMessage((newMessage) => [...newMessage, botResponse]);
      setTimeout(() => {
        divForScroll.current.scrollIntoView({ behavior: "smooth" });
      }, 0);
    } catch (error) {
      console.error("Error generating bot response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
  className={`${
    theme === "dark" ? "bg-black-700 border border-purple-300" : ""
  } h-[670px] overflow-y-auto`} // Adjust max-height and overflow
>
      <CardHeader className="flex flex-row items-center justify-between p-6">
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
      <CardContent className="p-6">
        <div className="space-y-6">
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

          {/* ChatBot Section */}
          <div className="messageBox mt-6">
            {message.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user"
                    ? "user-message-container"
                    : "bot-message-container"
                }
              >
                <Message text={msg.text} />
                {msg.sender === "user" && <FaUser className="icon user-icon" />}
                {msg.sender === "bot" && <FaRobot className="icon bot-icon" />}
              </div>
            ))}
            <div ref={divForScroll}></div>
            {loading && (
              <div className="bot-message-container loading-container">
                <FaRobot className="icon bot-icon" />
                <div className="loading-spinner"></div>
                <Message text="AI is generating a response..." />
              </div>
            )}
          </div>
          <div className="field mt-4 flex justify-between">
            <input
              type="text"
              className="input"
              placeholder="Message ChatBot"
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              value={newMessage}
            />
            <button
              onClick={handleSend}
              className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ChatBotCard;
