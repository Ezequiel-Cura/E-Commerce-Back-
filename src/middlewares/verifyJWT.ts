import { Request,Response,NextFunction } from "express"

import jwt, { decode } from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


const verifyJWT = (req:Request,res:Response,next:NextFunction)=>{
    const authHeader = req.headers['authorization']
    if(!authHeader) return res.sendStatus(401)
    console.log(authHeader)// Bearer 'token'
    const token = authHeader.split(' ')[1]
    try {
        
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET!,
            (err,decoded:any)=>{
                if(err) return res.sendStatus(403); // Invalid token
                req.body.email = decoded.email;
                next()
            }
        )
    } catch (error) {
        console.log(error)
    }


}

export default verifyJWT