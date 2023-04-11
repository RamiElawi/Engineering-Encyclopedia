const router=require('express').Router();
const userController=require('../controller/user');
const isAuth=require('../util/isAuth');
const checkRole=require('../util/checkRole')
const multer=require('multer');
const storageFile=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/userImage')
    },
    filename:(req,file,cb)=>{
        const uniqueSuffex=Date.now()+'-'+Math.random(Math.random()*1E9);
        cb(null,uniqueSuffex+'-'+file.originalname);
    }
})
const upload=multer({storage:storageFile});

router.post('/changeImage',isAuth,upload.single('image'),userController.changeImage)

router.get('/Profile/:userId',isAuth,userController.getProfile)

router.post('/updateRole/:userId',isAuth,checkRole(['admin']),userController.updateRole)

router.get('/:userRole',isAuth,userController.getUsers)


module.exports=router;