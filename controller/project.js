// const Project=require('../models/project')
// const File=require('../models/file');
// const projectSTL=require('../models/project_STL');
// const STL=require('../models/stl')
// const material=require('../models/material');
// const Image=require('../models/image')
const db=require('../models')
const {Op}=require('sequelize')

// create project
exports.addProject=(req,res,next)=>{
    const projectName=req.body.projectName;
    const description=req.body.description;
    const price=req.body.price;
    const stlId=req.body.stlId
    let my_project;
    // console.log(projectName,description,price)
    if(Object.keys(req.files).length<2){
        const error=new Error('Did not choose any file');
        error.statusCode=422;
        throw error;
    }
    // console.log('file       df',req.files.file)
    // console.log('image      df',req.files.image)
    return db.Project.create({
        projectName:projectName,
        description:description,
        price:price,
        projectImage:req.files.image[0].path
    })
    .then(project=>{
        my_project=project;
        req.files.file.forEach(element => {
            db.File.create({
                path:element.path,
                projectId:my_project.id
            })
        });
    })
    .then(()=>{
        if(Array.isArray(stlId)){
            stlId.forEach(ele=>{
                db.project_stl.create({
                    userId:req.userId,
                    projectId:my_project.id,
                    stlId:ele
                })
            })
        }else{
            db.project_stl.create({
                userId:req.userId,
                projectId:my_project.id,
                stlId:stlId
            })
        }
        
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
    const price=req.body.price;
    let stlId=req.body.stlId;
    let my_stl=new Array();
    let i=0;
    db.project_stl.findAll({where:{projectId:projectId}})
    .then(project=>{
        if(!project.length){
            const error=new Error('This project is not found');
            error.statusCode=422;
            throw error;
        }
        if(project[0].userId!=req.userId){
            const error=new Error('You dont have authorization to update this project');
            error.statusCode=422;
            throw error;
        }
        project.forEach(ele=>{
            my_stl[i]=ele.stlId;
            i++;
            ele.destroy();
        })
        return db.Project.findOne({where:{id:projectId}})
    })
    .then((project)=>{
        project.projectName=projectName
        project.description=description
        project.price=price
        if(!req.files.image){
            project.projectImage=project.projectImage
        }else{
            project.projectImage=req.files.image[0].path
        }
        return project.save();
    })
    .then(()=>{
        if(req.files.file){
            File.findAll({where:{projectId:projectId}})
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
        if(!stlId){
            stlId=my_stl;
        }
        if(Array.isArray(stlId)){
            stlId.forEach(ele=>{
                db.project_stl.create({
                    stlId:ele,
                    projectId:projectId,
                    userId:req.userId
                })
            })
        }else{
            db.project_stl.create({
                stlId:stlId,
                projectId:projectId,
                userId:req.userId
            })
        }
    })
    .then(()=>{
        res.status(200).json({message:"project has been updated"})
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
    db.project_stl.findAll({where:{projectId:projectId}})
    .then(project=>{
        if(!project){
            const error=new Error('This project is not found')
            error.statusCode=422;
            throw error;
        }
        if(project[0].userId!=req.userId){
            const error=new Error('You dont have authorization to delete this project');
            error.statusCode=422;
            throw error;
        }
        project.forEach(ele=>{
            ele.destroy();
        })
        return db.File.findAll({where:{projectId:projectId}})
    })
    .then((files)=>{
        files.forEach(ele=>{
            require('../util/clearImage').clearImage(ele.path);
            ele.destroy();
        })
    })
    .then(()=>{
        return db.Project.findOne({where:{id:projectId}})
    })
    .then((project)=>{
        require('../util/clearImage').clearImage(project.projectImage)
        return project.destroy();
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
    const page=req.query.page;
    const size=req.query.size;
    let my_project=new Array();
    let i=0;
    db.project_stl.findAll({where:{projectId:{[Op.not]:null},userId:req.userId}})
    .then(projects=>{
        if(!projects){
            projects='You do not have any projects';
        }
        projects.forEach(element =>{
            my_project[i]=element.projectId;
            i++;
        });
        return my_project;
    })
    .then(my_project=>{
        let set=new Set(my_project)
        return db.Project.findAll({where:{id:[...set]},offset:((page-1)*size),limit:size})
    })
    .then(projects=>{
        return res.status(200).json({projects:projects})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}
// get All project
exports.getProject=(req,res,next)=>{
    const size=req.query.size;
    const page=req.query.page;
    return Project.findAll({offset:((page-1)*size),limit:size})
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
exports.getPrjectId=(req,res,next)=>{
    const projectId=req.params.projectId;
    Project.findOne({where:{id:projectId},include:[File,STL]})
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