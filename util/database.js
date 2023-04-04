const sequelize=require('sequelize');
const db=new sequelize('engineering_encyclopedia','root','',{
    dialect:'mysql',
    host:'localhost'
})
module.exports=db;