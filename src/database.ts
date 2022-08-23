import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const {DB_USER,DB_PASSWORD,DB_NAME} = process.env

const connectDB = async () => {
try {
    const db = await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ipxfoyc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`);
    console.log("Mongodb is connected to", db.connection.host);
} catch (error) {
    console.error(error);
}
};

connectDB()

// mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ipxfoyc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`);
// const connection = mongoose.connection;
// connection.once("open",()=>{
//     console.log("Mongodb connection stablished")
// })
// connection.on("error",(err)=>{
//     console.log(err)
//     process.exit(0)
// })
