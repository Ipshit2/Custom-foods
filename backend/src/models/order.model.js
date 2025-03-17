import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        userid: {
            type: mongoose.Schema.Types.ObjectId,  
            ref: "User",
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
    },
    {
        timestamps: true
    }
);

export const Order = mongoose.model("Order", orderSchema);
