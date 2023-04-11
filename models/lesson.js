// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');
// const Lesson=sequelize.define('lesson',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     lessonName:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     Link:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     description:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     lessonImage:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     like:{
//         type:Sequelize.INTEGER
//     },
//     unLike:{
//         type:Sequelize.INTEGER
//     }
// })
// module.exports=Lesson;

const db = require(".")


module.exports=(sequelize,DataTypes)=>{
    const Lesson=sequelize.define('Lesson',{
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
        unLike:{
            type:DataTypes.INTEGER
        },
        courseId:{
            type:DataTypes.INTEGER
        }
    },{timestamps:false,freezeTableName:true})

    Lesson.associate=models=>{
        Lesson.belongsTo(models.Course)
        Lesson.belongsToMany(models.user,{through:models.user_lesson})
    }
    return Lesson;
}

