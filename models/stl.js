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
        },
        image:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{timestamps:false,freezeTableName:true})

    STL.associate=models=>{
        STL.belongsToMany(models.project,{through:models.project_STL})
        STL.belongsTo(models.user)
        STL.belongsToMany(models.material,{through:models.material_STL})
        STL.hasMany(models.image)
        STL.hasMany(models.color)
        STL.belongsToMany(models.feature,{through:models.feature_STL})
        STL.belongsToMany(models.user,{through:models.like,as:'likeUser',foreignKey:'likeableId',constraints:false,scope:{likeableType:'User'}})
        STL.hasMany(models.file,{foreignKey:'fileabelId',constraints:false,scope:{fileableType:'STL'}})
        
    }

    return STL;
}