import { Customer } from "../models/customer.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//customer register
export const register = async (req, res) => {
    const { name, password } = req.body;

    try {
        if (!name || !password) {
            return res.status(400).send({
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existedCustomer = await Customer.findOne({ name });
        if (existedCustomer) {
            return res.status(409).send({
                message: "User already exists"
            });
        }

        console.log("Existing User Check:", existedCustomer);

        // Hash password
        const hashpass = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashpass);

        // Create new user
        const customer = await Customer.create({
            name,
            password: hashpass,
        });

        console.log("Customer User Created:", customer);

        if (!customer) {
            return res.status(500).send({
                message: "Something went wrong while creating the user"
            });
        }

        return res.status(201).send({
            message: "Customer User registered successfully"
        });

    } catch (error) {
        console.error("Error in register:", error);
        return res.status(500).send({
            message: "Something went wrong",
            error: error.message,
        });
    }
}

//customer login
export const login = async(req,res)=>{
    const {name,password} = req.body
    try {
        if (!name|| !password ) {
            return res.status(400).send({
                message: " All fields are required "
            })
        }
        const existedCustomer = await Customer.findOne({name})
        if(!existedCustomer){
            
            return res.status(404).send({
                message : " User does not exists "
            })
        }
        const isPasswordValid = await bcrypt.compare(password, existedCustomer.password)
        if (!isPasswordValid) {
            return res.status(401).send({
                message : " Invalid password, enter correct password"
            })
        }
        const token = jwt.sign(
            { customerid: existedCustomer._id, email: existedCustomer.email },  
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
            data: existedCustomer.role
        })
        
    } catch (error) {
        return res.status(500).send({
            message : " Something went wrong ",
        })
        
    } 
}

//customer logout
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
            message : "user Something went wrong "
        })
    }
}
