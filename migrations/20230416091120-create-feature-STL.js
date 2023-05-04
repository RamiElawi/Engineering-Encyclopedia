'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.createTable('feature_STL', { 
    id:{
      type:Sequelize.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
      },
      featureId:{
          type:Sequelize.INTEGER,
          references:{
              model:'feature',
              key:'id'
            },
            onUpdate:'CASCADE',
            onDelete:'SET NULL'
      },
      STLId:{
          type:Sequelize.INTEGER,
          references:{
              model:'STL',
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
    await queryInterface.dropTable('feature_STL');
  }
};
