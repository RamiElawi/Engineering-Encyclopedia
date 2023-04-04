// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');

// const Chat=sequelize.define('chat',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     }
// })

// module.exports=Chat;

module.exports=(sequelize,DataTypes)=>{
    const Chat=sequelize.define('chat',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        }
    })

    
    Chat.associate=models=>{
        Chat.belongsTo(models.user);
        Chat.belongsTo(models.user);
    }
    return Chat;

}