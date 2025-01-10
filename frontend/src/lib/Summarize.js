'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const fileManager = new GoogleAIFileManager(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

export async function Summarize(formData) {
  try {
    const file = formData.get('document');
    if (!file) {
      throw new Error('No file uploaded');
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await fileManager.uploadFile(
      file.name,
      {
        mimeType: file.type,
        displayName: "Uploaded Document",
      },
      buffer
    );

    const result = await model.generateContent([
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      },
      'Summarize this document',
    ]);

    return { success: true, summary: result.response.text() };
  } catch (error) {
    console.error('Error summarizing document:', error);
    return { success: false, error: 'Failed to summarize document' };
  }
}

