import { Request,Response } from "express";

import Joi from "joi";
import bcrypt from "bcrypt"

import {createUser} from "../../Services/auth/user.services";

const schema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required()
})


const register = async(req:Request, res:Response)=>{
    const {name,email,password} = req.body
    try {
        const {error} = schema.validate({
            name:name,
            email:email,
            password:password
        })
        if(error){
            res.status(400).send({status:400,msg:"Incorrect inputs or missing ones. Email, password, name required"})
        }

        const salt = await bcrypt.genSalt(Number(process.env.SUPER_SECRET_SALT))
        const passwordHash = await bcrypt.hash(password,salt)

        await createUser(name,email,passwordHash)

        res.status(200).send({status:200, msg:"User created succefully"})
    } catch (error:any) {
        res.status(error.status && 404).send(error)
    }
}

export default register