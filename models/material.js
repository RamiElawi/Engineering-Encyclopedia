module.exports=(sequelize,DataTypes)=>{
    const material=sequelize.define('material',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        materialName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        density:{
            type:DataTypes.DOUBLE,
            allowNull:false
        }
    },{timestamps:false,freezeTableName:true})

    material.associate=models=>{
        material.belongsToMany(models.STL,{through:models.material_STL})
    }

    return material
}