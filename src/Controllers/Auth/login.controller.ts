import { Request,Response } from "express";

import { getUser } from "../../Services/auth/user.services";

import Joi from "joi";
import bcrypt, { hash } from "bcrypt"



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
            res.status(400).send({status:400,msg:"Missing value mail, password. Invalid values"})
        }
        const userFound = await getUser(req.body)

        const validPassword = await bcrypt.compare(password,userFound.password)
        if(!validPassword) return res.status(400).send({status:400,msg:"Invalid Password"})
        res.status(200).send({status:200,body: userFound})

        res.status(200).send()
    } catch (error) {
        res.status(400).send(error)
    } 
    
}



export default login