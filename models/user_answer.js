const user = require("./user");

module.exports=(sequelize,DataTypes)=>{
    const user_answer=sequelize.define('user_answer',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        uesrId:{
            type:DataTypes.INTEGER
        },
        answerId:{
            type:DataTypes.INTEGER
        }
    },{timestamps:false,freezeTableName:true})

    user_answer.associate=models=>{
        user_answer.belongsTo(models.user)
        user_answer.belongsTo(models.answer)
    }

    return user_answer;
}