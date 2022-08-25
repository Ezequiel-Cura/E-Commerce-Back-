import {Router} from "express"
import Product from "../../models/Product"
const router = Router()

router.delete("/",async(req,res)=>{
    try {
        const {name} = req.body
        await Product.deleteOne({name : name})
        res.send({"msg": "Deleted succesfully"})
        
    } catch (error) {
        res.send({"msg": "An Error ocurred at deleteProducts: " + error})
    }
})

export default router