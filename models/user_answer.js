// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');

// const user_answer=sequelize.define('user_answer',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     }
// })

// module.exports=user_answer;


module.exports=(sequelize,DataTypes)=>{
    const user_answer=sequelize.define('user_answer',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        }
    })

    user_answer.assocaite=models=>{
        user_answer.belongsTo(models.user)
        user_answer.belongsTo(models.answer)
    }

    return user_answer;
}