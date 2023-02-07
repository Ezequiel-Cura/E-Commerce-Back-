import { Router } from "express";


import createUser from "../../Controllers/User/createUser.controller";
import getUser from "../../Controllers/User/getUser.controller";


const router = Router()

router.post("/",createUser)
    .get("/",getUser)





export default router;