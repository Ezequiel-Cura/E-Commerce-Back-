import { Router } from "express";
const router = Router()

import createProduct from "./createProduct"
import deleteProduct from "./deleteProduct"
import updateProduct from "./updateProduct"
import getProducts from "./getProducts"

router.use("/create",createProduct)
router.use("/delete",deleteProduct)
router.use("/update",updateProduct)
router.use("/getProducts",getProducts)



export default router;