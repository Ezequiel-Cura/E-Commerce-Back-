import { Router } from "express";

import verifyJWT from "../../middlewares/verifyJWT";


import createUser from "../../Controllers/User/createUser.controller";
import getUser from "../../Controllers/User/getUser.controller";
import checkoutStripe from "../../Controllers/User/checkoutStripe.controller";


const router = Router()

router.post("/",createUser)
    .get("/",getUser)
    .post("/create-checkout-session",checkoutStripe)




export default router;