const db=require('../models')
const path=require('path');
const fs=require('fs');
// get All Services
exports.getServices=(req,res,next)=>{
    const page=req.query.page;
    const size=req.query.size;
    return Service.findAll({offset:((page-1)*size),limit:size})
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
    return Service.findOne({where:{id:serviceId}})
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
    const page=req.query.page;
    const size=req.query.size;

    STL.findAll({include:[material,Image],offset:((page-1)*size),limit:size})
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
    STL.findOne({where:{id:stlId},include:[material,Image]})
    .then(stl=>{
        if(!stl){
            const error=new Error('This STL is not found')
            error.statsuCode=404;
            throw error;
        }
        res.status(200).json({stl:stl});
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
    const page=req.query.page;
    const size=req.query.size;
    Material.findAll({offset:((page-1)-size),limit:size})
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
    const materialId=req.params.matrialId;

    Material.findOne({where:{id:materialId}})
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
        return db.File.findAll({where:{stlId:stl.id}})
    })
    .then(files=>{
        let fileNames=new Array();
        files.forEach(element => {
            fileNames.push(element.path);
        });
        const filePaths=fileNames.map(name=>{
            return path.join(__dirname,'public','stlImage',name)
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