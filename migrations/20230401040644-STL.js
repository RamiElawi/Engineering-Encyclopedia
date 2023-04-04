'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.createTable('STL', { 
    id:{
      type: Sequelize.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
  },
  stlName:{
      type:Sequelize.STRING,
      allowNull:false
  },
  description:{
      type:Sequelize.STRING,
      allowNull:false
  },
  height:{
      type:Sequelize.DOUBLE
  },
  width:{
      type:Sequelize.DOUBLE
  },
  size:{
      type:Sequelize.DOUBLE
  },
  length:{
      type:Sequelize.DOUBLE
  }
  ,price:{
      type:Sequelize.DOUBLE
  },
  stlImage:{
      type:Sequelize.STRING,
      allowNull:false
  },
  like:{
      type:Sequelize.INTEGER
  }
     });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
    */
     await queryInterface.dropTable('STL');
  }
};
