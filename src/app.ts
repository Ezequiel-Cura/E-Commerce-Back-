import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors"
import router from "./routes";

import fileUpload from "express-fileupload";

//Initializations
const app = express();

//Settings
app.set("port", process.env.PORT || 5000)

//Middlewares
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: "./uploads"
}))

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "PUT", "GET", "DELETE"],
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
}))


//Routes
app.get("/",(req,res)=>{
    res.send("The api is at http://localhost:" + app.get("port"))
});
app.use("/",router)

export default app
