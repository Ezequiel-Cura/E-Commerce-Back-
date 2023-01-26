import { Request,Response } from "express";

import Joi from "joi";


const createUser =async (req:Request,res:Response) => {
    const {email,name,password} = req.body;
    try {
        console.log(req.body)
        res.status(200).send(req.body)
    } catch (error) {
        res.status(404).send(error)
    }
}


export default createUser;