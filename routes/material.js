const router=require('express').Router();
const materialController=require('../controller/material.js');
const isAuth=require('../util/isAuth');
const checkRole=require('../util/checkRole')

router.post('/addMaterial',isAuth,checkRole(['admin','engineer']),materialController.addMaterial);

router.post('/updateMaterial/:materialId',isAuth,checkRole(['admin','engineer']),materialController.updateMaterial);

router.delete('/deleteMaterial/:materialId',isAuth,checkRole(['admin']),materialController.deleteMatrial);



module.exports=router;  