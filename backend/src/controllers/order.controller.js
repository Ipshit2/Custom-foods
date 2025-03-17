import { Ingredients } from "../models/ingredients.model.js";
import { Order } from "../models/order.model.js";

export const createOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const { orderInfo } = req.body;

        if (!orderInfo || !Array.isArray(orderInfo) || orderInfo.length === 0) {
            return res.status(400).json({ message: "Invalid order: No ingredients selected" });
        }

        const ingredients = await Ingredients.find({ _id: { $in: orderInfo } });

        let crustCount = 0;
        let sauceCount = 0;
        let cheeseCount = 0;
        let toppingCount = 0;

        ingredients.forEach(ingredient => {
            if (ingredient.type === "Crust") crustCount++;
            else if (ingredient.type === "Sauce") sauceCount++;
            else if (ingredient.type === "Cheese") cheeseCount++;
            else if (ingredient.type === "Topping") toppingCount++;
        });
        if (crustCount !== 1) {
            return res.status(400).json({ message: "You must select exactly 1 Crust." });
        }
        if (sauceCount !== 1) {
            return res.status(400).json({ message: "You must select exactly 1 Sauce." });
        }
        if (cheeseCount > 3) {
            return res.status(400).json({ message: "You can select a maximum of 3 Cheese options." });
        }
        if (toppingCount > 10) {
            return res.status(400).json({ message: "You can select a maximum of 10 Toppings." });
        }

        const ingredientNames = ingredients.map(ing => ing.name);
        console.log("Selected Ingredients:", ingredientNames);

        
        const totalPrice = ingredients.reduce((sum, ing) => sum + ing.price, 0);

        
        const newOrder = await Order.create({
            userid: userId,
            orderInfo,
            totalPrice,
            ingredients: ingredientNames
        });

        return res.status(201).json({ 
            message: "Order placed successfully", 
            order: newOrder,
            ingredients: ingredientNames
        });

    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

export const getallOrder = async(req,res)=>{
    try {
        const allorders = await Owner.find({})
    
        if (!allorders || allorders.length === 0) {
          return res.status(404).json({ message: "No Orders found" });
        }
    
        return res.status(200).json({
          message: "Order retrieved successfully",
          data: allorders,
        });
    
      } catch (error) {
        console.error("Error fetching Order:", error)
        return res.status(500).json({
          message: "Server error",
          error: error.message,
        });
      }
}