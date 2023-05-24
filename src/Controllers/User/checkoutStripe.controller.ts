import { Request,Response } from "express";
import Orders from "../../models/orders"
import dotenv from "dotenv"
dotenv.config()
import { IProductsingle } from "../../utils/Interfaces";
const stripe = require('stripe')(process.env.STRIPE_API_KEY);




const checkoutStripe = async(req:Request,res:Response)=>{
    const cartItems:IProductsingle[] = req.body.cart
    let totalPrice = cartItems.reduce((accumulator, currentValue)=>{
        return accumulator + (currentValue.price * currentValue.quantity)
    },0)
    const line_items = cartItems && cartItems.map((c)=>{
        return{
            price_data: {
              currency: 'usd',
              product_data: {
                name: c.name,
                images:[c.img],
                metadata:{
                    id:c.id
                }
              },
              unit_amount: c.price,
            },
            quantity: c.quantity,
          }
    })
    try {
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${process.env.FRONT_URL}/checkout-success`,
            cancel_url: `${process.env.FRONT_URL}/cart`,
          });
        
        //   res.redirect(303, session.url);
        const order = Orders.create({
            idOrder: session.id,
            client: req.body.user,
            products: cartItems,
            totalPrice: totalPrice
        })

        

        res.send({url:session.url})
    } catch (error) {
        console.log(error)
    }
}

export default checkoutStripe