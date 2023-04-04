const db=require('../models');
const path=require('path')

// create one Service
exports.addService=(req,res,next)=>{
    const serviceName=req.body.serviceName;
    const description=req.body.description;
    return db.Service.findOne({where:{serviceName:serviceName}})
    .then(service=>{
        if(service){
            const error=new Error("this service is already exists");
            error.statusCode=422;
            throw error;
        }
        if(!req.file){
            const error=new Error ('there is no file');
            error.statusCode=422;
            throw error;
        }
        const pathImage=req.file.path;
        return db.Service.create({
            serviceName:serviceName,
            description:description,
            serviceImage:pathImage,
            userId:req.userId
        })
    }).then(()=>{
        return res.status(200).json({message:"create service is done"})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })  
}
// Update service with Id
exports.updateService=(req,res,next)=>{
    const serviceId=req.params.serviceId;
    const serviceName=req.body.serviceName;
    const description=req.body.description;

    return db.Service.findOne({where:{id:serviceId}})
    .then(service=>{
        if(!service){
            const error=new Error("Not found this service")
            error.statusCode=404;
            throw error;
        }
        if(service.userId!=req.userId){
            const error=new Error('You can\'t update this service');
            error.statusCode=422;
            throw error;
        }
        service.serviceName=serviceName;
        service.description=description;
        if(!req.file){
            pathImage=service.serviceImage;
        }else{
            pathImage=req.file.path;
        }
        service.serviceImage=pathImage;
        return service.save();
    })
    .then((service)=>{
        res.status(200).json({message:'update is done!'});
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}
// delete one service with Id
exports.deleteService=(req,res,next)=>{
    const serviceId=req.params.serviceId;
    return db.Service.findOne({where:{id:serviceId}})
    .then(service=>{
        if(!service){
            const error=new Error('Not found this Service');
            error.statusCode=404;
            throw error;
        }
        if(service.userId!=req.userId){
            const error=new Error('You can\'t delete this service');
            error.statusCode=422;
            throw error;
        }
        require('../util/clearImage').clearImage(service.serviceImage);
        return service.destroy();
    })
    .then(()=>{
        res.status(201).json({message:"Delete is done"})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}
