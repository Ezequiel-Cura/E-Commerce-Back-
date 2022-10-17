import { Request,Response } from "express";
import Product from "../../models/Product"


const deleteProduct = async (req: Request, res: Response)=>{
    try {
        const {name} = req.body
        await Product.deleteOne({name : name})
        res.send({"msg": "Deleted succesfully"})
        
    } catch (error) {
        res.send({"msg": "An Error ocurred at deleteProducts: " + error})
    }
}

export default deleteProduct