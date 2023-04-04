// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');

// const User=sequelize.define('user',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     firstName:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     },
//     lastName:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     email:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     password:{
//         type:Sequelize.STRING,
//         allwoNull:false
//     },
//     userImage:{
//         type:Sequelize.STRING
//     },
//     role:{
//         type:Sequelize.STRING,
//         defaultValue:"USER"
//     },
//     // test:Sequelize.BOOLEAN
// })

// module.exports=User;

module.exports=(sequelize,Sequelize)=>{
    const User=sequelize.define('user',{
        id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        firstName:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        lastName:{
            type:Sequelize.STRING,
            allowNull:false
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false
        },
        password:{
            type:Sequelize.STRING,
            allwoNull:false
        },
        userImage:{
            type:Sequelize.STRING
        },
        role:{
            type:Sequelize.STRING,
            defaultValue:"USER"
        }
    },{timestamps:false});

    return User;
}