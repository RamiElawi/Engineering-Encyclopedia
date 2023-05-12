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
            type:DataTypes.INTEGER,
            references:{
                model:'lesson',
                key:'id'
              },
              onUpdate:'CASCADE',
              onDelete:'SET NULL'
        },
        userId:{
            type:DataTypes.INTEGER,
            references:{
                model:'user',
                key:'id'
              },
              onUpdate:'CASCADE',
              onDelete:'SET NULL'
        },replayCommentId:{
          type:DataTypes.INTEGER,
          references:{
              model:'comment',
              key:'id'
            },
            onUpdate:'CASCADE',
            onDelete:'SET NULL'
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