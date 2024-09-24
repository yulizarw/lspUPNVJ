'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Apl02Bases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaSkema: {
        type: Sequelize.STRING
      },
      pesertaUjikomId: {
        type:Sequelize.INTEGER,
        references:{
          model:'PesertaUjikoms',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'SET NULL'
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
    await queryInterface.dropTable('Apl02Bases');
  }
};