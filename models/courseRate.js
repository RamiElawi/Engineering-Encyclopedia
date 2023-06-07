module.exports=(sequelize,DataTypes)=>{
    const courseRate=sequelize.define('courseRate',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        rate:{
            type:DataTypes.DOUBLE
        },
        userId:{
            type:DataTypes.INTEGER,
        },
        courseId:{
            type:DataTypes.INTEGER
        }
    },{timestamps:false,freezeTableName:true})

    courseRate.associate=models=>{
        courseRate.belongsTo(models.user)
        courseRate.belongsTo(models.course)
    }

    return courseRate;
}