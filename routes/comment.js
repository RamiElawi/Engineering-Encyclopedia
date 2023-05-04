const router=require('express').Router();
const commentController=require('../controller/comment')
const isAuth=require('../util/isAuth')

// you need test this

router.post('/:lessonId/addComment',isAuth,commentController.addComment);

router.post('/:lessonId/addReplayComment/:userCommentId',isAuth,commentController.addReplyComment);

router.post('/updateComment/:commentId',isAuth,commentController.updateComment);

router.delete('/deleteComment/:commentId',isAuth,commentController.deleteComment);

router.get('/getComment/:lessonId',isAuth,commentController.getComments);

router.get('/getReplayComment/:userCommentId',isAuth,commentController.getReplyComment)

router.post('/addLike/:commentId',isAuth,commentController.addLike)



module.exports=router;