const db=require('../models')
const fs=require('fs');
exports.addLesson=(req,res,next)=>{
    const lessonName=req.body.lessonName;
    const description=req.body.description;
    const courseId=req.body.courseId
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

    db.Lesson.findOne({where:{id:lessonId}})
    .then(lesson=>{
        if(!lesson){
            const error=new Error('this lesson is not found');
            error.statuCode=404;
            throw error;
        }
        if(!req.files[0].vedio){
            lesson.link=lesson.link;
        }else{
            lesson.link=req.files[0].link.path
        }
        if(!req.files[0].image){
            lesson.lessonImage=lesson.lessonImage
        }else{
            lesson.lessonImage=req.files[0].image.path
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
    })
}

exports.deleteLesson=(req,res,next)=>{
    const lessonId=req.params.lessonId;
    Lesson.findOne({where:{id:lessonId}})
    .then(lesson=>{
        if(!lesson){
            const error=new Error('this lesson is not found')
            error.statusCode=404;
            throw error;
        }
        require('../util/clearImage').clearImage(lesson.path);
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
    Lesson.findAll({where:{courseId:courseId}})
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
    Lesson.findOne({where:{id:lessonId}})
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

        const videoPath=lesson.link;
        const videoSize=fs.statSync(videoPath).size;
        const CHUNK_SIZE=10**6;
        const start=Number(range,replace(/\D/g,""));
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
        res.status(200).json({lesson:lesson})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

