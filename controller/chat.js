const Chat=require('../models/chat');
const Op=require('sequelize');
const User=require('../models/user')
const Message=require('../models/message')

exports.createChat=(req,res,next)=>{
    const userId=req.body.userId;
    const userId_2=req.userId;
    let ourChat;
    console.log('req.userId',userId_2)
    console.log('userId',userId)
    Chat.findOne({where:{firstUserId:[userId,userId_2],secondUserId:[userId,userId_2]}})
    .then(isChat=>{
        if(!isChat){
            isChat=Chat.create({
                firstUserId:userId,
                secondUserId:userId_2
            })
        }
        return isChat;
    })
    .then(isChat=>{
        return Chat.findOne({where:{id:isChat.id},include:Message})
    }).then(chat=>{
        ourChat=chat
        return User.findAll({where:{id:[chat.firstUserId,chat.secondUserId]}})
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