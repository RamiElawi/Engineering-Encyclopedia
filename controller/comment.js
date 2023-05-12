const db=require('../models')
const io=require('../socket');


exports.addComment=(req,res,next)=>{
    const description=req.body.desc;
    const lessonId=req.params.lessonId;
    return db.comment.create({
        description:description,
        lessonId:lessonId,
        userId:req.userId
    })
    .then((comment)=>{
        io.getIo().emit('comment',{action:'addComment',comment:comment})
        return res.status(200).json({message:"done"})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}
exports.updateComment=(req,res,next)=>{
    const commentId=req.params.commentId;
    const desc=req.body.desc;
    db.comment.findOne({where:{id:commentId}})
    .then(comment=>{
        if(!comment){
            const error=new Error('This comment is not found')
            error.statusCode=404;
            throw error;
        }
        if(comment.userId!=req.userId){
            const error=new Error('You do not have authorization to update this comment')
            error.statusCode=404;
            throw error;
        }
        comment.description=desc;
        return comment.save();
    })
    .then((comment)=>{
        io.getIo().emit('comment',{action:'updateComment',comment:comment})
        res.status(200).json({message:"comment has been updated"})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=422
        }
        next(err);
    })
}

exports.deleteComment=(req,res,next)=>{
    const commentId=req.params.commentId;
    db.comment.findOne({where:{id:commentId}})
    .then(comment=>{
        if(!comment){
            const error=new Error('This comment is not found')
            error.statusCode=404;
            throw error;
        }
        if(comment.userId!=req.userId){
            const error=new Error('You do not have authorization to delete this comment');
            error.statusCode=422;
            throw error;
        }
        comment.destroy();
    })
    .then((comment)=>{
        io.getIo().emit('comment',{action:'deleteComment',comment:commentId})
        res.status(200).json({message:"comment has been deleted"})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    })
}

exports.getComments=(req,res,next)=>{
    const lessonId=req.params.lessonId;
    db.comment.findAll({where:{lessonId:lessonId},include:[{model:db.user}]})
    .then(comments=>{
        if(!comments.length){
            comments='there are no comments'
        }
        return res.status(200).json({comments:comments})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    })
}

exports.addReplyComment=(req,res,next)=>{
    const lessonId=req.params.lessonId;
    const commentId=req.params.commentId;
    const desc=req.body.desc;

    db.comment.create({
        lessonId:lessonId,
        description:desc,
        userId:req.userId,
        replayCommentId:commentId
    })
    .then((comment)=>{
        io.getIo().emit('comment',{action:'replyComment',comment:comment})
        return res.status(200).json({message:"done"})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

exports.getReplyComment=(req,res,next)=>{
    const commentId=req.params.commentId;
    db.comment.findAll({where:{replayCommentId:commentId},include:[{model:db.user}]})
    .then(comments=>{
        if(!comments.length){
            comments='there are no comments'
        }
        return res.status(200).json({comments:comments})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    })
}

exports.addLike=(req,res,next)=>{
    const commentId=req.params.commentId;
    let myCount;
    user_comment.create({
        like:true,
        commentId:commentId,
        userId:req.userId
    })
    .then(()=>{
        return user_comment.findAll({where:{commentId:commentId,like:true}}).count();
    })
    .then(count=>{
        myCount=count;
        return Comment.findOne({where:{id:commentId}})
    })
    .then(comment=>{
        comment.like=myCount;
        return comment.save();
    })
    .then(()=>{
        return res.status(200).json({message:'done'})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statsuCode=500;
        }
        next(err);
    })
}