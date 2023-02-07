import { string } from "joi";
import {model,Schema,Document} from "mongoose"

export interface IUser extends Document{
    email:string,
    password:string,
    name:string,
    isAdmin:boolean,
    img:string,
    refreshToken:string
}


const userSchema = new Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    img:{
        type:String,
        default:"e-commerce/uknown-user.jpg"
    },
    refreshToken:{
        type:String,
        default:""
    },
    roles:{
        type:Object,
        default:{
            "client": 21342
        }
    }
    
});





export default model<IUser>("User",userSchema)