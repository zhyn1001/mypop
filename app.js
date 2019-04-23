var db = require('./db/db');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const favicon = require('express-favicon');
var session = require('express-session');
var logger = require('morgan');
var locals = require('./public/javascripts/locals.js');

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var commentRouter = require('./routes/comment');
var importRouter = require('./routes/import');
var dbUrl = 'mongodb://localhost/db_project';

var app = express();
// locals(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 处理表单数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(favicon(path.join(__dirname, '/public/favicon.ico')))

var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(session({
	resave: false, //添加 resave 选项
	saveUninitialized: true, //添加 saveUninitialized 选项
	secret: 'express',
	cookie : {
        maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
	store: new mongoStore({
		url: dbUrl,
		collection: 'sessions'
	})
}))

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/comment', commentRouter);
app.use('/import', importRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
