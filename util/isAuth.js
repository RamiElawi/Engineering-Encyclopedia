const jwt=require('jsonwebtoken');
require('dotenv').config();
module.exports=(req,res,next)=>{
    const authHeader=req.get('Authorization');
    if(!authHeader){
        const error=new Error('not authinticated')
        error.statusCode=401;
        throw error;
    }
    const token=authHeader.split(' ')[1];
    let dedcodeToken;
    // console.log(token)
    try{
    dedcodeToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    }
    catch (err){
        err.statusCode=500;
        throw err;
    }
    if(!dedcodeToken){
        const error=new Error('Not authenticated');
        error.statusCode=401;
        throw error;
    }
    req.userId=dedcodeToken.userId;
    req.role=dedcodeToken.role;
    next();
}