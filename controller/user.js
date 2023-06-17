const db=require('../models')
const nodemailer=require('nodemailer')

const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'elawirse@gmail.com',
            pass:'umpguizdudmypmvu'
        }
})

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
    let fileOwner=false;
    db.user.findOne({where:{id:userId}})
    .then(user=>{
        if(!user){
            const error=new Error('this user is not found');
            error.statusCode=404;
            throw error
        }
        if(req.userId==userId){
            fileOwner=true;
        }
        return res.status(200).json({user:user,fileOwner:fileOwner})
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
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

exports.contactUs=(req,res,next)=>{
    const text=req.body.text;
    const email=req.body.email;

    const mailOption={
        from:'elawirse@gmail.com',
        to:email,
        subject:'contact us',
        text:text
    }
    transporter.sendMail(mailOption,(err,info)=>{
        if(err){
            console.log(err)
            throw err
        }
        console.log(info);
    })
}