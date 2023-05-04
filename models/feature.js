module.exports=(sequelize,DataTypes)=>{
    const Feature=sequelize.define('feature',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
            },
            featureName:{
                type:DataTypes.STRING,
                allowNull:false
            }
    },{timestamps:false,freezeTableName:true})

    Feature.associate=models=>{
        Feature.belongsToMany(models.STL,{through:models.feature_STL})
    }

    return Feature
}