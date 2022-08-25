import {model,Schema,Document} from "mongoose"


export interface IProduct extends Document{
    name:string,
    quantity:number,
    product_id:string,
    product_image:string,
    product_price:number
}

const productSchema = new Schema({
    product_id:{
        type:String
    },
    name:{
        type:String,
        unique:true,
        require:true
    },
    quantity:{
        type:Number
    },
    product_image:{
        type:String
    },
    product_price:{
        type:Number,
        require:true
    }
})


export default model<IProduct>("Product",productSchema)