export const buildPrompt = (userInput, ingredients) => {
return `
You are a pizza assistant.

User request: "${userInput}"

Available ingredients:

Crust: ${ingredients.crust.map(i => i.name).join(", ")}
Sauce: ${ingredients.sauce.map(i => i.name).join(", ")}
Cheese: ${ingredients.cheese.map(i => i.name).join(", ")}
Toppings: ${ingredients.toppings.map(i => i.name).join(", ")}

Rules:
- ONLY use ingredients from the list
- Return STRICT JSON only
- No explanation
- Choose:
  -atleast 1 crust
  -atleast 1 sauce
  - 1 or more cheese or no cheese
  - 2 to 6 toppings or no toppings

Format:
{
  "crust": "",
  "sauce": "",
  "cheese": [],
  "toppings": []
}`
}