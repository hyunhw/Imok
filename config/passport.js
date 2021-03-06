'use strict';

const LocalStrategy = require('passport-local').Strategy;
const User = require('../server/models').user;

module.exports = (passport) => {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id)
            .then( (user) => {
                if (user) {
                    done(null, user.get());
                } else {
                    done(user.errors, null);
                }
            });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        User
            .find({ where: { email: email } })
            .then( user => {
                // if the user email is taken..
                if (user) {
                    return done(null, false, req.flash('signupError', 'This email is already taken.'));
                }
                User.create({
                    name: req.body.name,
                    email: email,
                    targetEmail: req.body.targetEmail,
                    password: password
                })
                .then( user => {
                    return done(null, user);   
                });
            });
    }
    ));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, (req, email, password, done) => {
        User
            .find({ where: { email: email } })
            .then( user => {
                if (!user) {
                    return done(null, false, req.flash('incorrectLogin', 'Invalid email address.'));
                }
                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('incorrectLogin', 'Mismatching email / password.' ));
                }
                return done(null, user, req.flash('signedIn', 'You are signed in as ' + user.email));
            });
    }
    ));
};
