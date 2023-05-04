module.exports=(sequelize,DataTypes)=>{ 
    const Like=sequelize.define('like',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        likeableId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        likeableType:{
            type:DataTypes.ENUM('User','Lesson','Project','STL','Comment'),
            allowNull:false
        },
        userId:{
            type:DataTypes.INTEGER,
                references:{
                  model:'user',
                  key:'id'
                },
                onUpdate:'CASCADE',
                onDelete:'SET NULL'
            }
    },{timestamps:false,freezeTableName:true});

    Like.associate=models=>{
        Like.belongsTo(models.user)
    }

    return Like;
}