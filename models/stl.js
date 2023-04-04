// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');
// const STL=sequelize.define('stl',{
//     id:{
//         type: Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     stlName:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     description:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     height:{
//         type:Sequelize.DOUBLE
//     },
//     width:{
//         type:Sequelize.DOUBLE
//     },
//     size:{
//         type:Sequelize.DOUBLE
//     },
//     length:{
//         type:Sequelize.DOUBLE
//     }
//     ,price:{
//         type:Sequelize.DOUBLE
//     },
//     stlImage:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     like:{
//         type:Sequelize.INTEGER
//     }
// });
// module.exports=STL;



module.exports=(sequelize,DataTypes)=>{
    const STL=sequelize.define('STL',{
        id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        stlName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        },
        height:{
            type:DataTypes.DOUBLE
        },
        width:{
            type:DataTypes.DOUBLE
        },
        size:{
            type:DataTypes.DOUBLE
        },
        length:{
            type:DataTypes.DOUBLE
        }
        ,price:{
            type:DataTypes.DOUBLE
        },
        stlImage:{
            type:DataTypes.STRING,
            allowNull:false
        },
        like:{
            type:DataTypes.INTEGER
        }
    },{timestamps:false,freezeTableName:true})

    return STL;
}