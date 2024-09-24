'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FrAk05LaporanAsesmens', {
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
      namaPeserta: {
        type: Sequelize.STRING
      },
      rekomendasiNilai: {
        type: Sequelize.STRING
      },
      keteranganAsesmen: {
        type: Sequelize.STRING
      },
      aspekPelaksanaan: {
        type: Sequelize.STRING
      },
      catatanPenolakan: {
        type: Sequelize.STRING
      },
      saranPerbaikan: {
        type: Sequelize.STRING
      },
      tandaTanganAsesor: {
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
    await queryInterface.dropTable('FrAk05LaporanAsesmens');
  }
};