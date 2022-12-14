import { Request,Response } from "express";

import Product from "../../models/Product"
import Joi from "joi";
import fileUpload from "express-fileupload";
import {v4 as uuidv4} from "uuid"

import { uploadImage,deleteImage } from "../../utils/cloudinary";

const schema = Joi.object({
    name: Joi.string().required(),
    stock:Joi.number(),
    product_price: Joi.number().required(),
    presentation:Joi.string(),
    categories: Joi.array().items(Joi.string())
})


const createProductController = async (req:Request,res:Response)=>{
    
    const {name,stock,product_price,presentation,categories_string} = req.body
    const categories = categories_string.length === 0 ? [] : JSON.parse(categories_string)
    const variants = req.body.variants.length === 0 ? [] : JSON.parse(req.body.variants)
    console.log(req.files)
    try {
        const {error} = schema.validate({
            name:name,
            stock:stock,
            product_price: product_price,
            presentation:presentation,
            categories:categories
        })
        if(error) throw error

        const productFound = await Product.findOne({name:name})
        if(productFound) throw "That name already exist"

        let product_image = req.files?.product_image as fileUpload.UploadedFile

        
        const img_obj = await uploadImage(`${product_image?.tempFilePath}`)
        
        
        const product = await Product.create({
            product_id: uuidv4(),
            name,
            stock,
            product_price,
            product_image: img_obj.public_id,
            presentation,
            categories,
            variants
        })
        res.send("Product created succesfully\n" + product)
        
    } catch (err:any) {
        res.status(400).send("An error ocurred on createProduct\n"+ err.message)
        console.log(err)
    }
}


export default createProductController