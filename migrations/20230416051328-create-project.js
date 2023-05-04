'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.createTable('project', { 
    id:{
      type:Sequelize.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
  }
  ,projectName:{
      type:Sequelize.STRING,
      allowNull:false
  }
  ,description:{
      type:Sequelize.STRING,
      allowNull:false
  }
  ,projectImage:{
      type:Sequelize.STRING,
      allowNull:false
  },
  projectImageSTL:{
      type:Sequelize.STRING,
      allowNull:false
  }
  ,price:{
      type:Sequelize.DOUBLE
  },
  like:{
      type:Sequelize.INTEGER
  },
  length:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  width:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  height:{
    type:Sequelize.INTEGER,
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
    await queryInterface.dropTable('project');
  }
};
