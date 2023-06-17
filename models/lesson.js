module.exports=(sequelize,DataTypes)=>{
    const Lesson=sequelize.define('lesson',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        lessonName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        Link:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lessonImage:{
            type:DataTypes.STRING,
            allowNull:false
        },
        like:{
            type:DataTypes.INTEGER
        },
        courseId:{
            type:DataTypes.INTEGER
        },
        lessonId:{
            type:DataTypes.INTEGER
        },
        done:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    },{timestamps:false,freezeTableName:true})
    Lesson.associate=models=>{
        Lesson.belongsTo(models.course)
        Lesson.hasMany(models.question)
        Lesson.hasMany(models.comment)
        Lesson.belongsToMany(models.user,{through:models.like,as:'likeUser',foreignKey:'likeableId',constraints:false,scope:{likeableType:'User'}})
        
    }


    return Lesson;
}