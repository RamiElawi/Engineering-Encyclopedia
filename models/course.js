
module.exports=(sequelize,DataTypes)=>{
    const Course=sequelize.define('course',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        courseName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        },
        level:{
            type:DataTypes.STRING,
            allowNull:false
        },
        totalTime:{
            type:DataTypes.STRING
        },
        price:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        courseImage:{
            type:DataTypes.STRING,
            allowNull:false
        },
        rate:{
            type:DataTypes.DOUBLE
        },
        userId:{
            type:DataTypes.INTEGER,
        },
        lessonNumber:{
            type:DataTypes.INTEGER,
            defaultValue:0
        },
        createdAt:{
          type:DataTypes.DATE
        }
},{timestamps:false,freezeTableName:true})
    Course.associate=models=>{
        Course.belongsTo(models.user);
        Course.hasMany(models.lesson);
        Course.belongsToMany(models.user,{through:models.courseRate})
        Course.belongsToMany(models.user,{through:models.payment})
    }



    


    return Course;
}