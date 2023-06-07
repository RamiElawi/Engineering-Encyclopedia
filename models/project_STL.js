module.exports=(sequelize,DataTypes)=>{
    const project_STL=sequelize.define('project_STL',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        stlId:{
            type:DataTypes.INTEGER
        },
        projectId:{
            type:DataTypes.INTEGER
        }
    },{timestamps:false,freezeTableName:true})

    project_STL.associate=models=>{
        project_STL.belongsTo(models.project)
        project_STL.belongsTo(models.STL)
    }

    return project_STL
}