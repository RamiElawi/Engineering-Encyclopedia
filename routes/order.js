const router=require('express').Router();
const isAuth=require('../util/isAuth')
const orderController=require('../controller/order');


router.post('/addOrder/:itemId/:itemType',isAuth,orderController.addOrder)

// router.get('/getOrder',isAuth,orderController.getOrder)


module.exports=router;