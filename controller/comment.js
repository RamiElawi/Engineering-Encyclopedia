const Comment=require('../models/comment');
const user_comment=require('../models/user_comment')
const User=require('../models/user')
const io=require('../socket');


exports.addComment=(req,res,next)=>{
    const description=req.body.desc;
    const lessonId=req.params.lessonId;
    let ourComment;
    Comment.create({
        description:description,
        lessonId:lessonId
    })
    .then((comment)=>{
        ourComment=comment;
        return user_comment.create({
            userId:req.userId,
            commentId:ourComment.id
        })
    })
    .then(()=>{
        io.getIo().emit('comment',{action:'addComment',comment:ourComment})
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
    user_comment.findOne({where:{commentId:commentId}})
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
        return Comment.findOne({where:{id:commentId}})
    })
    .then(comment=>{
        comment.description=desc;
        return comment.save();
    })
    .then((comment)=>{
        io.getIo().emit('comment',{action:'updateComment',comment:comment})
        res.status(200).json({message:"done"})
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
    user_comment.findOne({where:{commentId:commentId}})
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
        return Comment.findOne({where:{id:commentId}})
    })
    .then((comment)=>{
        return comment.destroy();
    })
    .then(()=>{
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
    Comment.findAll({where:{lessonId:lessonId},include:[user_comment,User]})
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
    const userCommentId=req.params.userCommentId;
    const desc=req.body.desc;
    let ourComment;

    Comment.create({
        lessonId:lessonId,
        description:desc,
    })
    .then((comment)=>{
        ourComment=comment;
        return user_comment.create({
            userId:req.userId,
            commentId:comment.id,
            userCommentId:userCommentId
        })
    })
    .then((user_comment)=>{
        io.getIo().emit('comment',{action:'replyComment',comment:ourComment,user_comment:user_comment})
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
    const userCommentId=req.params.userCommentId;
    user_comment.findAll({where:{userCommentId:userCommentId}})
    .then(comments=>{
        return Comment.findAll({where:{id:comments},include:[User,userCommentId]})
    })
    .then(comments=>{
        return res.status(200).json({comments:comments})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statsusCode=500
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