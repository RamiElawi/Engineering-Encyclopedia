// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');
// const userCourse=sequelize.define('userCourse',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     rate:{
//         type:Sequelize.DOUBLE
//     }
// })
// module.exports=userCourse; 


module.exports=(sequelize,DataTypes)=>{
    const user_course=sequelize.define('user_course',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        rate:{
            type:DataTypes.DOUBLE
        }
    })

    user_course.assocaite=models=>{
        user_course.belongsTo(models.user)
        user_course.belongsTo(models.course)
    }

    return user_course;
}

