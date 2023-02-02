import { Request,Response } from "express";
import { getUser, getUserWithRefreshToken } from "../../Services/auth/user.services";


const handleLogOut =async (req:Request,res:Response) => {
    //On client, also delete the accessToken
    const cookies = req.cookies
    
    if(!cookies?.jwt) return res.sendStatus(204); // No content
    console.log("hola")
    
    const refreshToken = cookies.jwt;

    const userFound = await getUserWithRefreshToken(refreshToken)
    console.log(userFound)
    if(!userFound) {
        res.clearCookie('jwt',{httpOnly:true,maxAge: 24 * 60 * 60 * 1000})
        return res.sendStatus(204)
    }

    //Delete refreshToken in db

    userFound.refreshToken = "";
    await userFound.save()
    

    res.clearCookie('jwt',{httpOnly:true,maxAge: 24 * 60 * 60 * 1000}) // secure:true - only en server on https (on production)
    res.sendStatus(204)
}



export default handleLogOut