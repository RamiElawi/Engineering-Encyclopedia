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
    return queryInterface.addColumn('comment','createdAt',{
      type:Sequelize.DATE
    })
    .then(()=>{
      return  queryInterface.addColumn('course','createdAt',{
        type:Sequelize.DATE
      })
    })
    .then(()=>{
      return queryInterface.addColumn('order','createdAt',{
        type:Sequelize.DATE
      })
    })
    .then(()=>{
      return queryInterface.addColumn('payment','createdAt',{
        type:Sequelize.DATE
      })
    })
    .then(()=>{
      return queryInterface.addColumn('project','createdAt',{
        type:Sequelize.DATE
      })
    })
    .then(()=>{
      return queryInterface.addColumn('STL','createdAt',{type:Sequelize.DATE})
    })
  },

  async down (queryInterface, Sequelize) {
    /**p
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn('comment','createdAt')
    .then(()=>{
      return queryInterface.removeColumn('course','createdAt')
    })
    .then(()=>{
      return queryInterface.removeColumn('order','createdAt')
    })
    .then(()=>{
      return queryInterface.removeColumn('payment','createdAt')
    })
    .then(()=>{
      return queryInterface.removeColumn('project','createdAt')
    })
    .then(()=>{
      return queryInterface.removeColumn('STL','createdAt')
    })
  }
};
