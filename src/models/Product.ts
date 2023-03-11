import {model,Schema,Document} from "mongoose"


export interface IProduct extends Document{
    name:string,
    stock:number,
    product_id:string,
    product_image:string,
    product_price:number,
    presentation:string,
    categories: Array<string>,
    out_of_stcok: boolean,
    variants: Array<string>,
    feature:boolean
}

const productSchema = new Schema({
    product_id:{
        type:String,
        unique:true
    },
    name:{
        type:String,
        unique:true,
        require:true
    },
    stock:{
        type:Number
    },
    product_image:{
        type:String
    },
    product_price:{
        type:Number,
        require:true
    },
    presentation:{
        type: String,
        require:true
    },
    categories:{
        type: [String]
    },
    out_of_stock:{
        type:Boolean,
        default:false
    },
    variants:{
        type:[String]
    },
    feature:{
        type:Boolean,
        default: false
    }
    },{
    timestamps:true
})


export default model<IProduct>("Product",productSchema)