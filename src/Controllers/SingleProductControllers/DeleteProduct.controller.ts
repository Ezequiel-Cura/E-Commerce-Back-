import { Request,Response } from "express";
import Product from "../../models/Product"
import { deleteProductService } from "../../Services/Product/Product.service";
import { deleteImage } from "../../utils/cloudinary";


const deleteProduct = async (req: Request, res: Response)=>{
    try {
        console.log("body",req.body)
        let {id,image} = req.params
        // const {name,product_id} = req.body;
        const deletedProduct = await deleteProductService(id)
        image = image.split("_").join("/") 
        if(image === "e-commerce/unavailable-image"){
            image = ""
        }
        if(image !== ""){
            console.log(image)
            await deleteImage(image)
        }
        
        res.status(200).send({msg: "Product deleted succesfully"})
        
    } catch (error:any) {
        res.status(error.statusCode).send({msg: error.msg})
        console.log(error)
    }
}

export default deleteProduct