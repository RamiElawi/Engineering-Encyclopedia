'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.createTable('lesson', { 
      id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    lessonName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Link:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    lessonImage:{
        type:Sequelize.STRING,
        allowNull:false
    },
    like:{
        type:Sequelize.INTEGER
    },
    unLike:{
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
    await queryInterface.dropTable('lesson');
  }
};
