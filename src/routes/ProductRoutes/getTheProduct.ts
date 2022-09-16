import {Router} from "express"
import Product from "../../models/Product"
const router = Router()

router.get("/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const product = await Product.findOne({product_id: id})
        res.status(200).send({product})
    } catch (error) {
        res.status(400).send({"msg": "An error ocurre at getProduct:\n" + error})
    }
})

export default router