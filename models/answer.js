module.exports=(sequelize,DataTypes)=>{
    const Answer=sequelize.define('answer',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        content:{
            type:DataTypes.STRING,
            allowNull:false
        },
        questionId:{
            type:DataTypes.INTEGER
        }
    },{timestamps:false,freezeTableName:true})
    Answer.assoicate=models=>{
        Answer.belongsTo(models.question)
        Answer.belongsToMany(models.user,{through:models.user_answer})
    }
    return Answer;
}