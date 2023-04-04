exports.isAdmin=(req,res,next)=>{
    try{
        console.log(req.role)
        console.log(req.userId)
        if(req.role!=='admin'){
                const error=new Error('you dont have authorization to access this route');
                error.statusCode=403;
                throw error;
            }
            next();
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    }
}
exports.isEngeneering=(req,res,next)=>{
    try{
        if(req.role!=='engeneering'){
                const error=new Error('you dont have authorization to access this route');
                error.statusCode=403;
                throw error;
            }
            next();
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    }
}
