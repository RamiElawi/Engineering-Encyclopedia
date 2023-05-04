const jwt=require("jsonwebtoken");
const db=require('../models')
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
        db.refreshToken.findOne({where:{userId:user.id}})
        .then(userToken=>{
            if(userToken){
                userToken.destroy()
            }
            db.refreshToken.create({
                token:refreshToken,
                userId:user.id
            })
        })
        return {accessToken,refreshToken};
    }catch(err){
        return Promise.reject(err);
    }
}
module.exports=generateToken;