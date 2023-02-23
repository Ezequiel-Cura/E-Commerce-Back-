import { Request,Response } from "express";
import Product from "../../models/Product"
import { deleteProductService } from "../../Services/Product/Product.service";

const deleteProduct = async (req: Request, res: Response)=>{
    try {
        const {id} = req.params
        const {name,product_id} = req.body;
        const deletedProduct = await deleteProductService(id)
        res.status(200).send({msg: "Product deleted succesfully"})
        
    } catch (error:any) {
        res.status(error.statusCode).send({msg: error.msg})
    }
}

export default deleteProduct