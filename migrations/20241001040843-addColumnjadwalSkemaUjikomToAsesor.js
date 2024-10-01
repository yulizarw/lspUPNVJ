'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Asesors', 'jadwalSkemaUjikomId', { // Added the missing comma here
      type: Sequelize.INTEGER,
      references: {
        model: 'JadwalSkemaUjikoms', // Table name
        key: 'id' // Column name
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Asesors', 'jadwalSkemaUjikomId'); // No need to repeat the column definition
  }
};
