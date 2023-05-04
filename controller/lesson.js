// const db=require('../models')
const fs=require('fs');
exports.addLesson=(req,res,next)=>{
    const lessonName=req.body.lessonName;
    const description=req.body.description;
    const courseId=req.body.courseId
    console.log(req.files)
    if(Object.keys(req.files).length<2){
        const error=new Error('don\'t have any file to upload');
        error.statuCode=422;
        throw error;
    }
    // console.log('vedio',req.files.vedio[0].path)
    return db.Lesson.create({
        lessonName:lessonName,
        description:description,
        Link:req.files.vedio[0].path,
        lessonImage:req.files.image[0].path,
        courseId:courseId
    })
    .then(lesson=>{
        return db.user_lesson.create({
            userId:req.userId,
            lessonId:lesson.id
        })
    })
    .then(()=>{
        return res.status(200).json({message:'lesson had been created'})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statuCode=500;
        }
        next(err);
    })
}

exports.updateLesson=(req,res,next)=>{
    const lessonId=req.params.lessonId;
    const lessonName=req.body.lessonName;
    const description=req.body.description;
    const courseId=req.body.courseId;

    db.user_lesson.findOne({where:{lessonId:lessonId}})
    .then(lesson=>{
        if(!lesson){
            const error=new Error('this lesson is not found');
            error.statusCode=404;
            throw error;
        }
        if(lesson.userId!=req.userId){
            const error=new Error('You don\'t have authorization to update this lesson');
            error.statuCode=422;
            throw error;
        }
        return db.Lesson.findOne({where:{id:lessonId}})
    })
    .then(lesson=>{
        console.log(req.files)
        if(!req.files.vedio){
            lesson.Link=lesson.Link;
        }else{
            require('../util/clearImage').clearImage(lesson.Link)
            lesson.link=req.files.vedio[0].path
        }
        if(!req.files.image){
            lesson.lessonImage=lesson.lessonImage
        }else{
            require('../util/clearImage').clearImage(lesson.lessonImage)
            lesson.lessonImage=req.files.image[0].path
        }
        lesson.lessonName=lessonName;
        lesson.description=description;
        lesson.courseId=courseId;
        return lesson.save();
    })
    .then(lesson=>{
        return res.status(200).json({message:"lesson has been updated"})
    })
    .catch(err=>{
        if(!err.statuCode){
            err.statuCode=500;
        }
        next(err)
    })
}

exports.deleteLesson=(req,res,next)=>{
    const lessonId=req.params.lessonId;
    db.user_lesson.findOne({where:{lessonId:lessonId}})
    .then(lesson=>{
        if(!lesson){
            const error=new Error('this lesson is not found');
            error.statusCode=404;
            throw error;
        }
        if(lesson.userId!=req.userId){
            const error=new Error('You don\'t have authorization to delete this lesson');
            error.statuCode=422;
            throw error;
        }
        lesson.destroy();
        return db.Lesson.findOne({where:{id:lessonId}})
    })
    .then(lesson=>{
        if(!lesson){
            const error=new Error('this lesson is not found')
            error.statusCode=404;
            throw error;
        }
        require('../util/clearImage').clearImage(lesson.Link);
        require('../util/clearImage').clearImage(lesson.lessonImage);
        return lesson.destroy();
    })
    .then(()=>{
        return res.status(200).json({message:'lesson had been deleted'})
    })
    .catch(err=>{
        if(!err.statuCode){
            err.statuCode=500;
        }
        next(err);
    })
}

exports.getCourseLessons=(req,res,next)=>{
    const courseId=req.params.courseId;
    db.Lesson.findAll({where:{courseId:courseId}})
    .then(lessons=>{
        if(!lessons.length){
            lessons='There are no lessons for this course';
        }
        return res.status(200).json({lessons:lessons})
    })
    .catch(err=>{
        if(!err.statuCode){
            err.statuCode=500;
        }
        next(err);
    })
}

exports.getlessonId=(req,res,next)=>{
    const lessonId=req.params.lessonId;
    const range=req.headers.range;
    db.Lesson.findOne({where:{id:lessonId}})
    .then(lesson=>{
        if(!lesson){
            const error=new Error('this lesson not found');
            error.statusCode=404;
            throw error
        }
        if(!range){
            const error=new Error('Requires Range header');
            error.statusCode=400;
            throw error
        }

        const videoPath=lesson.Link;
        const videoSize=fs.statSync(videoPath).size;
        const CHUNK_SIZE=10**6;
        const start=Number(range.replace(/\D/g,""));
        const end=Math.min(start+CHUNK_SIZE,videoSize-1);
        const contentLength=end-start+1;
        const headers={
            "Content-Range":`bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges":"bytes",
            "Content-Length":contentLength,
            "Content-Type":"video/mp4"
        };
        res.writeHead(206,headers);
        const videoStream=fs.createReadStream(videoPath,{start,end});
        videoStream.pipe(res);
        // res.json({lesson:lesson})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

