import { Router } from "express";
const router = Router()



// CONTROLLERS
import createProductController from "../../Controllers/SingleProductControllers/CreateProduct.controller"
import updateProductController from "../../Controllers/SingleProductControllers/updateProduct.controller"
import getProduct from "../../Controllers/SingleProductControllers/getProduct.controller"
import deleteProduct from "../../Controllers/SingleProductControllers/DeleteProduct.controller";


import verifyJWT from "../../middlewares/verifyJWT";



router.post("/",verifyJWT,createProductController)
    .get("/:id",getProduct)
    .put("/",verifyJWT,updateProductController)
    .delete("/:id&:image",verifyJWT,deleteProduct)

export default router;