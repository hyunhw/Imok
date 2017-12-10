'use strict';

const User = require('../server/models').user;

module.exports = {
    update(req, res) {
        console.log('inside users controller');
        console.log('user: '+ req.user.id);
        return User
            // find user by its unique email
            .findById(req.user.id)
            // .find({ where: { email: req.body.email } })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found'
                    });
                }
                console.log('found user: ' + user );
                return user
                    .update({
                        name: req.body.name || user.name,
                        email: req.body.email || user.email,
                        targetEmail: req.body.targetEmail || user.targetEmail,
                        password: req.body.password || user.password
                    })
                    // .then(() => res.status(200).send(user)) // send back updated user
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
};
