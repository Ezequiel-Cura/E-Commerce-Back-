import {Router} from "express"

import UserRoutes from "./UserRoutes";
import ProductRoutes from "./ProductRoutes";
import ProductsRoutes from "./ProductsRoutes"
import AuthRoutes from "./Auth"
import refresToken from "./refreshToken"



const router = Router()

router.use("/user",UserRoutes);
router.use("/Product",ProductRoutes);
router.use("/Products",ProductsRoutes)
router.use("/auth",AuthRoutes)
router.use("/refresh",refresToken)
export default router;

 