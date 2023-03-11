import { Router } from "express";
const router = Router()

import getProducts from "../../Controllers/ProductsControllers/getProducts.controller"
import getFilteredProducts from "../../Controllers/ProductsControllers/getFilteredProducts.controller";

router.get("/:category",getFilteredProducts)
    .get("/",getProducts)
    // .put("/")
    // .delete("/")
    //.post("/")

    
export default router;