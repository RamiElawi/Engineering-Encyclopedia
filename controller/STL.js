// const STL=require('../models/stl');
// const Image=require('../models/image');
// const stlProject=require('../models/project_STL');
// const materialSTL=require('../models/materialStl');
// const user_project = require('../models/project_STL');
// const material=require('../models/material')
const db=require('../models')
const Op=require('sequelize').Op;

// create STL with image or more by user
exports.addSTL=(req,res,next)=>{
    const stlName=req.body.stlName;
    const description=req.body.description;
    const width=req.body.width;
    const height=req.body.height;
    const length=req.body.length;
    const price=req.body.price;
    const materialId=req.body.materialId;
    let mySTL;

    if(Object.keys(req.files).length < 3){
        const error=new Error('Did not choose Files');
        error.statusCode=422;
        throw error;
    }
    return db.STL.create({
        stlName:stlName,
        description:description,
        width:width,
        height:height,
        length:length,
        price:price,
        size:width*height*length,
        stlImage:req.files.STL[0].path
    })
    .then(stl=>{
        mySTL=stl;
        return db.project_stl.create({
            stlId:stl.id,
            userId:req.userId
        })
    })
    .then(()=>{
        if(Array.isArray(materialId)){
            materialId.forEach(element => {
                db.materialSTL.create({
                    materialId:element,
                    stlId:mySTL.id
                })
            });
        }else{
            db.MaterialStl.create({
                materialId:materialId,
                stlId:mySTL.id
            })
        }
    })
    .then(()=>{
        req.files.images.forEach(ele => {
            db.image.create({
                path:ele.path,
                stlId:mySTL.id
            })
        });
    })
    .then(()=>{
        req.files.file.forEach(ele=>{
            db.File.create({
                path:ele.path,
                stlId:mySTL.id
            })
        })
    })
    .then(()=>{
        return res.status(200).json({message:"STL has been created"})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}
// update STL by Id
exports.updateSTL=(req,res,next)=>{
    const stlId=req.params.stlId;
    const stlName=req.body.stlName;
    const description=req.body.description;
    const width=req.body.width;
    const height=req.body.height;
    const length=req.body.length;
    const price=req.body.price;
    const materialId=req.body.materialId;

    // console.log(materialId);
    // console.log("req.files",req.files.STL);

    db.project_stl.findOne({where:{stlId:stlId,projectId:null}})
    .then(stl=>{
        if(!stl){
            const error=new Error('This stl is not exists');
            error.statusCode=500;
            throw error;
        }
        if(stl.userId!=req.userId){
            const error=new Error('You can\'t update this STL ')
        }
        stl.stlName=stlName;
        stl.description=description;
        stl.width=width;
        stl.height=height;
        stl.length=length;
        stl.price=price;
        stl.size=width*height*length;
        if(!req.files.STL){
            stl.stlImage=stl.stlImage;
        }
        else{
            stl.stlImage=req.files.STL[0].path;
        }
        return stl.save();
    })
    .then(()=>{
        return db.materialSTL.findAll({where:{stlId:stlId}})
    })
    .then(stl=>{
        stl.forEach(ele=>{
            ele.destroy();
        })
        if(Array.isArray(materialId)){
            materialId.forEach(ele=>{
                db.materialSTL.create({
                    stlId:stlId,
                    materialId:ele
                })
            })
        }else{
            db.materialSTL.create({
                stlId:stlId,
                materialId:materialId
            })
        }
    })
    .then(()=>{
        return db.image.findAll({where:{stlId:stlId}})
    })
    .then((image)=>{
        image.forEach(ele=>{
            ele.destroy()
        })
        req.files.image.forEach(ele=>{
            db.image.create({
                path:ele.path,
                stlId:mySTL.id
            })
        })
    })
    .then(()=>{
        return db.File.findAll({where:{stlId:stlId}})
    })
    .then(files=>{
        files.forEach(ele=>{
            ele.destroy();
        })
        req.fiels.file.forEach(ele=>{
            db.File.create({
                path:ele.path
                ,stlId:stlId
            })
        })
    })
    .then(()=>{
        res.status(200).json({message:"STL has been updated"})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

// delete STL
exports.deleteSTL=(req,res,next)=>{
    const stlId=req.params.stlId;
    db.user_project.findOne({where:{stlId:stlId,projectId:null}})
    .then(stl=>{
        if(!stl){
            const error=new Error('this stl is not found')
            error.statusCode=422;
            throw error;
        }
        if(stl.userId!=req.userId){
            const error=new Error('You don\'t have authorization to delete this STL')
            error.statusCode=422;
            throw error;
        }
        return db.image.findAll({where:{sltId:stlId}})
    })
    .then(images=>{
        images.forEach(ele=>{
            require('../util/clearImage').clearImage(ele.path);
            ele.destroy();
        })
    })
    .then(()=>{
        return db.File.findAll({where:{stlId:stlId}})
    })
    .then(files=>{
        files.forEach(ele=>{
            require('../util/clearImage').clearImage(ele.path);
            ele.destroy();
        })
    })
    .then(()=>{
        return db.STL.findOne({where:{id:stlId}})
    })
    .then(stl=>{
        require('../util/clearImage').clearImage(stl.stlImage)
        return stl.destroy();
    })
    .then(()=>{
        res.status(200).json({message:"STL has been deleted"})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

// get STL to one user 
exports.getMySTL=(req,res,next)=>{
    const size=req.query.size;
    const page=req.queery.page||1;
    let my_stl=new Array();
    let i=0;
    db.user_project.findAll({where:{userId:req.userId}})
    .then(stls=>{
        if(!stls){
            const error=new Error('You do not have any STL');
            error.statsuCode=422;
            throw error;
        }
        stls.forEach(ele=>{
            my_stl[i]=ele.stlId;
            i++;
        })
        return my_stl;
    })
    .then((my_stl)=>{
        return db.STL.findAll({where:{id:{[Op.in]:my_stl}},offset:((page-1)*size),limit:size,include:[db.material,db.image,db.File]})
    })
    .then(stls=>{
        return res.status(200).json({stls:stls})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}
