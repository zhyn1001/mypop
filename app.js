let db = require('./db/db');
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let favicon = require('express-favicon');
let logger = require('morgan');
let locals = require('./public/javascripts/locals.js');

let indexRouter = require('./routes/index');
let registerRouter = require('./routes/register');
let loginRouter = require('./routes/login');
let commentRouter = require('./routes/comment');
let importRouter = require('./routes/import');
let dbUrl = 'mongodb://localhost/db_project';

let app = express();
// locals(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');//设置模板引擎
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

app.use(function(req, res, next){
	if(req.url === '/login'){
		next()
	} else {
		if(req.session.user && req.session.user.username !== "") {
			app.locals['user'] = req.session.user
			next()
		} else {
			// res.redirect('/login')
			app.locals['user'] = {user:''}
			next()
		}
	}
})


app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/comment', commentRouter);
app.use('/import', importRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
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
