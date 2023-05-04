module.exports=(sequelize,DataTypes)=>{
    const refreshToken=sequelize.define('refreshToken',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        token:{
            type:DataTypes.STRING,
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
    },{timestamps:false,freezeTableName:true})

    refreshToken.associate=models=>{
        refreshToken.belongsTo(models.user)
    }

    return refreshToken;
}