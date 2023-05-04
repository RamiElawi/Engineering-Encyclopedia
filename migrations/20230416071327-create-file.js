'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.createTable('file', { 
      id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
        },
        path:{
        type:Sequelize.STRING,
        allowNull:false
        },
        fileName:{
            type:Sequelize.STRING,
            allowNull:false
        },
        fileabelId:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        fileableType:{
            type:Sequelize.ENUM('Project','STL'),
            allowNull:false
        }
     });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
    */
    await queryInterface.dropTable('file');
  }
};
