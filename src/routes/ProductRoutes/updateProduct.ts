import {Router} from "express"
import Product from "../../models/Product"
const router = Router()

router.put("/",async(req,res)=>{
    const {product_id} = req.body
    try {
        await Product.updateOne({product_id : product_id},{  })
    } catch (error) {
        res.status(404).send("An error appeared at updateProduct\n" + error)
    }
})

export default router