const express=require('express');
const app=express();
const authRoutes=require('./routes/auth');
const serviceRouter=require('./routes/service')
const courseRouter=require('./routes/course')
const materialRouter=require('./routes/material')
const stlRouter=require('./routes/STL');
const projectRouter=require('./routes/project');
const commentRouter=require('./routes/comment')
const lessonRouter=require('./routes/lesson')
const chatRouter=require('./routes/chat');
const messageRouter=require('./routes/message');
const getDataRouter=require('./routes/getdata');
const userRouter=require('./routes/user')
const questionRouter=require('./routes/question')
const featureRouter=require('./routes/feature')

const bodyParser=require('body-parser')
const path=require('path');

const db=require('./util/database');

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT,PATCH');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization,Content-Range,Accept-Ranges,Content-Length',);
    if(req.method === 'OPTIONS' ){
        return res.sendStatus(200)
    }
    next();
})




app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.json());


app.use('/public',express.static(path.join(__dirname,'public')))

//create routes
app.use('/auth',authRoutes);
app.use('/admin/service',serviceRouter);
app.use('/admin/user',userRouter);
app.use('/admin/course',courseRouter)
app.use('/admin/material',materialRouter)
app.use('/admin/STL',stlRouter);
app.use('/admin/Project',projectRouter);
app.use('/admin/Lesson',lessonRouter)
app.use('/Comment',commentRouter)
app.use('/chat',chatRouter)
app.use('/message',messageRouter)
app.use('/getData',getDataRouter)
app.use('/question',questionRouter)
app.use('/feature',featureRouter)
// handling error
app.use((error,req,res,next)=>{
    console.log(error);
    const status=error.statusCode;
    const data=error.data;
    const message=error.message;
    res.status(status).json({
            message:message,
            data:data,
            statusCode:status
    })
})



// connect database with server

db
.sync()
.then(()=>{
    const server=app.listen(3000,console.log("server is ready"));
    // use socket io for realTime
    const io=require('./socket').init(server);
    io.on('connection',socket=>{
        console.log('socket is connection')
    })
})
.catch(err=>console.log(err))
