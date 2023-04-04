// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');

// const user_course=sequelize.define('user_course',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     like:{
//         type:Sequelize.BOOLEAN,
//         defaultValue:false
//     }
// })

// module.exports=user_course;


module.exports=(sequelize,DataTypes)=>{
    const user_comment=sequelize.define('user_comment',{
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

    user_comment.assocaite=models=>{
        user_comment.belongsTo(models.user)
        user_comment.belongsTo(models.comment)
        user_comment.belongsTo(models.user_comment)
    }

    return user_comment;
}