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
      contents: `Find the History, values and work environment of the company from the provided link ${link}. 
      Return this information in a JSON format such as:
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

