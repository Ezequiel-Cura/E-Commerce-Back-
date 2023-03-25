import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors"
import router from "./routes";
import cookieParser from "cookie-parser"


import fileUpload from "express-fileupload";

//Initializations
const app = express();

//Settings
app.set("port", process.env.PORT || 5000)

//Middlewares
app.use(morgan("dev"))

app.use(cookieParser())

app.set("trust proxy", 1);

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: "./uploads"
}))

app.use(cors({
    origin: [`${process.env.FRONT_URL_1}`,`${process.env.FRONT_URL_2}`,`${process.env.FRONT_URL_3}`,"http://localhost:3000"],
    methods: ["POST", "PUT", "GET", "DELETE"],
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept,Authorization',
    credentials:true,    
}))

//Routes
app.get("/",(req,res)=>{
    res.send("Hi welcome to the rico y sano services")
});
app.use("/",router)

export default app
