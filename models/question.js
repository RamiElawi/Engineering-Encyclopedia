module.exports=(sequelize,DataTypes)=>{
    const Question=sequelize.define('question',{
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
        lessonId:{
            type:DataTypes.INTEGER,
            references:{
                model:'lesson',
                key:'id'
            },
            onUpdate:'CASCADE',
            onDelete:'SET NULL'
        }
    },{timestamps:false,freezeTableName:true})
    
    Question.associate=models=>{
        Question.belongsTo(models.lesson);
        Question.hasMany(models.answer);
    }


    return Question;
}