'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.createTable('like', { 
      id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    likeableId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    likeableType:{
        type:Sequelize.ENUM('User','Lesson','Project','STL','Comment'),
        allowNull:false
    },
    userId:{
      type:Sequelize.INTEGER,
        references:{
          model:'user',
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
    await queryInterface.dropTable('like');
  }
};
