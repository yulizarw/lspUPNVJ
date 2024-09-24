'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FrAk06PeninjauanProses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaSkema: {
        type: Sequelize.STRING
      },
      tuk: {
        type: Sequelize.STRING
      },
      namaAsesor: {
        type: Sequelize.STRING
      },
      tanggalPelaksanaan: {
        type: Sequelize.STRING
      },
      rencanaAsesmen: {
        type: Sequelize.STRING
      },
      persiapanAsesmen: {
        type: Sequelize.STRING
      },
      implementasiAsesmen: {
        type: Sequelize.STRING
      },
      keputusanAsesmen: {
        type: Sequelize.STRING
      },
      umpanBalikAsesmen: {
        type: Sequelize.STRING
      },
      rekomendasiPeningkatan: {
        type: Sequelize.STRING
      },
      konsistensiKeputusanAsesmen: {
        type: Sequelize.STRING
      },
      namaPeninjau: {
        type: Sequelize.STRING
      },
      tangalPeninjauan: {
        type: Sequelize.DATE
      },
      komentar: {
        type: Sequelize.STRING
      },
      asesorId:{
        type:Sequelize.INTEGER,
        references:{
          model:'Asesors',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      skemaUjikomId:{
        type:Sequelize.INTEGER,
        references:{
          model:'SkemaUjikoms',
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
    await queryInterface.dropTable('FrAk06PeninjauanProses');
  }
};