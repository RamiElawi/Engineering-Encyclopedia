const db=require('../models')

// create Matrail
exports.addMaterial=(req,res,next)=>{
    const materialName=req.body.materialName;
    const density=req.body.density;

    // find required material by id
    db.material.findOne({where:{materialName:materialName}})
    .then(material=>{
        //if material is already exists show error  
        if(material){
            const error=new Error('this material is already exists');
            error.statusCode=422;
            throw error;
        }
        // create material 
        return db.material.create({
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
    //find material by id
    db.material.findOne({where:{id:materialId}})
    .then(material=>{
        //if material is not found show error
        if(!material){
            const error=new Error('This material is not exists');
            error.statusCode=422;
            throw error;
        }
        // change data in required material 
        material.materialName=materialName;
        material.density=density;
        // save change
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
    // find required material by id
    db.material.findOne({where:{id:materialId}})
    .then(material=>{
        // if required material is not found show error
        if(!material){
            const error=new Error('This material is not exists')
            error.statusCode=422;
            throw error;
        }
        // delete required material
        return material.destroy();
    })
    .then(()=>{
        // send result to frontEnd by json
        return res.status(200).json({message:"Material has been deleted"})
    })
    .catch(err=>{
        // if their are any error on server throw it
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}
