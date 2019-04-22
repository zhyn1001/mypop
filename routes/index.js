var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var URL = require('url'); //引入URL中间件，获取req中的参数需要

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.user){  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('index',{user : req.session.user});
    }else{
        // res.redirect('login');
		res.render('index',{user:'请登陆'})
    }
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
