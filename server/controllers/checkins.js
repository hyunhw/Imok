'use strict';

const checkin = require('../models').checkin;

module.exports = {
    create(req, res) {
        return checkin
            .create({
                checkedinAt: new Date(),
                userId: req.params.userId
            })
            .then(checkin => res.status(201).send(checkin))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return checkin
            .find({
                where: {
                    id: req.params.checkinId,
                    userId: req.params.userId,
                },
            })
            .then(checkin => {
                if (!checkin) {
                    return res.status(404).send({
                        message: 'checkin Not Found',
                    });
                }

                return checkin
                    .update({
                        checkedinAt: new Date() || checkin.checkedinAt
                    })
                    .then(updatedcheckin => res.status(200).send(updatedcheckin))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return checkin
            .find({
                where: {
                    id: req.params.checkinId,
                    userId: req.params.userId,
                },
            })
            .then(checkin => {
                if (!checkin) {
                    return res.status(404).send({
                        message: 'checkin Not Found',
                    });
                }

                return checkin
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};
