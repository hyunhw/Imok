'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page */
router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Log in' });
});

/* Auth, POST to login */
router.post('/login',
    passport.authenticate('local-login', 
        { 
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true 
        })
);

/* GET signup page */
router.get('/signup', (req, res, next) => {
  res.render('signup', { title: 'Sign up' });
});

module.exports = router;
