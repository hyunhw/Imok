'use strict';

const Checkin = require('../server/models').checkin;

module.exports = {
    create(req, res){
        return Checkin
            .create({
                checkedinAt: new Date(),
                userId: req.user.id
            })
            .then( () => { return res.redirect('/dashboard'); })
            .catch(error => res.status(400).send(error));
    },
    list(req, res){
        return Checkin
            .findAll({
                where: {
                    userId: req.user.id
                }
            })
            .then( checkins => {
                res.send(checkins); 
                return checkins;
            });
    }
};
