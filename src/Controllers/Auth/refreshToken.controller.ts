import { Request,Response } from "express";
import { getUser, getUserWithRefreshToken } from "../../Services/auth/user.services";

import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const handleRefreshToken =async (req:Request,res:Response) => {
    const cookies = req.cookies

    if(!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt;

    const userFound = await getUserWithRefreshToken(refreshToken)
    if(!userFound) return res.sendStatus(403)

    try {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET!,
            (err:any,decoded:any)=>{
                if(err || userFound.email !== decoded.email) return res.sendStatus(403)
                const accessToken = jwt.sign(
                    {
                        "email":userFound.email
                    },
                    process.env.ACCESS_TOKEN_SECRET!,
                    {expiresIn:"15m"}
                )
                res.json({accessToken})
            }
        )
        

    } catch (error:any) {
        res.status(error.statusCode).send(error)
    } 
    
}



export default handleRefreshToken