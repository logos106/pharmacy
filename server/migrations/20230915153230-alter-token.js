'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.addColumn('tokens', 'type', {
          type: Sequelize.ENUM('access', 'refresh', 'resetPassword', 'verifyEmail')
        }, { transaction }),
        queryInterface.addColumn('tokens', 'expires', {
          type: Sequelize.DATE
        }, { transaction }),
        queryInterface.addColumn('tokens', 'blacklisted', {
          type: Sequelize.BOOLEAN
        }, { transaction })
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.removeColumn('tokens', 'type', { transaction }),
        queryInterface.removeColumn('tokens', 'expires', { transaction }),
        queryInterface.removeColumn('tokens', 'blacklisted', { transaction })
      ]);
    });
  }
};
