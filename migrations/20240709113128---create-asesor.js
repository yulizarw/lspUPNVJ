'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Asesors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaAsesor: {
        type: Sequelize.STRING
      },
      noRegMET:{
        type:Sequelize.STRING,
      },
      tahunAkhirRegMET:{
        type:Sequelize.DATE
      },
      jumlahMelaksanakanUjikom:{
        type:Sequelize.INTEGER
      },
      kumulatifMelakukanUjikom:{
        type:Sequelize.INTEGER
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
    await queryInterface.dropTable('Asesors');
  }
};