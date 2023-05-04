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