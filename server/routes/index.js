'use strict';

const usersController = require('../controllers').users;
const checkinsController = require('../controllers').checkins;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the users API!'
    }));

    app.post('/api/users', usersController.create);
    app.get('/api/users', usersController.list);

    app.get('/api/users/:userId', usersController.retrieve);
    app.put('/api/users/:userId', usersController.update);
    app.delete('/api/users/:userId', usersController.destroy);

    app.post('/api/users/:userId/checkins', checkinsController.create);
    app.put('/api/users/:userId/checkins/:checkinId', checkinsController.update);
    app.delete('/api/users/:userId/checkins/:checkinId', checkinsController.destroy);
};
