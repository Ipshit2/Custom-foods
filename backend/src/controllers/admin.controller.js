import { Admin } from "../models/admin.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//admin register
export const register = async (req, res) => {
    const { name, password, role } = req.body;

    try {
        if (!name || !password) {
            return res.status(400).send({
                message: "All fields are required"
            });
        }

        // Check if admin already exists
        const existedAdmin = await Admin.findOne({ name });
        if (existedAdmin) {
            return res.status(409).send({
                message: "Admin already exists"
            });
        }

        console.log("Existing Admin Check:", existedAdmin);

        // Hash password
        const hashpass = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashpass);

        // Create new admin
        const admin = await Admin.create({
            name,
            password: hashpass,
            role
        });

        console.log("Customer Admin Created:", admin);

        if (!admin) {
            return res.status(500).send({
                message: "Something went wrong while creating the user"
            });
        }

        return res.status(201).send({
            message: " admin registered successfully"
        });

    } catch (error) {
        console.error("Error in register:", error);
        return res.status(500).send({
            message: "Something went wrong",
            error: error.message,
        });
    }
}

//admin login
export const login = async(req,res)=>{
    const {name,password} = req.body
    try {
        if (!name|| !password ) {
            return res.status(400).send({
                message: " All fields are required "
            })
        }
        const existedAdmin = await Admin.findOne({name})
        if(!existedAdmin){
            
            return res.status(404).send({
                message : " ADmin does not exists "
            })
        }
        const isPasswordValid = await bcrypt.compare(password, existedAdmin.password)
        if (!isPasswordValid) {
            return res.status(401).send({
                message : " Invalid password, enter correct password"
            })
        }
        const token = jwt.sign(
            { adminid: existedAdmin._id, role: "ADMIN" },  
            process.env.TOKEN_SECRET,  
            { expiresIn: "1h" }  
        )
        res.cookie("token", token, {
            httpOnly: true, 
            secure: true ,  
            sameSite: "None",  
            maxAge: 3600000,  
        });
        
        return res.status(200).send({
            message: "Succesfully logged in",
            token: token,
            data: existedAdmin.role
        })
        
    } catch (error) {
        return res.status(500).send({
            message : " Something went wrong ",
        })
        
    } 
}

//admin logout
export const logout = async (req,res)=>{
    try {
        res.cookie('token'," ",{
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            expires: new Date(0),

        })
        return res.status(200).send({
            message: "Succesfully logged out"
        })  
    } catch (error) {
        return res.status(500).send({
            message : "admin Something went wrong "
        })
    }
}
