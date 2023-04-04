// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');

// const user_lesson=sequelize.define('user_lesson',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     like:{
//         type:Sequelize.BOOLEAN
//     }
// })

// module.exports=user_lesson;


module.exports=(sequelize,DataTypes)=>{
    const user_lesson=sequelize.define('user_lesson',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        like:{
            type:DataTypes.BOOLEAN,
            defaultValue:0
        }
    })

    user_lesson.assocaite=models=>{
        user_lesson.belongsTo(models.user)
        user_lesson.belongsTo(models.lesson)
    }

    return user_lesson;
}