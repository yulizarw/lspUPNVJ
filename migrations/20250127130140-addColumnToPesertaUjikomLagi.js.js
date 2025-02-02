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

    await queryInterface.addColumn('PesertaUjikoms', 'fria08', { // Added the missing comma here
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('PesertaUjikoms', 'fria09', { // Added the missing comma here
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('PesertaUjikoms', 'fria10', { // Added the missing comma here
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('PesertaUjikoms', 'fria11', { // Added the missing comma here
      type: Sequelize.STRING,
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
    await queryInterface.removeColumn('PesertaUjikoms', 'fria08');
    await queryInterface.removeColumn('PesertaUjikoms', 'fria09');
    await queryInterface.removeColumn('PesertaUjikoms', 'fria10');
    await queryInterface.removeColumn('PesertaUjikoms', 'fria11');
  }
};
