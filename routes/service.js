const express=require('express');
const router=express.Router();
const serviceController=require('../controller/service');
const multer=require('multer');
const isAuth=require('../util/isAuth')
const checkRoles=require('../util/checkRole')

// create storageFile to storage images
const storageFile=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/serviceImage')
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix=Date.now()+'-'+Math.random(Math.random()*1E9);
        cb(null,uniqueSuffix+'-'+file.originalname);
    }
})
const upload=multer({storage:storageFile});


// routes

router.post('/addService',isAuth,checkRoles(['admin']),upload.single('image'),serviceController.addService);

router.post('/updateService/:serviceId',isAuth,checkRoles(['admin']),upload.single('image'),serviceController.updateService);

router.delete('/deleteService/:serviceId',isAuth,checkRoles(['admin']),serviceController.deleteService)

module.exports=router;