'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UmpanBaliks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      frak03Umpan: {
        type: Sequelize.STRING
      },
      rekamanAsesmenId :{
        type:Sequelize.INTEGER,
        references:{
          model:'RekamanAsesmen',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      bandingUjikomId:{
        type:Sequelize.INTEGER,
        references:{
          model:'BandingUjikom',
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
    await queryInterface.dropTable('UmpanBaliks');
  }
};