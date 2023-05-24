import { string } from "joi"
import {model,Schema,Document} from "mongoose"

interface products{
    product_id:string,
    name:string,
    stock:number,
    product_image:string,
    product_price:number,
    presentation:string,
    categories: string[],
    out_of_stock:boolean
    variants:string [] ,
    feature:boolean   
}

export interface IOrders extends Document{
    idOrder:string,
    client:string,
    products: products[],
    totalPrice:number,
    
}

const orderSchema = new Schema({
    idOrder:{
        type:String,
        unique:true
    },
    client:{
        type:String
    },
    products:{
        type:Array<products>
    },
    totalPrice:{
        type:Number
    }
},{
    timestamps:true
})


export default model<IOrders>("Orders",orderSchema)