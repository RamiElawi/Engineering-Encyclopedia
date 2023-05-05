const db=require('../models')
const {Op}=require('sequelize')

// create project
exports.addProject=(req,res,next)=>{
    const projectName=req.body.projectName;
    const description=req.body.description;
    const stlId=req.body.stlId;
    const width=req.body.width;
    const length=req.body.length;
    const height=req.body.height;
    let requiredProject;
    let fileNumber=3;

    // if user don't choose 3 files show error 
    if(Object.keys(req.files).length<fileNumber){
        const error=new Error('Did not choose file');
        error.statusCode=422;
        throw error;
    }
    // create Project
    return db.project.create({
        projectName:projectName,
        description:description,
        userId:req.userId,
        width:width,
        length:length,
        height:height,
        projectImage:req.files.image[0].path,
        projectImageSTL:req.files.imageSTL[0].path,
    })
    .then(project=>{
        requiredProject=project;
        // create file 
        return req.files.file.forEach(element => {
            db.file.create({
                path:element.path,
                fileName:element.originalname,
                fileabelId:requiredProject.id,
                fileableType:'Project'
            })
        });
    })
    .then(()=>{
        // connect the project with its STL
        // if there are many stl
        if(Array.isArray(stlId)){
            return stlId.forEach(ele=>{
                db.project_stl.create({
                    projectId:requiredProject.id,
                    stlId:ele
                })
            })
        }else{
            // if there are one stl
            return db.project_STL.create({
                projectId:requiredProject.id,
                stlId:stlId
            })
        }
    })
    .then(()=>{
        return db.STL.sum('price',{where:{id:stlId}})
    })
    .then(sum=>{
        requiredProject.price=sum;
        return requiredProject.save();
    })
    .then(()=>{
        return res.status(200).json({message:'Project has been created'})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

// update project by Id
exports.updateProject=(req,res,next)=>{
    const projectId=req.params.projectId;
    const projectName=req.body.projectName;
    const description=req.body.description;
    const length=req.body.length;
    const width=req.body.width;
    const height=req.body.height;
    let stlId=req.body.stlId;
    let requiredSTLs=new Array();
    let requiredProject;
    let i=0;
    db.project.findOne({where:{id:projectId}})
    .then(requiredP=>{
        if(!requiredP){
            const error=new Error('This project is not found');
            error.statusCode=422;
            throw error;
        }
        if(project.userId!=req.userId){
            const error=new Error('You don\'t have authorization to update this project');
            error.statusCode=422;
            throw error;
        }
        console.log(req.files)
        console.log(requiredP)
        requiredP.projectName=projectName
        requiredP.description=description
        requiredP.length=length;
        requiredP.width=width;
        requiredP.height=height;

        if(!req.files.image){
            requiredP.projectImage=requiredP.projectImage
        }else{
            require('../util/clearImage').clearImage(requiredP.projectImage)
            requiredP.projectImage=req.files.image[0].path
        }
        if(!req.files.imageSTL){
            requiredP.projectImage=requiredP.projectImageSTL
        }else{
            require('../util/clearImage').clearImage(requiredP.projectImageSTL)
            requiredP.projectImage=req.files.imageSTL[0].path
        }
        requiredProject=requiredP
        return requiredP.save();
    })
    .then(()=>{
        if(req.files.file){
            db.file.findAll({where:{fileabelId:projectId,fileableType:'Project'}})
            .then(file=>{
                file.forEach(ele=>{
                    require('../util/clearImage').clearImage(ele.path)
                    ele.destroy();
                })
                req.files.file.forEach(ele=>{
                    db.File.create({
                        projectId:projectId,
                        path:ele.path
                    })
                })
            })
        }
    })
    .then(()=>{
        return db.project_STL.findAll({where:{id:projectId}})
    })
    .then(projects=>{
        return projects.forEach(ele=>{
            requiredSTLs[i]=ele.stlId;
            i++;
            ele.destroy();
        })
    })
    .then(()=>{
        if(!stlId){
            stlId=requiredSTLs;
        }
        if(Array.isArray(stlId)){
            return stlId.forEach(ele=>{
                db.project_STL.create({
                    stlId:ele,
                    projectId:projectId,
                })
            })
        }else{
            return db.project_STL.create({
                stlId:stlId,
                projectId:projectId,
            })
        }
    })
    .then(()=>{
        return db.STL.sum('price',{where:{id:stlId}})
    })
    .then(sum=>{
        requiredProject.price=sum;
        return requiredProject.save();
    })
    .then(()=>{
        return res.status(200).json({message:"project has been updated"})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}
// delete project by id
exports.deleteProject=(req,res,next)=>{
    const projectId=req.params.projectId;
    let requiredProject;
    db.project.findOne({where:{id:projectId}})
    .then(project=>{
        if(!project){
            const error=new Error('This project is not found')
            error.statusCode=422;
            throw error;
        }
        if(project.userId!=req.userId){
            const error=new Error('You dont have authorization to delete this project');
            error.statusCode=422;
            throw error;
        }
        require('../util/clearImage').clearImage(project.projectImage)
        require('../util/clearImage').clearImage(project.projectImageSTL)
        requiredProject=project
        return db.file.findAll({where:{fileabelId:projectId,fileableType:'Project'}})
    })
    .then((files)=>{
        return    files.forEach(ele=>{
            require('../util/clearImage').clearImage(ele.path);
            ele.destroy();
        })
    })
    .then(()=>{
        return db.project_STL.findAll({where:{projectId:projectId}})
    })
    .then((projects)=>{
        return projects.forEach(ele=>{
            ele.destroy();
        })
    })
    .then(()=>{
        return requiredProject.destroy()
    })
    .then(()=>{
        return res.status(200).json({message:'Project has been deleted'})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

// get my project 
exports.getMyProject=(req,res,next)=>{
    const page=parseInt(req.query.page);
    const size=parseInt(req.query.size);
    db.project.findAll({where:{userId:req.userId},offset:((page-1)*size),limit:size,include:[{model:db.file},{model:db.user},{model:db.STL,include:[{model:db.material},{model:db.feature},{model:db.color},{model:db.image}]}]})
    .then(projects=>{
        if(!projects){
            projects='You do not have any projects';
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
