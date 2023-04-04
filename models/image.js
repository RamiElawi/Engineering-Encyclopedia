const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const Images=sequelize.define('image',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    path:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
module.exports=Images;


module.exports=(sequelize,DataTypes)=>{
    const image=sequelize.define('image',{
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
    },{timestapms:false,freezeTableName:true})
    image.associate=models=>{
        image.belongsTo(models.STL)
    }
    return image;
}