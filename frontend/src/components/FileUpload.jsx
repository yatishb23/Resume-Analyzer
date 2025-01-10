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

  // const summarizePDF = async () => {
  //   if (!file) {
  //     alert("Please upload a PDF file!");
  //     return;
  //   }
  //   const genAI = new GoogleGenerativeAI(apiKey);
  //   const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  //   const chat = model.startChat({
  //     history: [
  //       {
  //         role: "user",
  //         parts: [{ text: "Hello" }],
  //       },
  //       {
  //         role: "model",
  //         parts: [{ text: "Great to meet you. What would you like to know?" }],
  //       },
  //     ],
  //   });
  //   const reader = new FileReader();
  //   reader.onloadend = async () => {
  //     const pdfData = reader.result.split(",")[1];

  //     try {
  //       // If there's a PDF file, send it to the generative AI model for summarization
  //       const result = await model.generateContent([
  //         {
  //           inlineData: {
  //             data: pdfData,
  //             mimeType: "application/pdf",
  //           },
  //         },
  //         "Summarize this document",
  //       ]);
  //       console.log(result.response.text());
  //       setSummary(result.response.text())
  //     //   let accumulatedText = "";
  //     // console.log("Stream started");

  //     // for await (const chunk of result.stream) {
  //     //   const chunkText = chunk.text(); // Assuming chunk is directly text
  //     //   console.log("Received chunk:", chunkText);
  //     //   accumulatedText += chunkText;

  //     //   // Update the summary as new text comes in
  //     //   setSummary(accumulatedText);

  //     // setSummary(accumulatedText);
  //     } catch (error) {
  //       console.error("Error summarizing PDF:", error);
  //       setSummary("Failed to generate summary.");
  //     }
  //   };
  //   reader.readAsDataURL(file);
  //   setLoading(false);
  // };
  const summarizePDF = async () => {
    // if (!file) {
    //   alert("Please upload a PDF file!");
    //   return;
    // }

    setLoading(true);
    const apiKey = import.meta.env.VITE_API_KEY; // Replace with your actual API key
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
    });
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
    });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const pdfData = reader.result.split(",")[1];
        try {
          const result = await chat.sendMessageStream([
            {
              inlineData: {
                data: pdfData,
                mimeType: "application/pdf",
              },
            },
            "Summarize this document",
          ]);
          let accumulatedText = "";
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            console.log("Received chunk:", chunkText);
            accumulatedText += chunkText;

            setSummary(accumulatedText);
          }
          setSummary(accumulatedText);
        } catch (error) {
          console.error("Error summarizing PDF:", error);
          setSummary("Failed to generate summary.");
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    } else {
      try {
        const result = await chat.sendMessageStream("How to make tea");
        let accumulatedText = "";
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          console.log("Received chunk:", chunkText);
          accumulatedText += chunkText;

          setSummary(accumulatedText);
        }
        setSummary(accumulatedText);
      } catch (error) {
        console.error("Error summarizing PDF:", error);
        setSummary("Failed to generate summary.");
      } finally {
        setLoading(false);
      }
    }

    
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
