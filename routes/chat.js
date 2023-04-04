const router=require('express').Router();
const isAuth=require('../util/isAuth');
const chatController=require('../controller/chat');

router.post('/',isAuth,chatController.createChat);

// routre.get('/',isAuth,chatController);


module.exports=router;