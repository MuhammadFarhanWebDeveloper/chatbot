import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateTitle = async (message: string): Promise<string> => {
  try {
    const prompt = `Generate a very short and meaningful conversation title (only 2-3 words) based on this first message: "${message}". Return only the title, nothing else.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const title = response.text().trim();

    // Ensure title length is within 2-3 words
    const words = title.split(" ");
    if (words.length < 2 || words.length > 3) {
      return "New Chat"; // Fallback if Gemini returns too long/short title
    }

    return title;
  } catch (error) {
    console.error("Error generating title:", error);
    return "New Chat"; // Fallback in case of failure
  }
};
