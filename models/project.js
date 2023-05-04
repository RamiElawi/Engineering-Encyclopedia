module.exports=(sequelize,DataTypes)=>{
    const Project=sequelize.define('project',{
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
        },
        projectImageSTL:{
            type:DataTypes.STRING,
            allowNull:false
        }
        ,price:{
            type:DataTypes.DOUBLE
        },
        like:{
            type:DataTypes.INTEGER
        },
        length:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        width:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        height:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        userId:{
            type:DataTypes.INTEGER,
            references:{
                model:'user',
                key:'id'
              },
              onUpdate:'CASCADE',
              onDelete:'SET NULL'
        }
    },{timestamps:false,freezeTableName:true})

    Project.associate=models=>{
        Project.belongsToMany(models.STL,{through:models.project_STL})
        Project.belongsTo(models.user)
        Project.belongsToMany(models.user,{through:models.like,as:'likeUser',foreignKey:'likeableId',constraints:false,scope:{likeableType:'User'}})
        Project.hasMany(models.file,{foreignKey:'fileabelId',constraints:false,scope:{fileableType:'Project'}})
    }

    return Project
}