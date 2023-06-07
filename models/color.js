module.exports=(sequelize,DataTypes)=>{
    const Color=sequelize.define('color',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
            },
            colorName:{
                type:DataTypes.STRING,
                allowNull:false
            },
            stlId:{
                type:DataTypes.INTEGER
              }
    },{timestamps:false,freezeTableName:true})

    Color.associate=models=>{
        Color.belongsTo(models.STL)
    }

    return Color;
}