import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors"
import router from "./routes";

//Initializations
const app = express();

//Settings
app.set("port", process.env.PORT || 3000)

//Middlewares
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

//Routes
app.get("/",(req,res)=>{
    res.send("The api is at http://localhost:" + app.get("port"))
});
app.use("/",router)

export default app
