const express=require('express');
const router=express.Router();
const authController=require('../controller/auth');
const {body}=require('express-validator');
const db=require('../models')

router.post('/signup',
[
    body('email')
    .isEmail()
    .withMessage('this email is not valid')
    .custom((value,{req})=>{
        return db.user.findOne({where:{email:value}})
        .then(user=>{
            if(user){
                return Promise.reject("this email is already exists")
            }
        })
    })
    ,body('password','this password should be at least 6 charachter or more')
    .trim()
    .isLength({min:6})
    ,body('confirmPassword')
    .isLength({min:6})
    .custom((value,{req})=>{
        if(req.body.password!=value){
            const err=new Error('this password is not match')
            err.statusCode=422;
            throw err;
        }
        return true;
    })

]
,authController.postSignup);




router.post('/login',authController.postLogin)

router.post('/refreshToken',authController.refreshToken)

router.post('/resetPassword',authController.resetPassword)

router.post('/newPassword/:resetToken',[
    body('newPassword')
    .trim()
    .isLength({min:6})
    ,body('confirmPassword')
    .trim()
    .isLength({min:6})
    .custom((value,{req})=>{
        if(req.body.newPassword!=value){
            const err=new Error('this password is not match')
            err.statusCode=422;
            throw err;
        }
        return true;
    })
],authController.newPassword)

// router.post('/changePassword',
// [
//     body('password','this password should be at least 6 charachter or more')
//     .trim()
//     .isLength({min:6})
//     ,body('confirmPassword')
//     .isLength({min:6})
//     .custom((value,{req})=>{
//         if(req.body.password!=value){
//             const err=new Error('this password is not match')
//             err.statusCode=422;
//             throw err;
//         }
//         return true;
//     })

// ]
// ,authController)

router.delete('/logout',authController.logout)

module.exports=router;