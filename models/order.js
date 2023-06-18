module.exports=(sequelize,DataTypes)=>{
    const order=sequelize.define('order',{    
        id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
      },
      orderId:{
        type:DataTypes.INTEGER
      },
      orderType:{
        type:DataTypes.ENUM('STL','Project')
      },
      color:{
        type:DataTypes.STRING
      },
      width:{
        type:DataTypes.DOUBLE
      },
      length:{
        type:DataTypes.DOUBLE
      },
      height:{
        type:DataTypes.DOUBLE
      },
      material:{
        type:DataTypes.STRING
      },
      address:{
        type:DataTypes.STRING
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
      ownerId:{
        type:DataTypes.INTEGER,
        references:{
          model:'user',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      },
      createdAt:{
        type:DataTypes.DATE
      }
    },{timestamps:false,freezeTableName:true})

    order.associate=models=>{
      order.belongsTo(models.user)
      order.belongsTo(models.user)
    }

    return order;
}