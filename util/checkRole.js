module.exports=(roles)=>{
    return (req,res,next)=>{
        try{
            const userRole=req.role;
            if(roles.includes(userRole)) 
                next();
            else{
                const error=new Error('you don\'t have authorization to access this route');
                error.statusCode=403;
                throw error;
            }
        }catch(err){
            if(!err.statusCode){
                err.statusCode=500
            }
            next(err);
        }
    }
}