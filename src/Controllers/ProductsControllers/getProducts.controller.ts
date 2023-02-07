import { Request,Response } from "express";
import Product from "../../models/Product"


const getProductsController = async (req: Request,res:Response)=>{
    const cookies = req.cookies
    console.log(cookies.jwt)
    try {
        const products = await Product.find()
        res.send({
            "number of products": products.length,
            products
        })
    } catch (error) {
        res.send({"msg": "An error ocurre at getProducts:\n" + error})
    }
}

export default getProductsController