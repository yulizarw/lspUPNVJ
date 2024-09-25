'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SkemaUjikoms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaAsesor: {
        type: Sequelize.STRING
      },
      namaSkema: {
        type: Sequelize.STRING
      },
      nomorSkema: {
        type: Sequelize.STRING
      },
      sektorSkema: {
        type: Sequelize.STRING
      },
      jenisSkema: {
        type: Sequelize.STRING
      },
      kodeUnitKompetensi: {
        type: Sequelize.STRING
      },
      judulUnitKompetensi: {
        type: Sequelize.STRING
      },
      instrumenSkema: {
        type: Sequelize.STRING
      },
      peninjauanInstrumen: {
        type: Sequelize.STRING
      },
      userId:{
        type:Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'SET NULL'
      },
      asesorId:{
        type:Sequelize.INTEGER,
        references:{
          model:'Asesors',
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
    await queryInterface.dropTable('SkemaUjikoms');
  }
};