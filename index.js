const express=require('express');
const app=express();
const allRoutes=require('./routes')
const cors=require('cors')
const corsSetting=require('./config/corsSetting')
const bodyParser=require('body-parser')
const path=require('path');
const db=require('./util/database');
const errorHandling = require('./config/errorHandling');

app.use(cors(corsSetting))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'public')))

//create routes
app.use('/api',allRoutes)

// handling error
app.use(errorHandling)


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
