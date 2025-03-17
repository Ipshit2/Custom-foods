import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = async (req, res) => {
    const { name, password } = req.body;

    try {
        if (!name || !password) {
            return res.status(400).send({
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existedUser = await User.findOne({ name });
        if (existedUser) {
            return res.status(409).send({
                message: "User already exists"
            });
        }

        console.log("Existing User Check:", existedUser);

        // Hash password
        const hashpass = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashpass);

        // Create new user
        const user = await User.create({
            name,
            password: hashpass,
        });

        console.log("User Created:", user);

        if (!user) {
            return res.status(500).send({
                message: "Something went wrong while creating the user"
            });
        }

        return res.status(201).send({
            message: "User registered successfully"
        });

    } catch (error) {
        console.error("Error in register:", error);
        return res.status(500).send({
            message: "Something went wrong",
            error: error.message,
        });
    }
}

export const login = async(req,res)=>{
    const {name,password} = req.body
    try {
        if (!name|| !password ) {
            return res.status(400).send({
                message: " All fields are required "
            })
        }
        const existedUser = await User.findOne({name})
        if(!existedUser){
            
            return res.status(404).send({
                message : " User does not exists "
            })
        }
        const isPasswordValid = await bcrypt.compare(password, existedUser.password)
        if (!isPasswordValid) {
            return res.status(401).send({
                message : " Invalid password, enter correct password"
            })
        }
        const token = jwt.sign(
            { userId: existedUser._id, email: existedUser.email },  
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
            data: existedUser.role
        })
        
    } catch (error) {
        return res.status(500).send({
            message : " Something went wrong ",
        })
        
    } 
}

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
            message : " Something went wrong "
        })
    }
}
