// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');
// const Project=sequelize.define('project',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     }
//     ,projectName:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
//     ,description:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
//     ,projectImage:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
//     ,price:{
//         type:Sequelize.DOUBLE
//     },
//     like:{
//         type:Sequelize.INTEGER
//     }

// });
// module.exports=Project;

module.exports=(sequelize,DataTypes)=>{
    const Project=sequelize.define('Project',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        }
        ,projectName:{
            type:DataTypes.STRING,
            allowNull:false
        }
        ,description:{
            type:DataTypes.STRING,
            allowNull:false
        }
        ,projectImage:{
            type:DataTypes.STRING,
            allowNull:false
        }
        ,price:{
            type:DataTypes.DOUBLE
        },
        like:{
            type:DataTypes.INTEGER
        }
    },{timestamps:false,freezeTableName:true})

    return Project;
}