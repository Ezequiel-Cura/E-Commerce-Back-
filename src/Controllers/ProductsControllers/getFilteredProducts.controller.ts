import { Request,Response } from "express";
import Product from "../../models/Product"


const getFilteredProducts = async(req:Request,res:Response)=>{
    const {category} = req.params
    try {
        if(!category){
            return res.sendStatus(404)
        
        }else if(category === "default"){
            const products = await Product.find()
            return res.status(200).send({products})
        }else{
            const products = await Product.find()
            const filteredProducts = products.filter((p)=>{                
                if(p.categories.includes(category)){
                    return true
                }else return false
            })
            
            return res.status(200).send({products : filteredProducts})
        }
    } catch (error) {
        res.sendStatus(400)
    }
}


export default getFilteredProducts