module.exports=(sequelize,DataTypes)=>{
    const material_STL=sequelize.define('material_STL',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        materialId:{
            type:DataTypes.INTEGER,
            references:{
                model:'material',
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

    material_STL.associate=models=>{
        material_STL.belongsTo(models.material)
        material_STL.belongsTo(models.STL)
    }

    return material_STL;
}