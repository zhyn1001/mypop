module.exports = function(app){
	app.locals.appName = 'hello';
	app.locals.sayHello = function(){return 'world';}
}