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
                type:DataTypes.INTEGER,
                references:{
                  model:'STL',
                  key:'id'
                },
                onUpdate:'CASCADE',
                onDelete:'SET NULL'
              }
    },{timestamps:false,freezeTableName:true})

    Color.associate=models=>{
        Color.belongsTo(models.STL)
    }

    return Color;
}