import { Router } from "express";


import createUser from "../../Controllers/User/createUser.controller";


const router = Router()

router.post("/user",createUser)





export default router;