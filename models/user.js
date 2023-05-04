
module.exports=(sequelize,DataTypes)=>{
    const User=sequelize.define('user',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        firstName:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allwoNull:false
        },
        userImage:{
            type:DataTypes.STRING
        },
        role:{
            type:DataTypes.STRING,
        }
    },{timestamps:false,freezeTableName:true})
    
    User.associate=models=>{
        User.hasOne(models.refreshToken)
        User.hasMany(models.service)
        User.hasMany(models.course)
        User.belongsToMany(models.course,{through:models.courseRate})
        User.belongsToMany(models.answer,{through:models.user_answer})
        User.hasMany(models.comment)
        User.hasMany(models.STL)
        User.hasMany(models.project)
        User.belongsToMany(models.STL,{through:models.like,as:'likeSTL',foreignKey:'likeableId',constraints:false,scope:{likeableType:'STL'}})
        User.belongsToMany(models.project,{through:models.like,as:'likeProject',foreignKey:'likeableId',constraints:false,scope:{likeableType:'Project'}})
        User.belongsToMany(models.lesson,{through:models.like,as:'likeLesson',foreignKey:'likeableId',constraints:false,scope:{likeableType:'Lesson'}})
        User.belongsToMany(models.comment,{through:models.like,as:'likeComment',foreignKey:'likeableId',constraints:false,scope:{likeableType:'Comment'}})
    }


    return User
}