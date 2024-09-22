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
          model:'RekamanAsesmens',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      bandingUjikomId:{
        type:Sequelize.INTEGER,
        references:{
          model:'BandingUjikoms',
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