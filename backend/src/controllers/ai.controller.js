import { Ingredients } from "../models/ingredients.model.js";
import { groupIngredients } from "../utils/group.ingredients.js";
import { generatePizzaAI } from "../services/geminiService.js";

export const generatePizza = async (req, res) => {
  try {
    const { prompt } = req.body

    if (!prompt) {
      return res.status(400).json({ error: "Prompt required" })
    }
    const ingredients = await Ingredients.find()
    const grouped = groupIngredients(ingredients)
    const result = await generatePizzaAI(prompt, grouped)

    res.json(result)

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "AI failed" })
  }
}