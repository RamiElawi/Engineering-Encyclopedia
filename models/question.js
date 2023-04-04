// const sequelize=require('../util/database');
// const Sequelize=require('sequelize');
// const Question=sequelize.define('question',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     text:{
//         type:Sequelize.STRING,
//         allowNull:false,
//     },
//     rightAnswer:{
//         type:Sequelize.INTEGER,
//     },
//     done:{
//         type:Sequelize.BOOLEAN,
//         defaultValue:false
//     }
// })

// module.exports=Question;


module.exports=(sequelize,DataTypes)=>{
    const question=sequelize.define('question',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        text:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        rightAnswer:{
            type:DataTypes.INTEGER,
        },
        done:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    })

    question.associate=models=>{
        question.belongsTo(models.Lesson)
    }

    return question;
}