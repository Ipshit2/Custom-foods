import mongoose, {Schema} from "mongoose";


const ingredientsSchema = new Schema(
    {
        image:{
            type: String,
            required: true,
        },
        ontop:{
            type: String,
        },
        name: {
            type: String,
            required: true,
            unique: true,   
        },
        type:{
            type: String,
            enum:["Crust","Sauce","Cheese","Topping"],
            required: true,
        },
        price:{
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)


export const Ingredients = mongoose.model("Ingredients", ingredientsSchema)