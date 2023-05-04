module.exports=(sequelize,DataTypes)=>{
    const feature_STL=sequelize.define('feature_STL',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        featureId:{
            type:DataTypes.INTEGER,
            references:{
                model:'feature',
                key:'id'
              },
              onUpdate:'CASCADE',
              onDelete:'SET NULL'
        },
        stlId:{
            type:DataTypes.INTEGER,
            references:{
                model:'STL',
                key:'id'
              },
              onUpdate:'CASCADE',
              onDelete:'SET NULL'
        }
    },{timestamps:false,freezeTableName:true})

    feature_STL.associate=models=>{
        feature_STL.belongsTo(models.feature)
        feature_STL.belongsTo(models.STL)
    }

    return feature_STL;
}