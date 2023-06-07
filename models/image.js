module.exports=(sequelize,DataTypes)=>{
    const Image=sequelize.define('image',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
            },
            path:{
            type:DataTypes.STRING,
            allowNull:false
            },
            stlId:{
                type:DataTypes.INTEGER
            }
    },{timestamps:false,freezeTableName:true})

    Image.associate=models=>{
        Image.belongsTo(models.STL)
    }

    return Image; 
}