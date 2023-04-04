// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');
// const user_project=sequelize.define('project_STL',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     }
// })
// module.exports=user_project;

module.exports=(sequelize,DataTypes)=>{
    const project_stl=sequelize.define('project_stl',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        }
    },{timestamps:false,freezeTableName:true})

    project_stl.associate=models=>{
        project_stl.belongsTo(models.Project);
        project_stl.belongsTo(models.STL);
        project_stl.belongsTo(models.user);
    }

    return project_stl;
}