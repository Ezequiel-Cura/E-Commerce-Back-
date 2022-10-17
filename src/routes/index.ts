import {Router} from "express"

import UserRoutes from "./UserRoutes";
import ProductRoutes from "./ProductRoutes";
import ProductsRoutes from "./ProductsRoutes"

const router = Router()

router.use("/User",UserRoutes);
router.use("/Product",ProductRoutes);
router.use("/Products",ProductsRoutes)

export default router;

