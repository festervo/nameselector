import { GoogleGenAI } from "@google/genai";

// FIX: Initialize the GoogleGenAI client using the API_KEY from environment variables directly, as per guidelines.
// The API key is expected to be set in the environment variables.
// We assume `process.env.API_KEY` is available and valid.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateCompanyName = async (emoji1Name: string, emoji2Name: string): Promise<string> => {
  const prompt = `Generate a single, fun, and catchy company name by magically fusing the concepts of '${emoji1Name}' and '${emoji2Name}'. The name should be a single word in PascalCase, sounding like a modern startup brand (e.g., 'ZapFox', 'GlowBean'). Respond with only the name. No explanations, no punctuation, just the name.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      // FIX: Use a simple string for the prompt as per the latest guidelines for text-only input.
      contents: prompt,
    });
    
    // Clean up the response to ensure it's a single, valid word.
    const text = response.text.trim().replace(/[^a-zA-Z0-9]/g, '');
    if (!text) {
        throw new Error("Received empty response from API");
    }
    return text;
  } catch (error) {
    console.error("Error generating company name with Gemini:", error);
    // Provide a simple fallback in case of an API error to keep the app functional.
    const capitalized1 = emoji1Name.charAt(0).toUpperCase() + emoji1Name.slice(1);
    const capitalized2 = emoji2Name.charAt(0).toUpperCase() + emoji2Name.slice(1);
    return `${capitalized1}${capitalized2}`;
  }
};
