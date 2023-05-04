'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.createTable('project_STL', { 
      id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    stlId:{
        type:Sequelize.INTEGER,
        references:{
            model:'STL',
            key:'id'
          },
          onUpdate:'CASCADE',
          onDelete:'SET NULL'
    },
    projectId:{
        type:Sequelize.INTEGER,
        references:{
            model:'project',
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
    await queryInterface.dropTable('project_STL');
  }
};
