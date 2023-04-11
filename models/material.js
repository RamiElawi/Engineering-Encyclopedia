// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');
// const Material=sequelize.define('material',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     materialName:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     density:{
//         type:Sequelize.DOUBLE,
//         allowNull:false
//     }
// })
// module.exports=Material;


module.exports=(sequelize,DataTypes)=>{
    const Material=sequelize.define('Material',{
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
    
    Material.associate=models=>{
        Material.belongsToMany(models.STL,{through:models.MaterialStl})
    }

    return Material;
}

