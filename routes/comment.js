var express = require('express');
var router = express.Router();
var Comment = require('../model/comment');

router.get('/', function(req, res, next) {
	if(req.session.user){  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('comment',{user : req.session.user});
    }else{
        // res.redirect('login');
		res.render('comment',{user:'请登陆'})
    }
});
router.post('/submit',function(req, res, next){
	var comment = new Comment({
		username:"mingming",
		comment:req.body.comment,
		commentDate:new Date()
	})
	comment.save(function(err){
		if(!err) {
			res.redirect('/comment')
		}
	})
})

router.get('/search', function(req, res, next){
	Comment.find({},function(err,docs){
		console.log(docs)
	})
})

module.exports = router;