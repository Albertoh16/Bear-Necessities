import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.REACT_APP_TEXT_API as string,
});

export interface CompanyInfo {
  question: string;
  answer: string;
  feedback: string;
}

export async function fetchCompanyInfoFromLink(
  inputQuestion: string,
  inputAnswer: string,
  inputTestCase: string,
  inputLanguege: string,

): Promise<CompanyInfo | { raw: string } | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an API that outputs only raw JSON. 
      read the question ${inputQuestion}. look at the user answer ${inputAnswer} now see if this is the correct answer to the 
      question it was coded to work in ${inputTestCase}

    Return ONLY a JSON object with this exact structure (no extra text, no markdown):
    {
      "question": "${inputQuestion}",
      "History": "${inputAnswer}",
      "Feedback": "",
    }`,
    });

    const textResponse = response?.text || "";

    try {
      return JSON.parse(textResponse) as CompanyInfo;
    } catch {
      return { raw: textResponse }; 
    }
  } catch (error) {
    console.error("Error fetching company info:", error);
    return null;
  }
}

