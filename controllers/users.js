'use strict';

const User = require('../server/models').user;

module.exports = {
    update(req, res) {
        return User
            // find user by their id 
            .findById(req.user.id)
            .then( user => {
                // if user isn't found.. *** This should never be hit***
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found'
                    });
                }
                // if the user wants to update their email
                if (user.email !== req.body.email) {
                    User.findOne({
                        where: {
                            id: { $ne: req.user.id },
                            email: req.body.email
                        }
                    })
                    .then( user2 => {
                        // if another user is using the email
                        if (user2) {
                            req.flash('updateError', 'This email is already taken.');
                            return res.redirect('/profile/update');
                        } else {
                            user.update({
                                    name: req.body.name || user.name,
                                    email: req.body.email || user.email,
                                    targetEmail: req.body.targetEmail || user.targetEmail,
                                    password: req.body.password || user.password
                                })
                                // .then(() => res.status(200).send(user)) // send back updated user
                                .catch((error) => res.status(400).send(error));
                            return res.redirect('/profile/update');
                        }
                    });
                } else {
                    user.update({
                        name: req.body.name || user.name,
                        targetEmail: req.body.targetEmail || user.targetEmail,
                        password: req.body.password || user.password
                    })
                    // .then(() => res.status(200).send(user)) // send back updated user
                        .catch((error) => res.status(400).send(error));
                    return res.redirect('/profile/update');
                } // end of if/else
            });

    }
};
