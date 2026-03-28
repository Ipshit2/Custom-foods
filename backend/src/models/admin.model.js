import mongoose, {Schema} from "mongoose";


const adminSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role:{
            type: String,
            default:"ADMIN"
        }
    },
    {
        timestamps: true
    }
)


export const Admin = mongoose.model("Admin", adminSchema)