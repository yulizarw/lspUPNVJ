'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BuktiPortfolios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pasfoto: {
        type: Sequelize.STRING
      },
      identitasPribadi: {
        type: Sequelize.STRING
      },
      buktiPendidikan: {
        type: Sequelize.STRING
      },
      buktiPelatihan: {
        type: Sequelize.STRING
      },
      buktiPengalamanKerja: {
        type: Sequelize.STRING
      },
      portfolio: {
        type: Sequelize.STRING
      },
      pesertaUjikomId:{
        type:Sequelize.INTEGER,
        references:{
          model:'PesertaUjikoms',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
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
    await queryInterface.dropTable('BuktiPortfolios');
  }
};