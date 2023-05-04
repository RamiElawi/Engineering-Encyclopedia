// const db=require('../models')
const io=require('../socket')
exports.createMessage=(req,res,next)=>{
    const content=req.body.content;
    const chatId=req.body.chatId;

    db.chat.findOne({where:{id:chatId}})
    .then(chat=>{
        if(!chat){
            const error=new Error();
            error.statusCode=422;
            throw error;
        }
        // if(!chat.userId!=req.userId||!chat.secondUserId!=req.userId){
        //     const error=new Error('this chat is not your chat you can not send message in here');
        //     error.statusCode=422;
        //     throw error;
        // }
        return db.Message.create({
            userId:req.userId,
            content:content,
            chatId:chatId
        })
    })
    .then((message)=>{
        io.getIo().emit('message',{action:'sendMessage',message:message})
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
    db.Message.findOne({where:{id:messageId}})
    .then(message=>{
        if(message.userId!=req.userId){
            const error=new Error('you can not delete this message');
            error.statusCode=422;
            throw error;
        }
        return message.destroy()
    })
    .then(()=>{
        io.getIo().emit('message',{action:'deleteMessage',message:messageId})
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
    db.Message.findAll({where:{chatId:chatId},include:{model:db.user}})
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