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
    return queryInterface.addColumn('user_token','UserId',{
      type:Sequelize.INTEGER,
      references:{
        model:'users',
        key:'id'
      },
      onUpdate:'CASCADE',
      onDelete:'SET NULL'
    })
    .then(()=>{
      return queryInterface.addColumn('project_stl','userId',{
        type:Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('project_stl','projectId',{
        type:Sequelize.INTEGER,
        references:{
          model:'project',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('project_stl','stlId',{
        type:Sequelize.INTEGER,
        references:{
          model:'STL',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('project_stl','stlLike',{
        type:Sequelize.BOOLEAN,
        defaultValue:false
      })
    })
    .then(()=>{
      return queryInterface.addColumn('project_stl','projectLike',{
        type:Sequelize.BOOLEAN,
        defaultValue:false
      })
    })
    .then(()=>{
      return queryInterface.addColumn('file','projectId',{
        type:Sequelize.INTEGER,
        references:{
          model:'project',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('file','STLId',{
        type:Sequelize.INTEGER,
        references:{
          model:'STL',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('image','STLId',{
        type:Sequelize.INTEGER,
        references:{
          model:'STL',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('materialStl','STLId',{
        type:Sequelize.INTEGER,
        references:{
          model:'STL',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('materialStl','materialId',{
        type:Sequelize.INTEGER,
        references:{
          model:'material',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('user_course','userId',{
        type:Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('user_course','courseId',{
        type:Sequelize.INTEGER,
        references:{
          model:'course',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('lesson','courseId',{
        type:Sequelize.INTEGER,
        references:{
          model:'course',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('user_lesson','lessonId',{
        type:Sequelize.INTEGER,
        references:{
          model:'lesson',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('user_lesson','userId',{
        type:Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('question','lessonId',{
        type:Sequelize.INTEGER,
        references:{
          model:'lesson',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('answer','questionId',{
        type:Sequelize.INTEGER,
        references:{
          model:'question',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('user_answer','answerId',{
        type:Sequelize.INTEGER,
        references:{
          model:'answer',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('user_answer','userId',{
        type:Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('service','userId',{
        type:Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('comment','lessonId',{
        type:Sequelize.INTEGER,
        references:{
          model:'lesson',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('user_comment','commentId',{
        type:Sequelize.INTEGER,
        references:{
          model:'comment',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('user_comment','userId',{
        type:Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('user_comment','userCommentId',{
        type:Sequelize.INTEGER,
        references:{
          model:'user_comment',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('chat','userId',{
        type:Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('chat','userId1',{
        type:Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('message','userId',{
        type:Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
    .then(()=>{
      return queryInterface.addColumn('message','chatId',{
        type:Sequelize.INTEGER,
        references:{
          model:'chat',
          key:'id'
        },
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
      })
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn('user_token','UserId')
    .then(()=>{
      return queryInterface.removeColumn('project_stl','userId')
    })
    .then(()=>{
      return queryInterface.removeColumn('project_stl','projectId')
    })
    .then(()=>{
      return queryInterface.removeColumn('project_stl','stlId')
    })
    .then(()=>{
      return queryInterface.removeColumn('project_stl','stlLike')
    })
    .then(()=>{
      return queryInterface.removeColumn('project_stl','projectLike')
    })
    .then(()=>{
      return queryInterface.removeColumn('file','projectId')
    })
    .then(()=>{
      return queryInterface.removeColumn('file','stlId')
    })
    .then(()=>{
      return queryInterface.removeColumn('image','stlId')
    })
    .then(()=>{
      return queryInterface.removeColumn('materialStl','stlId')
    })
    .then(()=>{
      return queryInterface.removeColumn('materialStl','materialId')
    })
    .then(()=>{
      return queryInterface.removeColumn('user_course','userId')
    })
    .then(()=>{
      return queryInterface.removeColumn('user_course','courseId')
    })
    .then(()=>{
      return queryInterface.removeColumn('lesson','courseId')
    })
    .then(()=>{
      return queryInterface.removeColumn('user_lesson','lessonId')
    })
    .then(()=>{
      return queryInterface.removeColumn('user_lesson','userId')
    })
    .then(()=>{
      return queryInterface.removeColumn('question','lessonId')
    })
    .then(()=>{
      return queryInterface.removeColumn('answer','questionId')
    })
    .then(()=>{
      return queryInterface.removeColumn('user_answer','answerId')
    })
    .then(()=>{
      return queryInterface.removeColumn('user_answer','userId')
    })
    .then(()=>{
      return queryInterface.removeColumn('service','userId')
    })
    .then(()=>{
      return queryInterface.removeColumn('comment','lessonId')
    })
    .then(()=>{
      return queryInterface.removeColumn('user_comment','commentId')
    })
    .then(()=>{
      return queryInterface.removeColumn('user_comment','userId')
    })
    .then(()=>{
      return queryInterface.removeColumn('user_comment','userCommentId')
    })
    .then(()=>{
      return queryInterface.removeColumn('chat','userId')
    })
    .then(()=>{
      return queryInterface.removeColumn('chat','userId1')
    })
    .then(()=>{
      return queryInterface.removeColumn('message','userId')
    })
    .then(()=>{
      return queryInterface.removeColumn('message','chatId')
    })
  }
};
