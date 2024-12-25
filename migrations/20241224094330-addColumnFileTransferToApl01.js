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
    await queryInterface.addColumn('Apl01s', 'fileName', { // Added the missing comma here
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('Apl01s', 'path', { // Added the missing comma here
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('Apl01s', 'mimeType', { // Added the missing comma here
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
    await queryInterface.removeColumn('Apl01s','fileName');
    await queryInterface.removeColumn('Apl01s','path');
    await queryInterface.removeColumn('Apl01s','mimeType');

  }
};
