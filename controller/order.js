const db = require('../models');
const order=require('../models');

exports.addOrder=(req,res,next)=>{
    const color=req.body.color;
    const width=req.body.width;
    const length=req.body.length;
    const height=req.body.height;
    const material=req.body.material;
    const address=req.body.address;
    const itemId=req.params.itemId;
    const itemType=req.params.itemType;

    return db.order.create({
        color:color,
        width:width,
        length:length,
        height:height,
        material:material,
        address:address,
        orderId:itemId,
        orderType:itemType,
        userId:req.userId
    })
    .then(()=>{
        return res.status(200).json({message:'your order has been sent'})
    })
    .catch(err=>{
        if(err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

exports.getOrder=(req,res,next)=>{
    const user=req.userId
}