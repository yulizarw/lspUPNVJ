'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FrAk01s', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      skemaSertifikasi: {
        type: Sequelize.STRING
      },
      tuk: {
        type: Sequelize.STRING
      },
      namaTuk: {
        type: Sequelize.STRING
      },
      namaAsesor: {
        type: Sequelize.STRING
      },
      namaPeserta: {
        type: Sequelize.STRING
      },
      usernamePeserta: {
        type: Sequelize.STRING
      },
      buktiDikumpulkan: {
        type: Sequelize.STRING
      },
      tanggalPelaksanaan: {
        type: Sequelize.DATE
      },
      waktuPelaksanaan: {
        type: Sequelize.STRING
      },
      tandaTanganAsesor: {
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
      skemaUjikomId:{
        type:Sequelize.INTEGER,
        references:{
          model:'SkemaUjikoms',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      tukId:{
        type:Sequelize.INTEGER,
        references:{
          model:'Tuks',
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
    await queryInterface.dropTable('FrAk01s');
  }
};