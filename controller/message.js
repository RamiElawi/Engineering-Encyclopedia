const Message=require('../models/message');
const Chat=require('../models/chat');
const User=require('../models/user')
exports.createMessage=(req,res,next)=>{
    const content=req.body.content;
    const chatId=req.body.chatId;

    Chat.findOne({where:{id:chatId}})
    .then(chat=>{
        if(!chat){
            const error=new Error();
            error.statusCode=422;
            throw error;
        }
        // if(!chat.firstUserId!=req.userId||!chat.secondUserId!=req.userId){
        //     const error=new Error('this chat is not your chat you can not send message in here');
        //     error.statusCode=422;
        //     throw error;
        // }
        return Message.create({
            userId:req.userId,
            content:content,
            chatId:chatId
        })
    })
    .then((message)=>{
        return res.status(200).json({message:message})
    })
    .catch(err=>{
        if(!err){
            err.statusCode=500;
        }
        next(err);
    })
}

exports.deleteMessage=(req,res,next)=>{
    const messageId=req.params.messageId;
    Message.findOne({where:{id:messageId}})
    .then(message=>{
        return message.destroy()
    })
    .then(()=>{
        return res.status(200).json({message:'done'})
    })
    .catch(err=>{
        if(err.statusCode){
            err.statusCode=500
        }
        next(err);
    })
}
exports.getAllMessages=(req,res,next)=>{
    const chatId=req.params.chatId;
    Message.findAll({where:{chatId:chatId},include:User})
    .then(messages=>{
        return res.status(200).json({messages:messages})
    })
    .catch(err=>{
        if(err.statusCode){
            err.statusCode=500
        }
        next(err);
    })
}