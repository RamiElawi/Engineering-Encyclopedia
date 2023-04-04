// const sequelize=require('../util/database');
// const Sequelize=require('sequelize');
// const Answer=sequelize.define('answer',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
//     content:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// })

// module.exports=Answer;

module.exports=(sequelize,DataTypes)=>{
    const answer=sequelize.define('answer',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        content:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })

    answer.associate=models=>{
        answer.belongsTo(models.question);
    }

    return answer;

}