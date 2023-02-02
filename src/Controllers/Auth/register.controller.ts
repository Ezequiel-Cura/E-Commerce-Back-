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
    const {name,email,password,userImg} = req.body
    
    try {
        const {error} = schema.validate({
            name:name,
            email:email,
            password:password
        })
        if(error){
            throw {statusCode: 400,msg:"Incorrect inputs or missing ones. Email, password, name required" }
            
        }

        const salt = await bcrypt.genSalt(Number(process.env.SUPER_SECRET_SALT))
        const passwordHash = await bcrypt.hash(password,salt)
        
        const userCreated = await createUser(name,email,passwordHash)// Estamos creando el user no es necesario devolver nada, SI HAY QUE DEVOVLER ALGO POR QUE NOS ESTAMOS REGISTRANDO------
        //No se la verdad estoy viendo si devolver algo 

        return res.status(200).send({ 
            success:{
                msg:"User created succefully",
                statusCode:200
            },
            // user:
            //     {
            //         name:userCreated.name,
            //         email:userCreated.email,
            //         password:userCreated.password
            //     }                
            })
    } catch (error:any) {
        res.status(error.statusCode ).send({
            statusCode: error.statusCode,
            errorMsg: error.msg
        })
    }
}

export default register