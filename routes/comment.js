var express = require('express');
var router = express.Router();
var Comment = require('../model/comment');

router.get('/', function(req, res, next) {
	Comment.find({},function(err,docs){
		res.render('comment',{list:docs});
	})
	
});
router.post('/submit',function(req, res, next){
	if(req.session.user && req.session.user.username !== "") {
		var comment = new Comment({
			username:req.session.user.username,
			comment:req.body.comment,
			commentDate:new Date()
		})
		comment.save(function(err){
			if(!err) {
				res.redirect('/comment')
			}
		})
	} else {
		res.send("<script>alert('请登录后再评论');location.href='/login'</script>")
	}
})

router.get('/search', function(req, res, next){
	Comment.find({},function(err,docs){
		console.log(docs)
	})
})

module.exports = router;