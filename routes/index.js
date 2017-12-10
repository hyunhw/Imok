'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController =  require('../controllers').users;

/* GET home page. */
router.get('/', function(req, res, next) {
    let locals = {};
    if (req.isAuthenticated()){
        locals.user = req.user;
    }
    res.render('index', locals);
});

/* GET login page */
router.get('/login', (req, res, next) => {
    let locals = {};
    if (req.isAuthenticated()){
        locals.user = req.user;
    }
    res.render('login', {locals: locals, message: req.flash('incorrectLogin') });
});

/* Auth, POST to login */
router.post('/login', passport.authenticate('local-login', 
    { 
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true 
    })
);

/* GET user profile */
router.get('/profile', (req, res) => {
    let locals = {};
    if (req.isAuthenticated()){
        locals.user = req.user;
        console.log('user: ' + Object.keys(req.user));
        res.render('profile', locals);
    } else {
        res.redirect('/');
    }
});

/* GET profile update */
router.get('/profile/update', (req, res) => {
    let locals = {};
    if (req.isAuthenticated()){
        locals.user = req.user;
        res.render('updateprofile', locals);
    } else {
        res.redirect('/');
    }
});

/* PUT updated profile */
router.post('/profile/update', (req, res) => {
    //usersController.update;
    if (req.isAuthenticated()){
        usersController.update(req, res);
        res.redirect('/profile');
    } else {
        res.redirect('/');
    }
});


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
    res.redirect('/');
});

module.exports = router;
