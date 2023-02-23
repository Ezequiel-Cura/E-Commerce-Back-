import { Request,Response } from "express";

import { getUser } from "../../Services/auth/user.services";

import Joi from "joi";
import bcrypt, { hash } from "bcrypt"

import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


const schema = Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required()
})

const login =async (req:Request,res:Response) => {
    const {email,password} = req.body

    try {

        const {error} = schema.validate({
            email,
            password
        })
        if(error){
            throw {statusCode: 400, msg:"Missing value email, password. Invalid values"}
        }
        const userFound = await getUser(email)

        // if(userFound?.refreshToken){
        //     throw {statusCode: 400, msg:"Already login"}
        // }


        if(!userFound) throw {statusCode:400, msg:"User not found"}
        const validPassword = await bcrypt.compare(password,userFound.password)
        if(!validPassword) throw {statusCode:400,msg:"Invalid Password"}
        
        console.log("hola---------------")
        const accessToken = jwt.sign(
            {
                "email":userFound.email
            },
            process.env.ACCESS_TOKEN_SECRET as string,
            {expiresIn:"1h"}
        )

        const refreshToken = jwt.sign(
            {
                "email":userFound.email
            },
            process.env.REFRESH_TOKEN_SECRET as string,
            {expiresIn:"1d"}
        )
        userFound.refreshToken = refreshToken;
        await userFound.save()

        res.cookie('jwt',refreshToken,{
            maxAge:24 * 60 * 60 * 1000,
            httpOnly:true
        })

        
        res.status(200).send({
            status:200,
            user: {
                name:userFound.name,
                email:userFound.email,
                isAdmin:userFound.isAdmin,
                img: userFound.img
            },
            accessToken
            
        })

        
    } catch (error:any) {
        console.log(error)
        res.status(error.statusCode).send(error.msg)
    } 
    
}



export default login