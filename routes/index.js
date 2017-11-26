'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    let locals = {};
    if (req.isAuthenticated()){
        console.log('inside is authenticated ' + req.user);
        locals.user = req.user;
    }
    res.render('index', locals);
});

/* GET login page */
router.get('/login', (req, res, next) => {
    let locals = {};
    if (req.isAuthenticated()){
        console.log('inside is authenticated ' + req.user);
        locals.user = req.user;
    }
    res.render('login', locals) ;
});

/* Auth, POST to login */
router.post('/login', passport.authenticate('local-login', 
    { 
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true 
    })
);

/* GET signup page */
router.get('/signup', (req, res, next) => {
    res.render('signup', { 
        title: 'Sign up',
        message: req.flash('signupError')
    });
});

/* Auth, POST to signup */
router.post('/signup', passport.authenticate('local-signup',
    {
        successRedirect: '/',
        failureRedirect:'/signup',
        failureFlash: true
    })
);

/* GET logout page */
router.get('/logout', (req, res) => {
    req.logout();
    res.render('index');
});

module.exports = router;
