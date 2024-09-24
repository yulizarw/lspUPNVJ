'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PesertaUjikoms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaPeserta: {
        type: Sequelize.STRING
      },
      lat:{
        type:Sequelize.STRING
      },
      long:{
        type:Sequelize.STRING
      },
      apl01: {
        type: Sequelize.STRING
      },
      apl02: {
        type: Sequelize.STRING
      },
      frAK01: {
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
    await queryInterface.dropTable('PesertaUjikoms');
  }
};