import {model,Schema,Document} from "mongoose"


export interface IProduct extends Document{
    name:string,
    quantity:number,
    product_id:string,
    product_image:string
}

const productSchema = new Schema({
    product_id:{
        type:String
    },
    name:{
        type:String
    },
    quantity:{
        type:Number
    },
    product_image:{
        type:String
    }
})


export default model<IProduct>("Product",productSchema)