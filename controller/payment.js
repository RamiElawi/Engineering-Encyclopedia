const Stripe=require('stripe')('sk_test_51LkrmJHr5O4xNa164Fei9zYV60hJ4tdu951vjvNN4o7RqX5N4ABLGdqzyt3qm12QyKi7SmuIeoShhIgeqLqbydBj00RNk02B0J');
const db=require('../models')
exports.payment=(req,res,next)=>{
    // let Session;
    // return Stripe.checkout.sessions.create({
    //     payment_method_types:['card'],
    //     name:req.body.name,
    //     amount:req.body.amount,
    //     currency:'usd',
    //     quantity:req.body.quantity,
    // })
    // .then(session=>{
    //     Session=session
        return db.order.create({
            userId:req.userId,
            orderId:req.params.itemId,
            orderType:req.params.itemType,
            color:req.body.color,
            length:req.body.length,
            width:req.body.width,
            height:req.body.height,
            material:req.body.material,
            address:req.body.address,
            ownerId:req.body.ownerId
        })
    // })
    .then(()=>{
        return res.status(200).json({message:'done'})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

exports.getOrder=(req,res,next)=>{
    return db.order.findAll({where:{ownerId:req.userId}})
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