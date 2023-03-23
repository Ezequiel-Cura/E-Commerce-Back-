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
    
    let {name,stock,product_price,presentation,categories_string} = req.body
    if(!categories_string) {
        categories_string = ""
    }
    if(!req.body.variants){
        req.body.variants = ""
    }
    const categories = categories_string.length === 0 ? [] : JSON.parse(categories_string)
    const variants = req.body.variants.length === 0 ? [] : JSON.parse(req.body.variants)
    
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
        let default_img = "";
        let img_obj:any;
        console.log("img---",product_image)
        if(!product_image){
            default_img = "e-commerce/unavailable-image.jpg"
        }else{
            img_obj = await uploadImage(`${product_image?.tempFilePath}`)
        }

        console.log("img---",default_img)

        
        console.log("LLEgue")
        
        
        const product = await Product.create({
            product_id: uuidv4(),
            name,
            stock,
            product_price,
            product_image: default_img.length > 1 ? default_img : img_obj.public_id,
            presentation,
            categories,
            variants
        })


        res.send({msg:"Product created succesfully\n" ,product})
        
    } catch (err:any) {
        res.status(400).send("An error ocurred on createProduct\n"+ err.message)
        console.log(err)
    }
}


export default createProductController