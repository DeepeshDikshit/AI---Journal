import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export async function generateJournalInsight(content){
  try{
    const model = genAI.getGenerativeModel({model:"gemini-2.0-flash"});

    const prompt = `You are an AI journaling assistant.
    Analyze the following journal entry and provide:
    - A 2–3 sentence summary of what the user wrote
    - The emotional tone (happy, sad, reflective, stressed, etc.)
    - A short motivational note or insight for the user
    
    Journal Entry:
    "${content}"`;
    const result = await model.generateContent(prompt);
    const response = await result.response.text()
    return response
  }catch (error){
    console.log("error generating ai insight:",error);
    return "ai could not process the entry"
  }
}