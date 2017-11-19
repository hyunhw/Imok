'use strict';

const user = require('../models').user;
const checkin = require('../models').checkin;

module.exports = {
    // need to do unique email verification stuff?
    create(req, res) {
        return user
            .create({
                name: req.body.name,
                email: req.body.email,
                targetEmail: req.body.targetEmail,
                password: req.body.password
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return user
            .findAll({
                include: [{
                    model: checkin,
                    as: 'checkins'
                }]
            })
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return user
            .findById(req.params.userId, {
                include: [{
                    model: checkin,
                    as: 'checkins'
                }]
            })
            .then( user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found'
                    });
                }
                return res.status(200).send(user);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return user
            .findById(req.params.userId, {
                include: [{
                    model: checkin,
                    as: 'checkins'
                }]
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found'
                    });
                }
                return user
                    .update({
                        name: req.body.name || user.name,
                        email: req.body.email || user.email,
                        targetEmail: req.body.targetEmail || user.targetEmail,
                        password: req.body.password || user.password
                    })
                    .then(() => res.status(200).send(user)) // send back updated user
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    destroy(req, res) {
        return user
            .findById(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found'
                    });
                }
                return user
                    .destroy()
                    .then(() => res.status(204).send({ message: 'User deleted successfully.' }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};
