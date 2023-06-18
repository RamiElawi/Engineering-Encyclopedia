const bcrypt=require('bcryptjs');
const {validationResult}=require('express-validator')
const jwt=require('jsonwebtoken');
const generateToken=require('../util/generateToken');
require('dotenv').config();
const db=require('../models')
const nodemailer=require('nodemailer')
const crypto=require('crypto');
const {Op}=require('sequelize')

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'elawirse@gmail.com',
        pass:'umpguizdudmypmvu'
    }
})



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

exports.resetPassword=(req,res,next)=>{
    const email=req.body.email;
    
   
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            throw err;
        }
        const resetToken=buffer.toString('hex')
        db.user.findOne({where:{email:email}})
        .then(user=>{
            if(!user){
                const error=new Error('this email is not found')
                error.statusCode=422;
                throw error;
            }
            user.resetToken=resetToken;
            user.resetTokenExpiration= Date.now() + (1000*5*60);
            return user.save();
        })
        .then((user)=>{
            const mailOptions={
                from:'elawirse@gmail.com',
                to:email,
                subject:'Reset Password',
                html:`
                    <p>Your request a password reset </p>
                    <p>Click <a href='http://localhost:3000/api/auth/newPassword/${user.resetToken}'>here</a> to set a new password</p>
                    `
            }
            transporter.sendMail(mailOptions,(err,info)=>{
                if(err){
                    console.log(err)
                    throw err 
                }
                console.log(info);
            })
            console.log(user.resetToken)
            return res.status(200).json({message:'an email was send to your account '})
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode=500;
            }
            next(err);
        })
    })
}

exports.newPassword=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const error =new Error('validation faild');
        error.statusCode=422;
        error.data=errors.array();
        throw error;
    }
    const newPassword=req.body.newPassword;
    const restToken=req.params.resetToken;
    let requiredUser;
    return db.user.findOne({where:{resetToken:restToken,resetTokenExpiration:{[Op.gt]:Date.now()}}})
    .then(user=>{
        if(!user){
            const error=new Error('this user is not found')
            error.statusCode=422;
            throw error;
        }
        requiredUser=user;
        return bcrypt.hash(newPassword,12)
    })
    .then(hashPassword=>{
        requiredUser.password=hashPassword;
        requiredUser.save();
    })
    .then(()=>{
        return res.status(200).json({message:'change password is done'})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    })
}