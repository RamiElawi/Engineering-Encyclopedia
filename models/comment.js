// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');
// const Comment=sequelize.define('comment',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     description:{
//         type:Sequelize.STRING
//     },
//     like:{
//         type:Sequelize.INTEGER
//     }
// });
// module.exports=Comment;

module.exports=(sequelize,DataTypes)=>{
    const Comment=sequelize.define('Comment',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        description:{
            type:DataTypes.STRING
        },
        like:{
            type:DataTypes.INTEGER
        }
    })

    Comment.associate=models=>{
        Comment.belongsTo(models.Lesson);
    }

    return Comment;

}