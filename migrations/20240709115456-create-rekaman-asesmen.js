'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RekamanAsesmens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      statusUjikom: {
        type: Sequelize.STRING
      },
      sertifikatUjikom: {
        type: Sequelize.STRING
      },
      skKomiteTeknis: {
        type: Sequelize.STRING
      },
      skHasilUjikom: {
        type: Sequelize.STRING
      },
      frak06Peninjauan: {
        type: Sequelize.STRING
      },
      laporanUjikom: {
        type: Sequelize.STRING
      },
      pesertaUjikomId :{
        type:Sequelize.INTEGER,
        references:{
          model:'PesertaUjikoms',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'SET NULL'
      },
      jadwalUjikomId:{
        type:Sequelize.INTEGER,
        references:{
          model:'JadwalUjikoms',
          key:'id'
        }
      },
      asesorId:{
        type:Sequelize.INTEGER,
        references:{
          model:'Asesors',
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
    await queryInterface.dropTable('RekamanAsesmens');
  }
};