'use strict';

const user = require('../models/user');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [{
            name: 'Jenn',
            email: 'hhwang0908@gmail.com',
            targetEmail: 'anthonybui@gmail.com',
            createdAt: new Date(),
            updatedAt: new Date(),
            password: 'jennifer'
        }], {});

        /*
        Add altering commands here.
        Return a promise to correctly handle asynchronicity.

        Example:
        return queryInterface.bulkInsert('Person', [{
            name: 'John Doe',
            isBetaMember: false
        }], {});
        */
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
        /*
        Add reverting commands here.
        Return a promise to correctly handle asynchronicity.

        Example:
        return queryInterface.bulkDelete('Person', null, {});
        */
    }
};
