import { Router } from "express";

import register from "../../Controllers/Auth/register.controller";
import login from "../../Controllers/Auth/login.controller"
import handleLogOut from "../../Controllers/Auth/logout.Controller";

const router = Router()

router.post("/register",register)
router.post("/login",login)
router.get("/logout",handleLogOut)


export default router;