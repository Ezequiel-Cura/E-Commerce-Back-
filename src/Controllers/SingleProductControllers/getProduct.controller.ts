import { Request,Response } from "express";
import Product from "../../models/Product"

const getProduct =async (req:Request,res: Response) => {
    const {id} = req.params
    try {
        const product = await Product.findOne({product_id: id})
        console.log(product)
        res.status(200).send({product})
    } catch (error) {
        res.status(400).send({"msg": "An error ocurre at getProduct:\n" + error})
        console.log(error)
    }
}

export default getProduct