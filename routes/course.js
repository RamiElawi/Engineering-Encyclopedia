const express=require('express');
const router=express.Router();
const courseController=require('../controller/course')
const multer=require('multer');
const isAuth=require('../util/isAuth')


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/courseImage');
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix=Date.now()+'-'+Math.random(Math.random()*1E9);
        cb(null,uniqueSuffix+'-'+file.originalname);
    }
})
const upload=multer({storage:storage});

router.post('/addCourse',isAuth,upload.single('courseImage'),courseController.addCourse);

router.post('/updateCourse/:courseId',isAuth,upload.single('courseImage'),courseController.updateCourse);

router.delete('/deleteCourse/:courseId',isAuth,courseController.deleteCourse)

router.get('/myCourses',isAuth,courseController.getMyCourses)

router.get('/search',isAuth,courseController.Search)

router.get('/filter',isAuth,courseController.filter)

router.post('/payments',isAuth,courseController.Payment)




module.exports=router;