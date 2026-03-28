import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        customerid: {
            type: mongoose.Schema.Types.ObjectId,  
            ref: "Customer",
            required: true,
        },
        orderInfo: [{
            type: mongoose.Schema.Types.ObjectId,  
            ref: "Ingredients",
        }],
        ingredients:{
            type:[String]
        },
        totalPrice: {
            type: Number,
        },
        status:{
            type: String,
            enum: ["preparing", "ready"],
            default: "preparing"
        }
    },
    {
        timestamps: true
    }
);

export const Order = mongoose.model("Order", orderSchema);
