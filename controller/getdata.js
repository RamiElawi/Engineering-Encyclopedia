const db=require('../models')
const path=require('path');
const fs=require('fs');
// get All Services
exports.getServices=(req,res,next)=>{
    const page=parseInt(req.query.page) ;
    const size=parseInt(req.query.size) ;
    return db.service.findAll({limit:size,offset:(page-1)*size})
    .then(services=>{
        return res.status(200).json({message:"All Services",services:services})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statuCode=500;
        }
        next(err);
    })
}
// get one service with Id
exports.getServiceId=(req,res,next)=>{
    const serviceId=req.params.serviceId;
    return db.service.findOne({where:{id:serviceId}})
    .then(service=>{
        if(!service){
            const error=new Error('Not found this service')
            error.statusCode=404;
            throw error;
        }
        return res.status(200).json({service:service});
    }) 
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}


// get all stls
exports.getSTL=(req,res,next)=>{
    const page=parseInt(req.query.page) ;
    const size=parseInt(req.query.size) ;

    db.STL.findAll({include:[{model:db.image},{model:db.material},{model:db.file},{model:db.user},{model:db.feature},{model:db.color},{model:db.project}],offset:((page-1)*size),limit:size})
    .then(stls=>{
        if(!stls){
            stls='There are no stls';
        }
        return res.status(200).json({stls:stls});
    })
    .catch(err=>{
        if(!err.statsuCode){
            err.statusCode=500;
        }
        next(err);
    })
}

// get stl by id
exports.getSTLId=(req,res,next)=>{
    const stlId=req.params.stlId;
    let requiedSTL;
    let isLike;
    return db.STL.findOne({where:{id:stlId},include:[{model:db.image},{model:db.material},{model:db.user},{model:db.file},{model:db.feature},{model:db.color},{model:db.project}]})
    .then(stl=>{
        if(!stl){
            const error=new Error('This STL is not found')
            error.statsuCode=404;
            throw error;
        }
        requiedSTL=stl;
        return db.like.findOne({where:{likeableId:stlId,likeableType:'STL',userId:req.userId}})
    })
    .then((isFound)=>{
        if(!isFound){
            isLike=false
        }else{
            isLike=true
        }
        return res.status(200).json({stl:requiedSTL,isLike:isLike});
    })
    .catch(err=>{
        if(!err.statsuCode){
            err.statsuCode=500;
        }
        next(err);
    })
}

