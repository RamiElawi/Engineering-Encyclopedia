const router=require('express').Router();
const stlController=require('../controller/STL');
const isAuth=require('../util/isAuth');
const multer=require('multer');
const storageFile=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/stlImage');
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix=Date.now()+'-'+Math.random(Math.random()*1E9);
        cb(null,uniqueSuffix+'-'+file.originalname);
    }
})
const upload=multer({storage:storageFile})

// router.post('/addSTL',isAuth,upload.single('image'),stlController.addSTL)
router.post('/addSTL',isAuth,upload.fields([{name:'stlImg'},{name:'images'},{name:'file'}]),stlController.addSTL);

router.post('/updateSTL/:stlId',isAuth,upload.fields([{name:'stlImg'},{name:'images'},{name:'file'}]),stlController.updateSTL);

router.delete('/deleteSTL/:stlId',isAuth,stlController.deleteSTL);

router.get('/mySTL',isAuth,stlController.getMySTL);

module.exports=router;