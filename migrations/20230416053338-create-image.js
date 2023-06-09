'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.createTable('image', { 
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
        stlId:{
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
    await queryInterface.dropTable('image');
  }
};
