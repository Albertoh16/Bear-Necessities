import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.REACT_APP_TEXT_API as string,
});

export interface CompanyInfo {
  CompanyName: string;
  History: string;
  Values: string;
  Environment: string;
}

export async function fetchCompanyInfoFromLink(
  link: string
): Promise<CompanyInfo | { raw: string } | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an API that outputs only raw JSON. 
    Extract the following information from the company website: ${link}.

    Return ONLY a JSON object with this exact structure (no extra text, no markdown):
    {
      "CompanyName": "",
      "History": "",
      "Values": "",
      "Environment": ""
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

