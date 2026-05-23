const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const {
    createUser,
    getUserByEmail
} = require("../models/userModel")

const signup = async(req,res)=>{

    try{

        const {fullname,email,password} = req.body

        const hashedPassword =
        await bcrypt.hash(password,10)

        const user =
        await createUser(
            fullname,
            email,
            hashedPassword
        )

        res.status(201).json({
            message:"User Created",
            user
        })

    }
    catch(error){

        console.log(error)

        res.status(500).json({
            message:"Signup Failed"
        })

    }

}

const login = async(req,res)=>{

    try{

        const {email,password}=req.body

        const user =
        await getUserByEmail(email)

        if(!user){

            return res.status(404).json({
                message:"User Not Found"
            })

        }

        const validPassword =
        await bcrypt.compare(
            password,
            user.password
        )

        if(!validPassword){

            return res.status(401).json({
                message:"Invalid Password"
            })

        }

        const token =
        jwt.sign(

            {
                id:user.id,
                email:user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn:"7d"
            }

        )

        res.json({

            message:"Login Successful",

            token,

            user:{
                id:user.id,
                fullname:user.fullname,
                email:user.email
            }

        })

    }
    catch(error){

        console.log(error)

        res.status(500).json({
            message:"Login Failed"
        })

    }

}

module.exports = {
    signup,
    login
}