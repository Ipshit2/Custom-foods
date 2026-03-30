import axios from "axios";
import { buildPrompt } from "./prompt.js";

export const generatePizzaAI = async (userInput, ingredients) => {
  const prompt = buildPrompt(userInput, ingredients)

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }
  )

  const text =
    response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  const cleaned = text.replace(/```json|```/g, "").trim()

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("JSON PARSE ERROR:", cleaned)
    throw new Error("Invalid AI response")
  }
}