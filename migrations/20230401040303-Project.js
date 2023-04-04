'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
     await queryInterface.createTable('project', {
      id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    }
    ,projectName:{
        type:Sequelize.STRING,
        allowNull:false
    }
    ,description:{
        type:Sequelize.STRING,
        allowNull:false
    }
    ,projectImage:{
        type:Sequelize.STRING,
        allowNull:false
    }
    ,price:{
        type:Sequelize.DOUBLE
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
    await queryInterface.dropTable('project');
  }
};
