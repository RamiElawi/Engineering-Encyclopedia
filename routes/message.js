const router=require('express').Router();
const messageController=require('../controller/message');
const isAuth=require('../util/isAuth');

router.post('/createMessage',isAuth,messageController.createMessage);

router.delete('/deleteMessage/:messageId',isAuth,messageController.deleteMessage);

router.get('/allMessage/:chatId',isAuth,messageController.getAllMessages);

module.exports=router;
