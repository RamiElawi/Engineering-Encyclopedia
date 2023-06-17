'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn('user','resetToken',{type:Sequelize.STRING})
    .then(()=>{
      return queryInterface.addColumn('user','resetTokenExpiration',{type:Sequelize.DATE})
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn('user','resetToken')
    .then(()=>{
      return queryInterface.removeColumn('user','resetTokenExpiration')
    })
  }
};
