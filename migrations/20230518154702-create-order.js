'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.createTable('order', { 
      id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
      },
      orderId:{
        type:Sequelize.INTEGER
      },
      orderType:{
        type:Sequelize.ENUM('STL','Project')
      },
      color:{
        type:Sequelize.STRING
      },
      width:{
        type:Sequelize.DOUBLE
      },
      length:{
        type:Sequelize.DOUBLE
      },
      height:{
        type:Sequelize.DOUBLE
      },
      material:{
        type:Sequelize.STRING
      },
      address:{
        type:Sequelize.STRING
      },
      userId:{
        type:Sequelize.INTEGER,
        references:{
          model:'user',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      }
     });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
    */
    await queryInterface.dropTable('order');
  }
};
