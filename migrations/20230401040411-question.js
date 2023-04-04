'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.createTable('question', { 
    id:{
      type:Sequelize.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
  },
  text:{
      type:Sequelize.STRING,
      allowNull:false,
  },
  rightAnswer:{
      type:Sequelize.INTEGER,
  },
  done:{
      type:Sequelize.BOOLEAN,
      defaultValue:false
  }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
    */
    await queryInterface.dropTable('question');
  }
};
