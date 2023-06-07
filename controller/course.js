const db=require('../models')
const Op=require('sequelize').Op;

// const stripe=require('stripe')(process.env.API_KEY_PAYMENT)


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
    db.course.create({
        courseName:courseName,
        description:description,
        level:level,
        totalTime:totalTime,
        price:price,
        courseImage:req.file.path,
        userId:req.userId
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

    db.course.findOne({where:{id:courseId}})
    .then(course=>{
        if(!course){
            const error=new Error('this course is not found');
            error.statusCode=404;
            throw error;
        }
        if(course.userId!=req.userId){
            const error=new Error('you dont have authorization to update this course')
            error.statusCode=422;
            throw error;
        }
        course.courseName=courseName;
        course.description=description;
        course.totalTime=totalTime;
        course.price=price;
        course.level=level;
        if(!req.file){
            course.courseImage=course.courseImage;
        }else{
            require('../util/clearImage').clearImage(course.courseImage)
            course.courseImage=req.file.path;
        }
        return course.save();
    })
    .then(()=>{
        return res.status(200).json({message:"course has been updated"})
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
    let requiredCourse;
    db.course.findOne({where:{id:courseId}})
    .then(course=>{
        if(!course){
            const error=new Error('this course is not found')
            error.statusCode=404;
            throw error;
        }
        if(course.userId!=req.userId){
            const error=new Error('you don\'t have authrization to delete this course');
            error.statusCode=422;
            throw error;
        }
        require('../util/clearImage').clearImage(correctCourse.courseImage);
        requiredCourse=course;
        return db.courseRate.findAll({where:{courseId:courseId}})
    })
    .then(courses=>{
        return courses.forEach(ele=>{
            ele.destroy();
        })
    })
    .then(()=>{
        return requiredCourse.destroy();
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
    db.course.findAll({where:{userId:req.userId},include:[{model:db.user}],offset:(page-1)*size,limit:size})
    .then(courses=>{
        return res.status(200).json({courses:courses})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
} 


exports.Payment=(req,res,next)=>{
    const amount=req.body.amount;
    const currency=req.body.currency;
    const description=req.body.description;
    const source=req.body.source;   
    const courseId=req.body.courseId;
    let Payment;
    
    return stripe.charges.create({
        amount,
        currency,
        description,
        source
    })
    .then(payment=>{
        Payment=payment;
        return db.payment.create({
            userId:req.userId,
            paymentableId:courseId,
            paymentType:'Course',
        })
    })
    .then(()=>{
        return db.lesson.findOne({where:{courseId:courseId,lessonId:1}})
    })
    .then(lesson=>{
        lesson.done=true;
        return lesson.save(); 
    })
    .then(()=>{
        return res.status(200).json({payment:Payment,success:true})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
    
}

exports.Search=(req,res,next)=>{
    const search=req.body.search;
    return db.course.findAll({where:{courseName:{[Op.like]: `%${search}%`}}})
    .then(courses=>{
        return res.status(200).json({courses:courses})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    })
}

exports.filter=(req,res,next)=>{
    const filterName=req.body.filterName;
    return db.course.findAll({where:{
        [Op.or]:[
            {courseName:{[Op.like]:`%${filterName}%`}}
        ]
    }}) 
    .then(recordes=>{
        return res.status(200).json({recordes:recordes})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}