import { Router } from "express";

import handleRefreshToken from "../Controllers/Auth/refreshToken.controller";
const router = Router()

router.get("/",handleRefreshToken)


export default router