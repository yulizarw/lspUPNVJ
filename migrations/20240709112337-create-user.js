'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userRole: {
        type: Sequelize.STRING
      },
      userName: {
        type: Sequelize.STRING
      },
      userEmail: {
        type: Sequelize.STRING
      },
      userPassword: {
        type: Sequelize.STRING
      },
      userPhoto: {
        type: Sequelize.STRING
      },
      userDepartment: {
        type: Sequelize.STRING
      },
      userPhone: {
        type: Sequelize.DOUBLE
      },
      userBirthdate: {
        type: Sequelize.DATE
      },
      userDomisili: {
        type: Sequelize.STRING
      },
      sptAsesor: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};