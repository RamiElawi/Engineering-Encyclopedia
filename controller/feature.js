const db=require('../models');

exports.addFeature=(req,res,next)=>{
    const featureName=req.body.featureName;
    db.feature.findOne({where:{featureName:featureName}})
    .then(feature=>{
        if(feature){
            const error=new Error('this feature is already exsist');
            error.statusCode=422;
            throw error;
        }
        return db.feature.create({
            featureName:featureName
        })
    })
    .then(()=>{
        return res.status(200).json({message:'feature has been created'})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

exports.updateFeature=(req,res,next)=>{
    const featureId=req.params.featureId;
    const featureName=req.body.featureName;
    return db.feature.findOne({where:{id:featureId}})
    .then(feature=>{
        if(!feature){
            const error=new Error('this feature is not found')
            error.statusCode=422;
            throw error;
        }
        feature.featureName=featureName
        return feature.save();
    })
    .then(()=>{
        return res.status(200).json({message:'Feature has been updated'})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

exports.deleteFeature=(req,res,next)=>{
    const featureId=req.params.featureId;
    return db.feature.fineOne({where:{id:featureId}})
    .then(feature=>{
        if(!feature){
            const error=new Error('this feature is not found')
            error.statusCode=422;
            throw error;
        }
        return feature.destroy();
    })
    .then(()=>{
        return res.status(200).json({message:'Feature has been deleted'})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    })
}

