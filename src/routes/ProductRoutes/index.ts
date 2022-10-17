import { Router } from "express";
const router = Router()

// import createProduct from "./createProduct"
// import deleteProduct from "./deleteProduct"
// import updateProduct from "./updateProduct"
// import getProducts from "./getProducts"
// import getTheProduct from "./getTheProduct"

// CONTROLLERS
import createProductController from "../../Controllers/SingleProductControllers/CreateProduct.controller"
import updateProductController from "../../Controllers/SingleProductControllers/updateProduct.controller"
import getProduct from "../../Controllers/SingleProductControllers/getProduct.controller"
import deleteProduct from "../../Controllers/SingleProductControllers/DeleteProduct.controller";


// router.use("/create",createProduct)
// router.use("/delete",deleteProduct)
// router.use("/update",updateProduct)
// router.use("/getAllProducts",getProducts)
// router.use("/getProduct",getTheProduct)





router.post("/",createProductController)
    .get("/:id",getProduct)
    .put("/",updateProductController)
    .delete("/",deleteProduct)

export default router;