// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');
// const user_token=sequelize.define('user_token',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     token:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
    

// })

// module.exports=user_token;

module.exports=(sequelize,Sequelize)=>{
    const user_token=sequelize.define('user_token',{
        id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        token:{
            type:Sequelize.STRING,
            allowNull:false
        },
        UserId:{
            type:Sequelize.INTEGER
        }
    },{timestamps:false,freezeTableName:true})

    user_token.assocaite=models=>{
        user_token.belongsTo(models.user)
    }

    return user_token;
}