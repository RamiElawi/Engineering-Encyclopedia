// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');
// const Service=sequelize.define('service',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     serviceName:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     description:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     serviceImage:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// })
// module.exports=Service;



module.exports=(sequelize,DataTypes)=>{
    const Service=sequelize.define('Service',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        serviceName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        },
        serviceImage:{
            type:DataTypes.STRING,
            allowNull:false
        },
        userId:{
            type:DataTypes.INTEGER
        }
    },{timestamps:false,freezeTableName:true})

    Service.associate=models=>{
        Service.belongsTo(models.user)
    }

    return Service;
}