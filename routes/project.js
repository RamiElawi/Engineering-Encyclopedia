const router=require('express').Router();
const isAuth=require('../util/isAuth');
const projectController=require('../controller/project')
const multer=require('multer');
const storageFile=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/projectImage');
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix=Date.now()+'-'+Math.random(Math.random()*1E9);
        cb(null,uniqueSuffix+'-'+file.originalname);
    }
})
const upload=multer({storage:storageFile});

router.post('/addProject',isAuth,upload.fields([{name:'file'},{name:'imageSTL'},{name:'image'}]),projectController.addProject)

router.post('/updateProject/:projectId',isAuth,upload.fields([{name:'file'},{name:'imageSTL'},{name:'image'}]),projectController.updateProject);

router.delete('/deleteProject/:projectId',isAuth,projectController.deleteProject);

router.get('/myProject',isAuth,projectController.getMyProject);




module.exports=router;