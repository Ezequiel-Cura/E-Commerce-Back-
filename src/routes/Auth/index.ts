import { Router } from "express";

import register from "../../Controllers/Auth/register.controller";
import login from "../../Controllers/Auth/login.controller"

const router = Router()

router.post("/register",register)
router.post("/login",login)



export default router;