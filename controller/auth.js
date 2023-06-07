const bcrypt=require('bcryptjs');
const {validationResult}=require('express-validator')
const jwt=require('jsonwebtoken');
const generateToken=require('../util/generateToken');
const User=require('../models/user')
require('dotenv').config();
const db=require('../models')


exports.postSignup=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const error =new Error('validation faild');
        error.statusCode=422;
        error.data=errors.array();
        throw error;
    }
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const password=req.body.password;

    bcrypt.hash(password,12)
    .then(hashPassword=>{
        return db.user.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:hashPassword
        })
    })
    .then(user=>{
        res.status(200).json({message:"create acount is done"})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}

exports.postLogin=(req,res,next)=>{
   const email=req.body.email;
   const password=req.body.password;
   let correctUser;
   return db.user.findOne({where:{email:email}})
   .then(user=>{
    if(!user){
        const error=new Error('This email is not found');
        error.statusCode=422;
        throw error;
    }
    correctUser=user;
    return bcrypt.compare(password,user.password)
   })
   .then(isCorrect=>{
    if(!isCorrect){
        const error=new Error('This password isn\'t correct');
        error.statusCode=422;
        throw error;
    }
    const {accessToken,refreshToken}=generateToken(correctUser);
    // console.log(correctUser)
    
    return res.status(200).json({message:"correct login",token:accessToken,refreshToken:refreshToken})
   })
   .catch(err=>{
    if(!err.statusCode){
        err.statusCode=500;
    }
    next(err);
   })
}   
exports.refreshToken=(req,res,next)=>{
    const refreshToken=req.body.token;
    db.refreshToken.findOne({where:{token:refreshToken}})
    .then(foundUser=>{
        if(!foundUser){
            return res.status(403).json({message:"User not authetication"})
        }
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
            if(!err){
                db.user.findOne({where:{id:user.userId}})
                .then(user=>{
                    const {accessToken,refreshToken}=generateToken(user);
                    res.status(200).json({accessToken:accessToken,refreshToken:refreshToken});
                })
            }else{
                return res.status(403).json({message:"User not authenticated"})
            }
        })
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next();
    })
}

exports.logout=(req,res,next)=>{
    const refreshToken=req.body.token;
    db.refreshToken.findOne({where:{token:refreshToken}})
    .then(user=>{
        if(!user){
            res.status(403).json({message:"User Not authenticated"})
        }
        return user.destroy();
    })
    .then(()=>{
        return res.status(200).json({message:'logout is done'})
    })
    .catch(err=>{
        if(!err){
            err.statusCode=500;
        }
        next();
    })
}