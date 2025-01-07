import React from "react";
import { useRef, useEffect, useState } from "react";
import model from "@/lib/gemini";
import Markdown from "react-markdown";

function NewPropt() {
  const endRef = useRef(null);
  const [question, setQuestions] = useState("");
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [answer, question]);

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig: {
      // maxOutputTokens:100,
    },
  });
  const add = async (text) => {
    // const prompt = "Explain how AI works";
    setQuestions(text);
    const result = await chat.sendMessageStream(text);
    let answerText = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      answerText += chunkText;
      setAnswer(answerText);
    }

    // console.log(answerText);
    // console.log(result.response.text());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    add(text);
  };

  return (
    <>
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="pb-24" ref={endRef}>
        <form
          className="w-2/3 absolute bottom-0 bg-gray-800 rounded-2xl flex items-center gap-5 px-5"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="file"
            className="rounded-full bg-gray-600 border-none p-2 flex items-center justify-center cursor-pointer"
          >
            <img src="/attachment.png" alt="attachment" className="w-4 h-4" />
          </label>
          <input id="file" type="file" multiple={false} hidden />
          <input
            type="text"
            name="text"
            placeholder="Ask anything...."
            className="flex-1 p-5 border-none outline-none bg-transparent text-gray-200"
          />
          <button className="rounded-full bg-gray-600 border-none p-2 flex items-center justify-center">
            <img src="arrow.png" alt="send" className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  );
}

export default NewPropt;
