'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.createTable('course', {
      id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    courseName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    level:{
        type:Sequelize.STRING,
        allowNull:false
    },
    totalTime:{
        type:Sequelize.STRING
    },
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    courseImage:{
        type:Sequelize.STRING,
        allowNull:false
    },
    rate:{
        type:Sequelize.DOUBLE
    }
     });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
    */
    await queryInterface.dropTable('course');
  }
};
