import {model,Schema,Document} from "mongoose"

export interface IUser extends Document{
    email:string,
    password:string,
    name:string
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
    }
    
});





export default model<IUser>("User",userSchema)