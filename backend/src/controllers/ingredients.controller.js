import { Ingredients } from "../models/ingredients.model.js";

export const register = async (req, res) => {
    console.log(req.body);

    const { name, type, price } = req.body;
    try {
        if (!name || !type || !price) {
            return res.status(400).send({ message: "All fields are required" });
        }

        const existingIngredient = await Ingredients.findOne({ name });
        if (existingIngredient) {
            return res.status(409).send({ message: "Ingredient already exists" });
        }

        if (!req.file) {  
            console.error("No file uploaded");
            return res.status(400).json({ message: "No file uploaded" });
        }

        
        const imageUrl = `/uploads/${req.file.filename}`;

    
        const ingredient = await Ingredients.create({
            name,
            type,
            price,
            image: imageUrl 
        });

        console.log("Ingredient:", ingredient);

        return res.status(201).send({
            message: "Ingredient registered successfully",
            data: ingredient
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Something went wrong" });
    }
};

export const getingredients = async(req,res)=>{
    try {
        const all = await Ingredients.find({})
        return res.status(200).send({
            message: "All retrieved",
            data: all
        })
    } catch (error) {
        return res.status(500).send({
            message: "Server error",
        });   
    }
}