// const {Sequelize,DataTypes}=require('sequelize');
// const sequelize=require('../util/database');
// const materialStl=sequelize.define('materialSTL',{
//     id:{
//         type:DataTypes.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     }
// })
// module.exports=materialStl;


module.exports=(sequelize,DataTypes)=>{
    const MaterialStl=sequelize.define('MaterialStl',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        materialId:{
            type:DataTypes.INTEGER
        },
        stlId:{
            type:DataTypes.INTEGER
        }
    },{timestamps:false,freezeTableName:true})

    MaterialStl.associate=models=>{
        MaterialStl.belongsTo(models.Material);
        MaterialStl.belongsTo(models.STL);
    }

    return MaterialStl;
}

