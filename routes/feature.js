const router=require('express').Router();
const isAuth=require('../util/isAuth')
const featureController=require('../controller/feature')

router.post('/addFeature',isAuth,featureController.addFeature)

module.exports=router;