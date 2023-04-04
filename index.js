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
const getData=require('./routes/getdata')

const bodyParser=require('body-parser')
const path=require('path')

const db=require('./util/database');



app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT,PATCH');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization',);
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
app.use('/admin/course',courseRouter)
app.use('/admin/material',materialRouter)
app.use('/admin/STL',stlRouter);
app.use('/admin/Project',projectRouter);
app.use('/admin/Lesson',lessonRouter)
app.use('/Comment',commentRouter)
app.use('/chat',chatRouter)
app.use('/message',messageRouter)
app.use('/getData',getData)
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

        socket.on('setup',(userData)=>{
            socket.join(userData.id);
            console.log(userData.id)
            socket.emit('connected');
        })

        socket.on('join chat',(room)=>{
            socket.join(room);
            console.log('user joined Room',room)
        })

        socket.on('typing',(room)=>socket.in(room).emit('typing'))
        socket.on('stop typing',(room)=>socket.in(room).emit('stop typing'))

        socket.on('new message',(newMessageRecievied)=>{
            let chat=newMessageRecievied.chat;
            if(!chat.users) return console.log('chat .users not define');
            chat.users.forEach(user=>{
                if(user.id==newMessageRecievied.userId.id) return ;
                socket.in(user.id).emit('message recieved',newMessageRecievied)
            })
        })
        socket.off('setup',()=>{
            console.log('user disconnected');
            socket.leave(userData.id);
        })
    })
})
.catch(err=>console.log(err))
