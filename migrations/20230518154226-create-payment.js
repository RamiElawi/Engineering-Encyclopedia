'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.createTable('payment', { 
      id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
      },
      userId:{
        type:Sequelize.INTEGER,
        references:{
          model:'user',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      },
      courseId:{
        type:Sequelize.INTEGER,
        references:{
          model:'course',
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
    await queryInterface.dropTable('payment');
  }
};
