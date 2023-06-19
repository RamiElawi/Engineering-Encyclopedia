const db=require('../models') 
const fs=require('fs');
const {Op}=require('sequelize')
exports.addLesson=(req,res,next)=>{
    const lessonName=req.body.lessonName;
    const description=req.body.description;
    const courseId=req.body.courseId
    const fileNumber=2;
    if(Object.keys(req.files).length<fileNumber){
        const error=new Error('don\'t have any file to upload');
        error.statusCode=422;
        throw error;
    }
    db.lesson.max('lessonId',{where:{courseId:courseId}})
    .then(max=>{
        return db.lesson.create({
            lessonName:lessonName,
            description:description,
            Link:req.files.vedio[0].path,
            lessonImage:req.files.image[0].path,
            courseId:courseId,
            lessonId:max +1
        })
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
    // .then(lesson=>{
        // requiredLesson=lesson;
        // return db.course.findOne({where:{id:courseId}})
    // })
    // .then(course=>{
    //     course.lessonNumber+=1;
    //     return course.save()
    // })
    // .then((course)=>{
    //     requiredLesson.lessonId=course.lessonNumber
    //     return requiredLesson.save()
    // })
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
        return db.lesson.findOne({where:{id:lessonId,courseId:courseId}})
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
    .then((lesson)=>{
        console.log(lesson)
        return db.lesson.findAll({where:{courseId:courseId,lessonId:{[Op.gt]:lesson.lessonId}}})
    })
    .then(lessons=>{
        console.log('rami')
        console.log(lessons)
        for(const lessonToUpdate of lessons){
            lessonToUpdate.lessonId-=1
            lessonToUpdate.save();
        }
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
    // return db.payment.findOne({where:{courseId:courseId,userId:req.userId}})
    // .then(isPament=>{
    //     if(!isPament){
    //         const error=new Error('you are not payed yet ')
    //         error.statusCode=422;
    //         throw error;
    //     }
    return db.lesson.findAll({where:{courseId:courseId}})
    // })
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
    // const range=req.headers.range;
    db.lesson.findOne({where:{id:lessonId}})
    .then(lesson=>{
        // if(!lesson){
        //     const error=new Error('this lesson not found');
        //     error.statusCode=404;
        //     throw error
        // }
        // if(!range){
        //     const error=new Error('Requires Range header');
        //     error.statusCode=400;
        //     throw error
        // }

        // const videoPath=lesson.Link;
        // const videoSize=fs.statSync(videoPath).size;
        // console.log(videoSize)
        // const CHUNK_SIZE=10**6;
        // const start=Number(range.replace(/\D/g,""));
        // console.log(start+CHUNK_SIZE)
        // const end=Math.min(start+CHUNK_SIZE,videoSize-1);
        // const contentLength=end-start+1;
        // console.log(contentLength)
        // const headers={
        //     "Content-Range":`bytes ${start}-${end}/${videoSize}`,
        //     "Accept-Ranges":"bytes",
        //     "Content-Length":contentLength,
        //     "Content-Type":"video/mp4"
        // };
        // res.writeHead(206,headers);
        // const videoStream=fs.createReadStream(videoPath,{start,end});
        // videoStream.pipe(res);
        // // res.json({lesson:lesson})
           const videoPath = lesson.Link;
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
        const chunksize = (end-start)+1;
        const file = fs.createReadStream(videoPath, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
    }
        //   });
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
