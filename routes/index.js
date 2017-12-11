'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController =  require('../controllers').users;
const checkinsController =  require('../controllers').checkins;

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
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true 
    })
);

/* GET dashboard page. */
router.get('/dashboard', function(req, res, next) {
    let locals = {};
    if (req.isAuthenticated()){
        locals.user = req.user;
        let checkins = checkinsController.list(req, res);
        console.log('check ins: ' + checkins);
        console.log(typeof(checkins));
        res.render('dashboard', locals);
    } else {
        res.redirect('/');
    }
});

/* POST checkin */
router.post('/dashboard', (req, res) => {
    //usersController.update;
    if (req.isAuthenticated()){
        checkinsController.create(req, res);
    } else {
        res.redirect('/');
    }
});

/* GET user profile */
router.get('/profile', (req, res) => {
    let locals = {};
    if (req.isAuthenticated()){
        locals.user = req.user;
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
        res.render('updateprofile', {locals: locals, message: req.flash('updateError')});
    } else {
        res.redirect('/');
    }
});

/* POST updated profile */
router.post('/profile/update', (req, res) => {
    //usersController.update;
    if (req.isAuthenticated()){
        usersController.update(req, res);
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
        successRedirect: '/dashboard',
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
