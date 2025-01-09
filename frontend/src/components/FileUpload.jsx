import React from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
function FileUpload() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const summarizePDF = async () => {
    // if (!file) {
    //   alert("Please upload a PDF file!");
    //   return;
    // }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Hello" }],
          },
          {
            role: "model",
            parts: [
              { text: "Great to meet you. What would you like to know?" },
            ],
          },
        ],
      });
    let result = null;
    let pdfData = null;

    // If there is a file (PDF), read and convert it to base64
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        pdfData = reader.result.split(',')[1]; // Get base64 data

        try {
          // If there's a PDF file, send it to the generative AI model for summarization
          result = await chat.sendMessageStream([
            {
              inlineData: {
                data: pdfData,
                mimeType: "application/pdf",
              },
            },
            "Summarize this document",
          ]);
        } catch (error) {
          console.error("Error summarizing PDF:", error);
          setSummary("Failed to generate summary.");
        }
      };
      reader.readAsDataURL(file); // Convert the file to base64
    } else {
      // If no file is provided, ask a question
      try {
        result = await chat.sendMessageStream("How to make a resume");
      } catch (error) {
        console.error("Error generating response:", error);
        setSummary("Failed to generate response.");
      }
    }

    if (result) {
      let accumulatedText = "";
      console.log("Stream started");

      // Iterate over the stream to accumulate the response
      for await (const chunk of result.stream) {
        const chunkText = chunk.text(); // Assuming chunk is directly text
        console.log("Received chunk:", chunkText);
        accumulatedText += chunkText;

        // Update the summary as new text comes in
        setSummary(accumulatedText);
      }

      // Final summary after stream finishes
      setSummary(accumulatedText);
    }

    setLoading(false);

    // reader.readAsDataURL(file); // Convert file to base64
  };

  return (
    <div className="App">
      <h1>PDF Summarizer</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={summarizePDF} disabled={loading}>
        {loading ? "Summarizing..." : "Summarize PDF"}
      </button>
      {summary && (
        <div>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default FileUpload;

// if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = async () => {
    //     const pdfData = reader.result.split(",")[1]; // Get base64 data

    //     try {
    //       result = await chat.sendMessageStream([
    //         {
    //           inlineData: { data: pdfData, mimeType: "application/pdf" },
    //         },
    //         userMessage,
    //       ]);
    //       // Keep track of the last bot message index
    //       setMessages((prevMessages) => {
    //         const updatedMessages = [
    //           ...prevMessages,
    //           { text: "", sender: "bot", isComplete: false },
    //         ];
    //         botMessageIndex = updatedMessages.length - 1;
    //         return updatedMessages;
    //       });
    //       botMessageIndex = messages.length;
    //       let accumulatedText = "";

    //       // Accumulate chunks of data and update bot's message
    //       for await (const chunk of result.stream) {
    //         const chunkText = chunk.text(); // Assuming chunk is directly text
    //         accumulatedText += chunkText;

    //         setMessages((prevMessages) => {
    //           const updatedMessages = [...prevMessages];
    //           updatedMessages[botMessageIndex].text = accumulatedText; // Update bot message in real-time
    //           return updatedMessages;
    //         });
    //       }

    //       // Mark the message as complete
    //       setMessages((prevMessages) => {
    //         const updatedMessages = [...prevMessages];
    //         updatedMessages[botMessageIndex].isComplete = true;
    //         return updatedMessages;
    //       });

    //     } catch (error) {
    //       console.error("Error summarizing PDF:", error);
    //       setMessages((prevMessages) => [
    //         ...prevMessages,
    //         { text: "Failed to generate summary.", sender: "bot" },
    //       ]);
    //     }
    //   };
    //   setFile(null)
    //   reader.readAsDataURL(file);
    // } else {
    //   try {

    //     setMessages((prevMessages) => {
    //       const updatedMessages = [
    //         ...prevMessages,
    //         { text: "", sender: "bot", isComplete: false },
    //       ];
    //       botMessageIndex = updatedMessages.length - 1;
    //       return updatedMessages;
    //     });
    //     botMessageIndex = messages.length;

    //     result = await chat.sendMessageStream(userMessage);
    //     // Keep track of the last bot message index

    //     let accumulatedText = "";

    //     // Accumulate chunks of data and update bot's message
    //     for await (const chunk of result.stream) {
    //       const chunkText = chunk.text(); // Assuming chunk is directly text
    //       accumulatedText += chunkText;

    //       setMessages((prevMessages) => {
    //         const updatedMessages = [...prevMessages];
    //         updatedMessages[botMessageIndex].text = accumulatedText; // Update bot message in real-time
    //         return updatedMessages;
    //       });
    //     }

    //     // Mark the message as complete
    //     setMessages((prevMessages) => {
    //       const updatedMessages = [...prevMessages];
    //       updatedMessages[botMessageIndex].isComplete = true;
    //       return updatedMessages;
    //     });
    //   } catch (error) {
    //     console.error("Error generating response:", error);
    //     setMessages((prevMessages) => [
    //       ...prevMessages,
    //       {
    //         text: "Sorry, I encountered an error. Please try again.",
    //         sender: "bot",
    //       },
    //     ]);
    //   }
    // }