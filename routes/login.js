var express = require('express');
var mongoose = require('mongoose');//导入mongoose模块
var bcrypt = require('bcrypt');
var User = require('../model/user');
var router = express.Router();

router.get('/', function(req, res, next){
	res.render('login');
})
router.post('/', function(req, res, next){
	var _username = req.body.username;
	var _password = req.body.password;
	User.find({'username':req.body.username},function(err,docs){
		if(err){
			res.send(500);
		}
		let doc = docs[0]
		if(docs.length==0){
			res.send('用户不存在');
		} else {
			if( bcrypt.compareSync(_password,doc.password) ){
				var _user = {username:doc.username}
				req.session.user = _user;
				res.redirect('/');
			}else{
				res.send(`<div>密码输入错误,请重新登陆</div>`);
			}
		}
	})
})

module.exports = router;
