var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var URL = require('url'); //引入URL中间件，获取req中的参数需要

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});
router.get('/register', function(req, res, next) {
	res.render('register');
});
router.get('/login', function(req, res, next) {
	res.render('login');
});
router.get('/logout', function(req, res, next) {
	delete req.session.user;//退出删除sessions
	res.redirect('/');
});
module.exports = router;
