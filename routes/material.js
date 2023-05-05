const router=require('express').Router();
const materialController=require('../controller/material.js');
const isAuth=require('../util/isAuth');
const checkRole=require('../util/checkRole')

router.post('/addMaterial',isAuth,materialController.addMaterial);

router.post('/updateMaterial/:materialId',isAuth,materialController.updateMaterial);

router.delete('/deleteMaterial/:materialId',isAuth,materialController.deleteMatrial);





module.exports=router;  