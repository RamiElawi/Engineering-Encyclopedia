const router=require('express').Router();
const colorController=require('../controller/color')
const isAuth=require('../util/isAuth')

router.post('/addColor',isAuth,colorController.addColor)

router.delete('/deleteColor/:colorId',isAuth,colorController.deleteColor)

module.exports=router;