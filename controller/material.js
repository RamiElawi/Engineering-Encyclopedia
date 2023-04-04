const db=require('../models')

// create Matrail
exports.addMaterial=(req,res,next)=>{
    const materialName=req.body.materialName;
    const density=req.body.density;

    db.Material.findOne({where:{materialName:materialName}})
    .then(material=>{
        if(material){
            const error=new Error('this material is already exists');
            error.statusCode=422;
            throw error;
        }
        return db.Material.create({
            materialName:materialName,
            density:density
        })
    })
    .then(()=>{
        return res.status(200).json({message:"The material has been created"})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err); 
    })
}
// update Material
exports.updateMaterial=(req,res,next)=>{
    const materialId=req.params.materialId;
    const materialName=req.body.materialName;
    const density=req.body.density;
    db.Material.findOne({where:{id:materialId}})
    .then(material=>{
        if(!material){
            const error=new Error('This material is not exists');
            error.statusCode=422;
            throw error;
        }
        material.materialName=materialName;
        material.density=density;
        return material.save();
    })
    .then(()=>{
        return res.status(200).json({message:"Materail has been updated"})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

// delete material 
exports.deleteMatrial=(req,res,next)=>{
    const materialId=req.params.materialId;
    db.Material.findOne({where:{id:materialId}})
    .then(material=>{
        if(!material){
            const error=new Error('This material is not exists')
            error.statusCode=422;
            throw error;
        }
        return material.destroy();
    })
    .then(()=>{
        return res.status(200).json({message:"Material has been deleted"})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}
