const jwt=require("jsonwebtoken");
const db=require('../models');
require('dotenv').config();

const generateToken =(user)=>{
    try{
        const accessToken=jwt.sign({
            userId:user.id,
            email:user.email,
            role:user.role
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'});
        const refreshToken=jwt.sign({
            userId:user.id,
            email:user.email,
            role:user.role
        },process.env.REFRESH_TOKEN_SECRET,{expiresIn:'30d'});
        db.user_token.findOne({where:{UserId:user.id}})
        .then(userToken=>{
            if(userToken){
                userToken.destroy()
            }
            db.user_token.create({
                token:refreshToken,
                UserId:user.id
            })
        })
        return {accessToken,refreshToken};
    }catch(err){
        return Promise.reject(err);
    }
}
module.exports=generateToken;