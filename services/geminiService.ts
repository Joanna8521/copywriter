
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Platform, Tone } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCopy = async (topic: string, platform: Platform, tone: Tone): Promise<string> => {
  const prompt = `請針對「${topic}」，撰寫一則適合「${platform}」的社群文案，語氣風格為「${tone}」。文案需包含吸引人的開頭、主題內容、結尾的互動引導，並使用繁體中文。`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    throw new Error("Failed to generate content from Gemini API.");
  }
};
