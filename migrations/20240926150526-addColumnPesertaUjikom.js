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
    await queryInterface.addColumn('PesertaUjikoms', 'skemaUjikomId', { // Added the missing comma here
      type: Sequelize.INTEGER,
      references: {
        model: 'SkemaUjikoms', // Table name
        key: 'id' // Column name
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('PesertaUjikoms', 'skemaUjikomId'); // No need to repeat the column definition
  }
};
