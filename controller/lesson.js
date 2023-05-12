const db=require('../models') 
const fs=require('fs');
exports.addLesson=(req,res,next)=>{
    const lessonName=req.body.lessonName;
    const description=req.body.description;
    const courseId=req.body.courseId
    const fileNumber=2;
    let requiredLesson;
    if(Object.keys(req.files).length<fileNumber){
        const error=new Error('don\'t have any file to upload');
        error.statusCode=422;
        throw error;
    }
    return db.lesson.create({
        lessonName:lessonName,
        description:description,
        Link:req.files.vedio[0].path,
        lessonImage:req.files.image[0].path,
        courseId:courseId
    })
    .then(lesson=>{
        requiredLesson=lesson;
        return db.course.findOne({where:{id:courseId}})
    })
    .then(course=>{
        course.lessonNumber+=1;
        return course.save()
    })
    .then((course)=>{
        requiredLesson.lessonId=course.lessonNumber
        return requiredLesson.save()
    })
    .then(()=>{
        return res.status(200).json({message:'lesson had been created'})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

exports.updateLesson=(req,res,next)=>{
    const lessonId=req.params.lessonId;
    const lessonName=req.body.lessonName;
    const description=req.body.description;
    const courseId=req.body.courseId;

    
    return db.course.findOne({where:{id:courseId}})
    .then(course=>{
        if(course.userId!=req.userId){
            const error=new Error('you don\'t have autorization to update this lesson');
            error.statusCode=422;
            throw error;
        }
        return db.lesson.findOne({where:{id:lessonId}})
    })
    .then(lesson=>{
        if(!lesson){
            const error=new Error('this lesson is not found');
            error.statusCode=404;
            throw error;
        }
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
        return lesson.save();
    })
    .then(()=>{
        return res.status(200).json({message:"lesson has been updated"})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err)
    })
}

exports.deleteLesson=(req,res,next)=>{
    const lessonId=req.params.lessonId;
    const courseId=req.body.courseId;
    let requiredCourse;
    return db.course.findOne({wher:{id:courseId}})
    .then(course=>{
        if(course.userId!=req.userId){
            const error=new Error('you don\'t have autorization to delete this lesson');
            error.statusCode=422;
            throw error;
        }
        requiredCourse=course;
        return db.lesson.findOne({where:{id:lessonId}})
    })
    .then(lesson=>{
        if(!lesson){
            const error=new Error('this lesson is not found');
            error.statusCode=404;
            throw error;
        }
        require('../util/clearImage').clearImage(lesson.Link);
        require('../util/clearImage').clearImage(lesson.lessonImage);
        return lesson.destroy();
    })
    .then(()=>{
        requiredCourse.lessonNumber-=1;
        return requiredCourse.save();
    })
    .then(()=>{
        return res.status(200).json({message:'lesson had been deleted'})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

exports.getCourseLessons=(req,res,next)=>{
    const courseId=req.params.courseId;
    db.lesson.findAll({where:{courseId:courseId}})
    .then(lessons=>{
        if(!lessons.length){
            lessons='There are no lessons for this course';
        }
        return res.status(200).json({lessons:lessons})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

exports.getVideo=(req,res,next)=>{
    const lessonId=req.params.lessonId;
    const range=req.headers.range;
    db.lesson.findOne({where:{id:lessonId}})
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

exports.getLessonId=(req,res,next)=>{
    const lessonId=req.params.lessonId;
    db.lesson.findOne({where:{id:lessonId}})
    .then(lesson=>{
        if(!lesson){
            const error=new Error('this lesson is not found')
            error.statusCode=404;
            throw error;
        }
        return res.status(200).json({lesson:lesson})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}
