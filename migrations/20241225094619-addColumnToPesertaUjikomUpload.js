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
    await queryInterface.addColumn('PesertaUjikoms', 'portofolioAsesi', { // Added the missing comma here
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('PesertaUjikoms', 'mapa01', { // Added the missing comma here
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('PesertaUjikoms', 'mapa02', { // Added the missing comma here
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('PesertaUjikoms', 'frak04', { // Added the missing comma here
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('PesertaUjikoms', 'frak07', { // Added the missing comma here
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('PesertaUjikoms', 'fria01', { // Added the missing comma here
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('PesertaUjikoms', 'fria02', { // Added the missing comma here
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('PesertaUjikoms', 'fria03', { // Added the missing comma here
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('PesertaUjikoms', 'fria04a', { // Added the missing comma here
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('PesertaUjikoms', 'fria04b', { // Added the missing comma here
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('PesertaUjikoms', 'fria05', { // Added the missing comma here
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('PesertaUjikoms', 'fria06', { // Added the missing comma here
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('PesertaUjikoms', 'fria07', { // Added the missing comma here
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('PesertaUjikoms', 'frak02', { // Added the missing comma here
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('PesertaUjikoms', 'frak03', { // Added the missing comma here
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('PesertaUjikoms', 'frak05', { // Added the missing comma here
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('PesertaUjikoms', 'frak06', { // Added the missing comma here
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
    await queryInterface.removeColumn('PesertaUjikoms', 'portofolioAsesi');
    await queryInterface.removeColumn('PesertaUjikoms', 'mapa01');
    await queryInterface.removeColumn('PesertaUjikoms', 'mapa02');
    await queryInterface.removeColumn('PesertaUjikoms', 'frak04');
    await queryInterface.removeColumn('PesertaUjikoms', 'frak07');
    await queryInterface.removeColumn('PesertaUjikoms', 'fria01');
    await queryInterface.removeColumn('PesertaUjikoms', 'fria02');
    await queryInterface.removeColumn('PesertaUjikoms', 'fria03');
    await queryInterface.removeColumn('PesertaUjikoms', 'fria04a');
    await queryInterface.removeColumn('PesertaUjikoms', 'fria04b');
    await queryInterface.removeColumn('PesertaUjikoms', 'fria05');
    await queryInterface.removeColumn('PesertaUjikoms', 'fria06');
    await queryInterface.removeColumn('PesertaUjikoms', 'fria07');
    await queryInterface.removeColumn('PesertaUjikoms', 'frak02');
    await queryInterface.removeColumn('PesertaUjikoms', 'frak03');
    await queryInterface.removeColumn('PesertaUjikoms', 'frak05');
    await queryInterface.removeColumn('PesertaUjikoms', 'frak06');
  }
};
