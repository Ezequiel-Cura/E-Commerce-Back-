import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const {DB_USER,DB_PASSWORD,DB_NAME} = process.env

const connectDB = async () => {
try {
    const db = await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ipxfoyc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`);
   
    console.log("Si no muestra cambios fijate si compilaste")
} catch (error) {
    console.error(error);
}
};

connectDB()


// OTRA FORMA DE CONECTAR A LA DB
//(Esta son con funciones de moongose)
// mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ipxfoyc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`);
// const connection = mongoose.connection;
// mongoose.connection.once("open",()=>{
//     console.log("Mongodb connection stablished")
// })
// mongoose.connection.on("error",(err)=>{
//     console.log(err)
//     process.exit(0)
// })
