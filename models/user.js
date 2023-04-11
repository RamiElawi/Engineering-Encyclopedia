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

    User.associate=models=>{
        User.belongsToMany(models.STL,{through:models.project_stl})
        User.belongsToMany(models.Project,{through:models.project_stl})
        User.belongsToMany(models.Course,{through:models.user_course})
        User.belongsToMany(models.Lesson,{through:models.user_lesson})
    }

    return User;
}