// const sequelize=require('../util/database');
// const Sequelize=require('sequelize');

// const Message=sequelize.define('message',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     content:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// })

// module.exports=Message;

module.exports=(sequelize,DataTypes)=>{
    const Message=sequelize.define('Message',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        content:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })

    Message.associate=models=>{
        Message.belongsTo(models.chat);
        Message.belongsTo(models.user);
    }

    return Message;
}