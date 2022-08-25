import {Router} from "express"
import Product from "../../models/Product"
const router = Router()

router.get("/",async(req,res)=>{
    try {
        const products = await Product.find()
        res.send({
            "number of products": products.length,
            products
        })
    } catch (error) {
        res.send({"msg": "An error ocurre at getProducts:\n" + error})
    }
})

export default router