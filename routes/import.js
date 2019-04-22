var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

/* 上传*/
router.post('/', function(req, res, next) {
	//生成multiparty对象，并配置上传目标路径
	var form = new multiparty.Form({
		uploadDir: './public/upload/'
	});
	//上传完成后处理
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);

		if (err) {
			console.log('parse error: ' + err);
		} else {
			console.log('parse files: ' + filesTmp);
			console.log(files)
			var inputFile = files.file[0];
			var uploadedPath = inputFile.path;
			var dstPath = './public/upload/' + inputFile.originalFilename;
			//重命名为真实文件名
			fs.rename(uploadedPath, dstPath, function(err) {
				if (err) {
					console.log('rename error: ' + err);
				} else {
					console.log('rename ok');
				}
			});
		}
		res.json({'success':'AAA'})
	});
});

module.exports = router;
