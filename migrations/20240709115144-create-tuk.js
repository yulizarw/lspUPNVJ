'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tuks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaTUK: {
        type: Sequelize.STRING
      },
      lokasiTUK: {
        type: Sequelize.STRING
      },
      sptVerifikasiTUK: {
        type: Sequelize.STRING
      },
      rekamanVerifikasi: {
        type: Sequelize.STRING
      },
      skPenetapanTUK: {
        type: Sequelize.STRING
      },
      skemaUjikomId:{
        type:Sequelize.INTEGER,
        references:{
          model:'SkemaUjikoms',
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
    await queryInterface.dropTable('Tuks');
  }
};