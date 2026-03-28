import { Ingredients } from "../models/ingredients.model.js";
import { Order } from "../models/order.model.js";

//order create
export const createOrder = async (req, res) => {
    try {
        const customerid = req.customer?._id;
        const { orderInfo } = req.body;

        if (!customerid) {
            return res.status(401).json({ message: "Unauthorized user" });
        }
        if (!orderInfo || !Array.isArray(orderInfo) || orderInfo.length === 0) {
        return res.status(400).json({
            message: "Invalid order: No ingredients selected",
        })}

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


        
        const price = ingredients.reduce((sum, ing) => sum + ing.price, 0);
        const totalPrice = price + 50
        
        const newOrder = await Order.create({
            customerid: customerid,
            orderInfo,
            totalPrice,
            ingredients: ingredientNames

        })

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

//retrive users order
export const getmyOrder = async(req,res)=>{
    try {
        const customerid = req.customer?._id;

        if (!customerid) {
        return res.status(401).json({ message: "Unauthorized user" });
        }

        const orders = await Order.find({ customerid }).sort({ createdAt: -1 });

        if (!orders.length) {
        return res.status(404).json({
            message: "No orders found",
        });
        }

        return res.status(200).json({
        message: "Orders fetched successfully",
        data: orders,
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({
        message: "Server error",
        error: error.message,
        })
    }
}

//all orders (for admin)
export const getallOrder = async(req,res)=>{
    try {
        const orders = await Order.find({})
      .populate("customerid", "name email")
      .sort({ createdAt: -1 })

        if (!orders.length) {
        return res.status(404).json({
            message: "No orders found",
        })}
    
        return res.status(200).json({
          message: "Order retrieved successfully",
          data: orders,
        })
    
      } catch (error) {
        console.error("Error fetching Order:", error)
        return res.status(500).json({
          message: "Server error",
          error: error.message,
        })
      }
}