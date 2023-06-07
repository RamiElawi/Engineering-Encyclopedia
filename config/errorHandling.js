module.exports=(error,req,res,next)=>{
    console.log(error);
    const status=error.statusCode;
    const data=error.data;
    const message=error.message;
    res.status(status).json({
            message:message,
            data:data,
            statusCode:status
    })
}