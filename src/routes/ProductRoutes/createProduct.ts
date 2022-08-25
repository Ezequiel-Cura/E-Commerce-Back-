import { Router } from "express";
import Product from "../../models/Product"
import Joi from "joi";

const router = Router()

const schema = Joi.object({
    name: Joi.string().required(),
    product_price: Joi.number().required(),
    quantity:Joi.number(),
    product_image:Joi.string(),
})



router.post("/",async(req,res)=>{
    const {name,quantity,product_price,product_image} = req.body
    try {
        const {error} = schema.validate({
            name:name,
            quantity:quantity,
            product_price: product_price,
            product_image: product_image
        })
        if(error) throw error
        const productFound = await Product.findOne({name:name})
        if(productFound) throw "That name already exist"
        const product = await Product.create({
            name,
            quantity,
            product_id: idCreator(name),
            product_price
        })
        res.send("Product created succesfully\n" + product)
        
    } catch (error) {
        res.status(404).send("An error ocurred on createProduct\n"+ error)
    }
})

export default router;


function idCreator(name:string):number{
    let id = name.length
    name.split("").forEach((element,index )=> { id *= name.charCodeAt(index) });
    return id *= Math.round(Math.random() * 100) + Math.round(Math.random() * 50)
}
