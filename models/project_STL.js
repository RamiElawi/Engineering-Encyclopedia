module.exports=(sequelize,DataTypes)=>{
    const project_STL=sequelize.define('project_STL',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        stlId:{
            type:DataTypes.INTEGER,
            references:{
                model:'STL',
                key:'id'
              },
              onUpdate:'CASCADE',
              onDelete:'SET NULL'
        },
        projectId:{
            type:DataTypes.INTEGER,
            references:{
                model:'project',
                key:'id'
              },
              onUpdate:'CASCADE',
              onDelete:'SET NULL'
        }
    },{timestamps:false,freezeTableName:true})

    project_STL.associate=models=>{
        project_STL.belongsTo(models.project)
        project_STL.belongsTo(models.STL)
    }

    return project_STL
}