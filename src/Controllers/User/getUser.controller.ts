import { Request,Response } from "express";
import { getUserWithRefreshToken } from "../../Services/auth/user.services";
import jwt, { decode } from "jsonwebtoken"

import dotenv from "dotenv"
dotenv.config()



const getUser =async (req:Request,res:Response) => {
    
    const cookies = req.cookies
    
    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt
    let expireRefreshToken = false;
    // ACA YO CREO QUE TENEMOS PRIMERO QUE VERIFICAR SI EL TOKEN ESTA VERIFICADO
    try {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET!,
            (err:any,decoded:any)=>{
                if(err){
                   expireRefreshToken = true;
                } // Invalid token
            }
        )
        if(expireRefreshToken){
            res.clearCookie('jwt',{
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly:true,
            })
            
            return res.sendStatus(304)
        }else{
            const userFound = await getUserWithRefreshToken(refreshToken)
            if(!userFound) return res.sendStatus(403)
        
            return res.status(200).send({
                user:{
                    name:userFound.name,
                    email:userFound.email,
                    isAdmin:userFound.isAdmin,
                    img: userFound.img
                }
            })

        }
        
    } catch (error) {
        res.status(400).send("Error occurried at getUser")
    }

}

export default getUser