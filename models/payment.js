module.exports=(sequelize,DataTypes)=>{
    const payment=sequelize.define('payment',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
          },
          userId:{
            type:DataTypes.INTEGER,
            references:{
              model:'user',
              key:'id'
            },
            onDelete:'SET NULL',
            onUpdate:'CASCADE'
          },
          courseId:{
            type:DataTypes.INTEGER,
            references:{
              model:'course',
              key:'id'
            },
            onDelete:'SET NULL',
            onUpdate:'CASCADE'
          },
          createdAt:{
            type:DataTypes.DATE
          }
    },{timestamps:false,freezeTableName:true})

    payment.associate=models=>{
        payment.belongsTo(models.course)
        payment.belongsTo(models.user)
    }

    return payment;
}