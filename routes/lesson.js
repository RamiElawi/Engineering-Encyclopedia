const router=require('express').Router();
const multer=require('multer');
const storageFile=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/lessonVedio')
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix=Date.now()+'-'+Math.random(Math.random()*1E9);
        cb(null,uniqueSuffix+'-'+file.originalname)
    }
})
const upload=multer({storage:storageFile});
const isAuth=require('../util/isAuth');
const lessonController=require('../controller/lesson');

router.post('/addLesson',isAuth,upload.fields([{name:'vedio'},{name:'image'}]),lessonController.addLesson);

router.post('/updateLesson/:lessonId',isAuth,upload.fields([{name:'vedio'},{name:'image'}]),lessonController.updateLesson);

router.delete('/deleteLesson/:lessonId',isAuth,lessonController.deleteLesson);

router.get('/courseLessons/:courseId',isAuth,lessonController.getCourseLessons);

router.get('/:lessonId',isAuth,lessonController.getlessonId);

// router.post('/:lessonId/like',isAuth,lessonController);

// router.post('/:lessonId/unlike',isAuth,lessonController);

module.exports=router;