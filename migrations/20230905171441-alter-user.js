'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.addColumn('Users', 'password', {
          type: Sequelize.STRING(100)
        }, { transaction }),
        queryInterface.addColumn('Users', 'role', {
          type: Sequelize.STRING(20)
        }, { transaction }),
        queryInterface.addColumn('Users', 'token', {
          type: Sequelize.STRING(500)
        }, { transaction }),
        queryInterface.addColumn('Users', 'isActive', {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }, { transaction })
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'password', { transaction }),
        queryInterface.removeColumn('Users', 'role', { transaction }),
        queryInterface.removeColumn('Users', 'token', { transaction }),
        queryInterface.removeColumn('Users', 'isActive', { transaction })
      ]);
    });
  }
};
