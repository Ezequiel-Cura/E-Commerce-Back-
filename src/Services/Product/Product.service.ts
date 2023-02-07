import Product from "../../models/Product";

const createProduct = async()=>{

}

const getProductService = async(id:string)=>{
    const product = await Product.findOne({product_id : id})
    if(!product) throw {statusCode:404,msg: "Product not found"}
    return product
}

const updateProduct = async()=>{

}

const deleteProductService = async(name:string)=>{
    try {
        const deleteProduct = await Product.deleteOne({
            name : name
        })
        
        return deleteProduct
    } catch (error:any) {
        throw {statusCode:500,msg:error.msg}
    }
}



export {createProduct,getProductService,updateProduct,deleteProductService}