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
        },
        expireAt: {
        type: Date,
        default: () => new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        }
    },
    {
        timestamps: true
    }
);

orderSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export const Order = mongoose.model("Order", orderSchema);
