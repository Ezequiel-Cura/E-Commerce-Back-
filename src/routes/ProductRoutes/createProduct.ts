import { Router } from "express";
import Product from "../../models/Product"

const router = Router()

router.post("/",async(req,res)=>{
    const {name,quantity} = req.body
    try {
        const product = await Product.create({name,quantity})
        res.send("Product created succesfully" + product)
        
    } catch (error) {
        res.send("An error ocurred on createProduct"+ error)
    }
})

export default router;