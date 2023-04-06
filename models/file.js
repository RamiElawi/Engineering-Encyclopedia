// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');
// const File=sequelize.define('file',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     path:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// })
// module.exports=File;

module.exports=(sequelize,DataTypes)=>{
    const File=sequelize.define('File',{
        id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
        },
        path:{
        type:DataTypes.STRING,
        allowNull:false
        },
        stlId:{
            type:DataTypes.INTEGER
        },
        projectId:{
            type:DataTypes.INTEGER
        }
    },{timestamps:false,freezeTableName:true})

    File.associate=models=>{
        File.belongsTo(models.Project)
        File.belongsTo(models.STL)
    }
    return File;
}