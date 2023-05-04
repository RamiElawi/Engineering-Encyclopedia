// const db=require('../models')

exports.createChat=(req,res,next)=>{
    const userId=req.body.userId;
    const userId_2=req.userId;
    let ourChat;
    console.log('req.userId',userId_2)
    console.log('userId',userId)
    db.chat.findOne({where:{userId:[userId,userId_2],userId1:[userId,userId_2]}})
    .then(isChat=>{
        if(!isChat){
            return db.chat.create({
                userId:userId,
                userId1:userId_2
            })
        }
        return isChat;
    })
    .then(isChat=>{
        return db.chat.findOne({where:{id:isChat.id},include:[{model:db.Message},{model:db.user}]})
    }).then(chat=>{
        ourChat=chat
        return db.user.findAll({where:{id:[chat.userId,chat.userId1]}})
    })
    .then(users=>{
        return res.status(200).json({chat:ourChat,users:users})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}