import {Router} from "express"
import UserRoutes from "./UserRoutes";
import ProductRotes from "./ProductRoutes";


const router = Router()

router.use("/User",UserRoutes);
router.use("/Product",ProductRotes);


export default router;

