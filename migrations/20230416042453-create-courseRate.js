'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.createTable('courseRate', { 
    id:{
      type:Sequelize.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
  },
  rate:{
      type:Sequelize.DOUBLE
  },
  userId:{
      type:Sequelize.INTEGER,
      references:{
          model:'user',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'SET NULL'
  },
  courseId:{
      type:Sequelize.INTEGER,
      references:{
          model:'course',
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
    await queryInterface.dropTable('courseRate');
  }
};
