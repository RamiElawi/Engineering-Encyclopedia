'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
     await queryInterface.addColumn('course','lessonNumber',{
      type:Sequelize.INTEGER,
      defaultValue:0
     });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
    */
     await queryInterface.removeColumn('course','lessonNumber');
  }
};
