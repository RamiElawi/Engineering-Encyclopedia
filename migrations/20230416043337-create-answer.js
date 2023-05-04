'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.createTable('answer', { 
      id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    content:{
        type:Sequelize.STRING,
        allowNull:false
    },
    questionId:{
        type:Sequelize.INTEGER,
        references:{
            model:'question',
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
    await queryInterface.dropTable('answer');
  }
};
