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

    Project.associate=models=>{
        Project.hasMany(models.File)
        Project.belongsToMany(models.user,{through:models.project_stl})
        Project.belongsToMany(models.STL,{through:models.project_stl})
    }
    return Project;
}