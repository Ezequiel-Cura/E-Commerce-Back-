import { Request,Response } from "express";
import { getUser, getUserWithRefreshToken } from "../../Services/auth/user.services";


const handleLogOut =async (req:Request,res:Response) => {
    //On client, also delete the accessToken
    const cookies = req.cookies
    
    if(!cookies?.jwt) return res.sendStatus(204); // No content
    
    
    const refreshToken = cookies.jwt;

    const userFound = await getUserWithRefreshToken(refreshToken)
    
    if(!userFound) {
        res.clearCookie('jwt',{
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly:true,
            secure:true,
            sameSite:"lax",
            path:"/"
        })
        return res.sendStatus(204)
    }

    //Delete refreshToken in db

    userFound.refreshToken = "";
    await userFound.save()    

    res.clearCookie('jwt',{
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly:true,
        secure:true,
        sameSite:"lax",
        path:"/"
    }) 
    res.sendStatus(204)
}

// secure:true - only en server on https (on production)

export default handleLogOut