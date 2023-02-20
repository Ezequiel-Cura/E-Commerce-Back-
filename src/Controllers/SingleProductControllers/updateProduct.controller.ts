import { Request,Response } from "express";
import Product from "../../models/Product"
import { updateProductFeatureService } from "../../Services/Product/Product.service";


const updateProduct =async (req:Request,res: Response) => {
    const {product_id} = req.body
    console.log(req.body)
    const quantity = req.body?.update_value?.quantity
    const feature = req.body?.update_value?.feature
    const name = req.body?.update_value?.name

    // const {feature,name} = req.body?.update_value 
    console.log(feature,name,quantity)
    if(!product_id){       
        return res.status(400).send({msg:"Missing product_id"})
    }
    if(quantity === undefined && feature === undefined && name === undefined){
        return res.status(400).send({msg:"Missing key values for update"})
    }

    
    
    try {
        if(feature){
            await updateProductFeatureService(product_id)
            return res.status(200).send("Product updated succesfully :)")
        }
        else if(quantity){
            await Product.updateOne({product_id : product_id},{quantity: quantity} )
            return res.status(200).send("Product updated succesfully :)")
        }else if(name){
            await Product.updateOne({product_id : product_id},{name: name} )
        }

        res.status(200).send("Product updated succesfully :)")

    } catch (error) {
        res.status(404).send("An error appeared at updateProduct\n" + error)
    }
}


export default updateProduct