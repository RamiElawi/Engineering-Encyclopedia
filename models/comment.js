module.exports=(sequelize,DataTypes)=>{
    const Comment=sequelize.define('comment',{
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
        },
        lessonId:{
            type:DataTypes.INTEGER
        },
        userId:{
            type:DataTypes.INTEGER
        },
        replayCommentId:{
          type:DataTypes.INTEGER
      }
    },{timestamps:false,freezeTableName:true})

    Comment.associate=models=>{
        Comment.belongsTo(models.user)
        Comment.belongsTo(models.lesson)
        Comment.belongsTo(models.comment,{foreignKey:'replayCommentId'})
        Comment.belongsToMany(models.user,{through:models.like,as:'likeUser',foreignKey:'likeableId',constraints:false,scope:{likeableType:'User'}})

    }

    return Comment;
}