// get Materials
exports.getMaterials=(req,res,next)=>{
    db.material.findAll()
    .then(materials=>{
        if(materials.length==0){
            materials='You don\'t have any material'
        }
        return res.status(200).json({materials:materials})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

// get material by Id
exports.getmaterialId=(req,res,next)=>{
    const materialId=req.params.materialId;

    db.material.findOne({where:{id:materialId}})
    .then(material=>{
        if(!material){
            const error=new Error('This material is not found');
            error.statusCode=422;
            throw error;
        }
        return res.status(200).json({material:material})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}
// get Feature
exports.getFeature=(req,res,next)=>{
    return db.feature.findAll()
    .then(feature=>{
        return res.status(200).json({feature:feature})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}
// get Featurea id
exports.getFeaturelId=(req,res,next)=>{
    const featureId=req.params.featureId;

    db.feature.findOne({where:{id:featureId}})
    .then(feature=>{
        if(!feature){
            const error=new Error('This feature is not found');
            error.statusCode=422;
            throw error;
        }
        return res.status(200).json({feature:feature})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}
// download STL File
exports.downloadSTLFile=(req,res,next)=>{
    const stlId=req.params.stlId;
    db.STL.findOne({where:{id:stlId}})
    .then(stl=>{
        if(!stl){
            const error=new Error('this stl is not found')
            error.statusCode=422;
            throw error;
        }
        return db.file.findAll({where:{fileabelId:stl.id,fileableType:'STL'}})
    })
    .then(files=>{
        let fileNames=new Array();
        files.forEach(element => {
            fileNames.push(element.path);
        });
        const filePaths=fileNames.map(name=>{
            return path.join(name)
        })
        Promise.all(
            filePaths.map((filePath)=>{
                return new Promise((resolve,reject)=>{
                    const stream=fs.createReadStream(filePath)
                    stream.on('error',(err)=>{
                        reject(err);
                    })
                    stream.on('end',()=>resolve())
                    stream.pipe(res,{end:false})
                })
            })
        )
        .then(()=>{
            res.end();
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode=500;
            }
            next(err);
        })
    })
}

// get All project
exports.getProject=(req,res,next)=>{
    const size=parseInt(req.query.size);
    const page=parseInt(req.query.page);
    return db.project.findAll({offset:((page-1)*size),limit:size,include:[{model:db.user},{model:db.STL},{model:db.file}]})
    .then(projects=>{
        if(!projects){
            projects='Thee are no projects'
        }
        return res.status(200).json({projects:projects})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}
// get one project by id
exports.getProjectId=(req,res,next)=>{
    const projectId=req.params.projectId;
    db.project.findOne({where:{id:projectId},include:[{model:db.user},{model:db.STL},{model:db.file}]})
    .then(project=>{
        if(!project){
            const error=new Error('This project is not found')
            error.statusCode=404;
            throw error;
        }
        return res.status(200).json({project:project})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

// get all courses
exports.getCourses=(req,res,next)=>{
    const page=parseInt(req.query.page);
    const size=parseInt(req.query.size);
    return db.course.findAll({include:[{model:db.user}],offset:((page-1)*size),limit:size})
    .then(courses=>{
        if(courses.length==0){
            courses="there are no courses";
        }
        res.status(200).json({courses:courses})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}
// get user course with Id
exports.getCourseId=(req,res,next)=>{
    const courseId=req.params.courseId;
    return db.course.findOne({where:{id:courseId},include:[{model:db.user}]})
    .then(course=>{
        if(!course){
            const error=new Error("This course is not exists");
            error.statusCode=422;
            throw error;
        }
        return res.status(200).json({course:course})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

// create rate
exports.addRate=(req,res,next)=>{
    const courseId=req.params.courseId;
    const rate=req.body.rate;
    return db.courseRate.findOne({where:{courseId:courseId,userId:req.userId}})
    .then(rateCourse=>{
        if(rateCourse){
            rateCourse.rate=rate
            return rateCourse.save();
        }
        return db.courseRate.create({
            userId:req.userId,
            courseId:courseId,
            rate:rate
        })
    })
    .then(()=>{
        return res.status(200).json({message:"done"})
    })
    .catch(err=>{
        if(!err.statsuCode){
            err.statsuCode=500;
        }
        next(err);
    })
}

exports.getCourseRate=(req,res,next)=>{
    courseId=req.params.courseId;
    let sumRate;
    let countRate; 
    return db.courseRate.sum('rate',{where:{courseId:courseId}})
    .then(sumRates=>{
        sumRate=sumRates;
        return db.courseRate.count({where:{courseId:courseId}})
    })
    .then(countRates=>{
        countRate=countRates
        return db.course.findOne({where:{id:courseId}})
    })
    .then((course)=>{
        course.rate=sumRate/countRate;
        return course.save();
    })
    .then(course=>{
        return res.status(200).json({rate:course.rate})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

exports.Like=(req,res,next)=>{
    const likeabelId=req.params.likeabelId;
    const likeabelType=req.params.likeabelType;
    return db.like.create({
        userId:req.userId,
        likeableId:likeabelId,
        likeableType:likeabelType
    })
    .then(()=>{
        return db.like.count({where:{likeableId:likeabelId,likeableType:likeabelType}})
    })
    .then(count=>{
        return res.status(200).json({message:"like has been add",countLike:count})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    })
}

exports.unLike=(req,res,next)=>{
    const likeabelId=req.params.likeabelId;
    const likeabelType=req.params.likeabelType;
    return db.like.findOne({where:{likeableId:likeabelId,likeableType:likeabelType}})
    .then((like)=>{
        return like.destroy();
    })
    .then(()=>{
        return db.like.count({where:{likeableId:likeabelId,likeableType:likeabelType}})
    })
    .then(count=>{
        return res.status(200).json({message:"like has been deleted",countLike:count})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    })
}

exports.getCountCourse=(req,res,next)=>{
    return db.course.count()
    .then(count=>{
        return res.status(200).json({count:count})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}
exports.getCountProject=(req,res,next)=>{
    return db.project.count()
    .then(count=>{
        return res.status(200).json({count:count})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}
exports.getCountSTL=(req,res,next)=>{
    return db.STL.count()
    .then(count=>{
        return res.status(200).json({count:count})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

exports.mostRatedCourse=(req,res,next)=>{
    const Limit=parseInt(req.params.number);
    return db.course.findAll({order:[['rate','DESC']],limit:Limit})
    .then(course=>{
        return res.status(200).json({courses:course})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}
exports.mostRatedCourseOneUser=(req,res,next)=>{
    const Limit=parseInt(req.params.number);
    return db.course.findAll({order:[['rate','DESC']],limit:Limit})
    .then(course=>{
        return res.status(200).json({courses:course})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

