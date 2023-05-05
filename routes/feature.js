const router=require('express').Router();
const isAuth=require('../util/isAuth')
const featureController=require('../controller/feature')

router.post('/addFeature',isAuth,featureController.addFeature)

router.post('/updateFeature/:featureId',isAuth,featureController.updateFeature)

router.delete('/deleteFeature/:featureId',isAuth,featureController.deleteFeature)

module.exports=router;