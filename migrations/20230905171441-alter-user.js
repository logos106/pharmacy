'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.addColumn('users', 'password', {
          type: Sequelize.STRING(100)
        }, { transaction }),
        queryInterface.addColumn('users', 'role', {
          type: Sequelize.STRING(20)
        }, { transaction }),
        queryInterface.addColumn('users', 'token', {
          type: Sequelize.STRING(500)
        }, { transaction }),
        queryInterface.addColumn('users', 'isActive', {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }, { transaction })
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.removeColumn('users', 'password', { transaction }),
        queryInterface.removeColumn('users', 'role', { transaction }),
        queryInterface.removeColumn('users', 'token', { transaction }),
        queryInterface.removeColumn('users', 'isActive', { transaction })
      ]);
    });
  }
};
