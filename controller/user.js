const User=require('../models/user');

exports.changeImage=(req,res,next)=>{
    db.user.findOne({where:{id:req.userId}})
    .then(user=>{
        if(!user){
            const error=new Error('this user is not found');
            error.statusCode=404;
            throw error;
        }
        if(!req.file){
            const error=new Error('You do not choose image');
            error.statusCode=422;
            throw error;
        }
        user.userImage=req.file.path;
        return user.save();
    })
    .then(()=>{
        return res.status(200).json({message:'done'})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

exports.getProfile=(req,res,next)=>{
    const userId=req.params.userId;
    db.user.findOne({where:{id:userId}})
    .then(user=>{
        if(!user){
            const error=new Error('this user is not found');
            error.statusCode=404;
            throw error
        }
        res.status(200).json({user:user})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

exports.updateRole=(req,res,next)=>{
    const role=req.body.role;
    const userId=req.params.userId;
    db.user.findOne({where:{id:userId}})
    .then(user=>{
        if(!user){
            const error=new Error('this user is not found');
            err.statusCode=404;
            throw error;
        }
        user.role=role;
        return user.save();
    })
    .then(user=>{
        return res.status(200).json({message:`User ${user.firstName} ${user.lastName} has become the validity ${role}`})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statuscode=500;
        }
        next(err);
    })
}

exports.getUsers=(req,res,next)=>{
    const userRole=req.params.userRole;
    db.user.findAll({where:{role:userRole}})
    .then(users=>{
        if(!users.length){
            users=`you don\'t have ${userRole}`;
        }
        return res.status(200).json({users:users})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}