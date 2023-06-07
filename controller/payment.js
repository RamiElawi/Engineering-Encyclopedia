const Stripe=require('stripe')();
const db=require('../models')
exports.payment=(req,res,next)=>{
    let Session;
    return Stripe.checkout.sessions.create({
        payment_method_types:['card'],
        name:req.body.name,
        amount:req.body.amount,
        currency:'usd',
        quantity:req.body.quantity,
    })
    .then(session=>{
        Session=session
        return db.order.create({
            userId:req.userId,
            orderId:req.body.orderId,
            orderType:req.body.orderType,
            color:req.body.color,
            length:req.body.length,
            width:req.body.width,
            height:req.body.height,
            material:req.body.material,
            address:req.body.address
        })
    })
    .then(()=>{
        return res.status(200).json({sessionId:Session.id})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

exports.getOrder=(req,res,next)=>{
    return db.order.findAll({where:{userId:req.userId}})
    .then(orders=>{
        return res.status(200).json({orders:orders})
    }) 
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}