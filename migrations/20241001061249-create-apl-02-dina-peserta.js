'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Apl02DinaPeserta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fieldName: {
        type: Sequelize.STRING
      },
      fieldQuestion: {
        type: Sequelize.STRING
      },
      fieldValue: {
        type: Sequelize.STRING
      },

      pesertaUjikomId: {
        type: Sequelize.INTEGER,
        references:{
          model:'PesertaUjikoms',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      apl02DynamicId: {
        type: Sequelize.INTEGER,
          references:{
            model:'Apl02Dynamics',
            key:'id'
          }
        
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Apl02DinaPeserta');
  }
};