import { Router } from "express";
const router = Router()

import getProducts from "../../Controllers/ProductsControllers/getProducts.controller"


router.get("/",getProducts)
    // .put("/")
    // .delete("/")
    //.post("/")

    
export default router;