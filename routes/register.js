var express = require('express');
var mongoose = require('mongoose');//导入mongoose模块
var User = require('../model/user');
var router = express.Router();

router.get('/', function(req, res, next){
	res.render('register');
})
/* GET users listing. */
router.post('/', function(req, res, next) {
	// console.log(req.body.username)
	User.find({'username':req.body.username},function(err,docs){
		if(err){
			res.send(500);
		}else if(docs.length>0){
			res.send('用户已存在');
		} else {
			var user = new User({
				username:req.body.username,
				password:req.body.password,
				publishTime:new Date()
			})
			user.save(function(err){
				if(!err){
					console.log('save status:', err ? 'failed' : 'success');
				}
			})
			res.send(`<div>注册成功<a href="/">返回首页</><span>3</span>秒后跳转到首页</div>`);
		}
	})
});

module.exports = router;
