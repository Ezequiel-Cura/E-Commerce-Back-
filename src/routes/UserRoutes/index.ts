import { Router } from "express";

const router = Router()

router.get("/",(req,res)=>{
    res.send({msg:"Esta funcionando "})
})

export default router;