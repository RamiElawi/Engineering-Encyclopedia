'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.createTable('comment', { 
    id:{
      type:Sequelize.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
  },
  description:{
      type:Sequelize.STRING
  },
  like:{
      type:Sequelize.INTEGER
  },
  lessonId:{
      type:Sequelize.INTEGER,
      references:{
          model:'lesson',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'SET NULL'
  },
  userId:{
      type:Sequelize.INTEGER,
      references:{
          model:'user',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'SET NULL'
  },replayCommentId:{
    type:Sequelize.INTEGER,
    references:{
        model:'comment',
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
    await queryInterface.dropTable('comment');
  }
};
