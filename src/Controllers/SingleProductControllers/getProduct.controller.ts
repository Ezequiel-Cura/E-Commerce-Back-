import { Request,Response } from "express";
import { getProductService } from "../../Services/Product/Product.service";

const getProduct =async (req:Request,res: Response) => {
    const {id} = req.params
    try {
        // const product = await Product.findOne({product_id: id})
        const product = await getProductService(id)
        console.log(product)
        res.status(200).send({
            product:{
                product_id: product.product_id,
                name:product.name,
                product_image:product.product_image,
                feature:product.feature,
                product_price: product.product_price,
                categories: product.categories,
                variants:product.variants,
                presentation:product.presentation
            }
        })
    } catch (error) {
        res.status(400).send({"msg": "An error ocurre at getProduct:\n" + error})
        console.log(error)
    }
}

export default getProduct