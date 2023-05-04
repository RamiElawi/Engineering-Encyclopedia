// const db=require('../models')
const Op=require('sequelize').Op;

// create one course
exports.addCourse=(req,res,next)=>{
    const courseName=req.body.courseName;
    const description=req.body.description;
    const level=req.body.level;
    const totalTime=req.body.totalTime;
    const price=req.body.price;
    
    if(!req.file){
        const error=new Error('Did not choose Image');
        error.statusCode=422;
        throw error;
    }
    db.Course.create({
        courseName:courseName,
        description:description,
        level:level,
        totalTime:totalTime,
        price:price,
        courseImage:req.file.path
    })
    .then(course=>{
        return db.user_course.create({
            userId:req.userId,
            courseId:course.id
        })
    })
    .then(()=>{
        return res.status(200).json({message:'the course has been created'})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })

}

// update course  with Id
exports.updateCourse=(req,res,next)=>{
    const courseId=req.params.courseId;
    const courseName=req.body.courseName;
    const description=req.body.description;
    const totalTime=req.body.totalTime;
    const price=req.body.price;
    const level=req.body.level; 

    db.Course.findOne({where:{id:courseId}})
    .then(course=>{
        if(!course){
            const error=new Error('this course is not found');
            error.statusCode=404;
            throw error;
        }
        correctCourse=course;
        return db.user_course.findOne({where:{courseId:courseId}})
    })
    .then((isEqual)=>{
        if(isEqual.userId!=req.userId){
            const error=new Error('you dont have authorization to update this course')
            error.statusCode=422;
            throw error;
        }
        
        correctCourse.courseName=courseName;
        correctCourse.description=description;
        correctCourse.totalTime=totalTime;
        correctCourse.price=price;
        correctCourse.level=level;
        if(!req.file){
            correctCourse.courseImage=correctCourse.courseImage;
        }else{
            require('../util/clearImage').clearImage(correctCourse.courseImage)
            correctCourse.courseImage=req.file.path;
        }
        return correctCourse.save();
    })
    .then(()=>{
        return res.status(201).json({message:"the course has been updated"})
    })
    .catch(err=>{
        if(!err.statuscode){
            err.statusCode=500;
        }
        next(err);
    })
}
// delete course with Id 
exports.deleteCourse=(req,res,next)=>{
    const courseId=req.params.courseId;
    let correctCourse;
    db.Course.findOne({where:{id:courseId}})
    .then(course=>{
        if(!course){
            const error=new Error('this course is not found ')
            error.statusCode=404;
            throw error;
        }
        correctCourse=course;
        return db.user_course.findOne({where:{courseId:course.id}})
    })
    .then(isEqual=>{
        // console.log(isEqual);
        if(isEqual.userId!=req.userId){
            const error=new Error('you don\'t have authrization to delete this course');
            error.statusCode=422;
            throw error;
        }
        require('../util/clearImage').clearImage(correctCourse.courseImage);
        return correctCourse.destroy();
    })
    .then(()=>{
        res.status(200).json({message:"the coures has been deleted"})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}


// get all courses for user
exports.getMyCourses=(req,res,next)=>{
    const page=parseInt(req.query.page);
    const size=parseInt(req.query.size);
    let i=0;
    let myCourses=new Array();
    db.user_course.findAll({where:{userId:req.userId}})
    .then(courses=>{
        courses.forEach(element => {
            myCourses[i]=element.courseId;
            i++;
        });
        return myCourses;
    })
    .then(myCourses=>{
        return db.Course.findAll({where:{id:{[Op.in]:myCourses}},offset:(page-1)*size,limit:size})
    })
    .then(courses=>{
        res.status(200).json({courses:courses})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
} 
