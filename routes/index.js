'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Log in' });
});

router.get('/signup', (req, res, next) => {
  res.render('signup', { title: 'Sign up' });
});

module.exports = router;
