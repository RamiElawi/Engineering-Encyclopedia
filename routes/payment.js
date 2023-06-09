const router=require('express').Router();
const isAuth=require('../util/isAuth')
const paymentController=require('../controller/payment');


router.post('/addOrder/:itemId/:itemType',isAuth,paymentController.payment)

router.get('/getOrder',isAuth,paymentController.getOrder)


module.exports=router;