module.exports=(sequelize,DataTypes)=>{
    const File=sequelize.define('file',{
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
            fileName:{
                type:DataTypes.STRING,
                allowNull:false
            },
            fileabelId:{
                type:DataTypes.INTEGER,
                allowNull:false
            },
            fileableType:{
                type:DataTypes.ENUM('Project','STL'),
                allowNull:false
            }
    },{timestamps:false,freezeTableName:true})

    File.associate=models=>{
        File.belongsTo(models.STL,{foreignKey:'fileabelId',constraints:false})
        File.belongsTo(models.project,{foreignKey:'fileabelId',constraints:false})
    }

    return File;
}