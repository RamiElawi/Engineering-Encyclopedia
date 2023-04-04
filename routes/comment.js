const router=require('express').Router();
const commentController=require('../controller/comment')
const isAuth=require('../util/isAuth')

// you need test this

router.post('/:lessonId/addComment',isAuth,commentController.addComment);

router.post('/:lessonId/addReplayComment/:commentId',isAuth,commentController.addReplyComment);

router.post('/updateComment/:commentId',isAuth,commentController.updateComment);

router.delete('/deleteComment/:commentId',isAuth,commentController.deleteComment);

router.get('/:lessonId',isAuth,commentController.getComments);

router.get('/:commentId',isAuth,commentController.getReplyComment)

router.post('/:commentId',isAuth,commentController.addLike)



module.exports=router;