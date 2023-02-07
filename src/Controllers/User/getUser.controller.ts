import { Request,Response } from "express";
import { getUserWithRefreshToken } from "../../Services/auth/user.services";




const getUser =async (req:Request,res:Response) => {
    const {mail,passwrod} = req.body;
    const cookies = req.cookies
    // console.log("getUserController")
    // console.log(cookies)
    if(!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt

    const userFound = await getUserWithRefreshToken(refreshToken)
    if(!userFound) return res.sendStatus(403)

    res.status(200).send({
        user:{
            name:userFound.name,
            email:userFound.email,
            isAdmin:userFound.isAdmin,
            img: userFound.img
        }
    })

}

export default getUser