'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.createTable('user_answer', { 
      id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    uesrId:{
        type:Sequelize.INTEGER,
        references:{
            model:'user',
            key:'id'
          },
          onUpdate:'CASCADE',
          onDelete:'SET NULL'
    },
    answerId:{
        type:Sequelize.INTEGER,
        references:{
            model:'answer',
            key:'id'
          },
          onUpdate:'CASCADE',
          onDelete:'SET NULL'
    }
     });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
    */
    await queryInterface.dropTable('user_answer');
  }
};
