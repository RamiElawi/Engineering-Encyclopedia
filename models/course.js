// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');
// const Course=sequelize.define('course',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     courseName:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     description:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     level:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     totalTime:{
//         type:Sequelize.STRING
//     },
//     price:{
//         type:Sequelize.DOUBLE,
//         allowNull:false
//     },
//     courseImage:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     rate:{
//         type:Sequelize.DOUBLE
//     }
// })
// module.exports=Course;

module.exports=(sequelize,DataTypes)=>{
    const Course=sequelize.define('Course',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        courseName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        },
        level:{
            type:DataTypes.STRING,
            allowNull:false
        },
        totalTime:{
            type:DataTypes.STRING
        },
        price:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        courseImage:{
            type:DataTypes.STRING,
            allowNull:false
        },
        rate:{
            type:DataTypes.DOUBLE
        }
    })

    
    return Course;

}