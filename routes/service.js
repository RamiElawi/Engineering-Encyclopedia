const express=require('express');
const router=express.Router();
const serviceController=require('../controller/service');
const multer=require('multer');
const isAuth=require('../util/isAuth')
const authorization=require('../util/authorization')

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

router.post('/',isAuth,authorization.isAdmin,upload.single('image'),serviceController.addService);

router.post('/:serviceId',isAuth,upload.single('image'),serviceController.updateService);

router.delete('/deleteService/:serviceId',isAuth,serviceController.deleteService)

module.exports=router;