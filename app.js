/**
 * Module dependencies.
 */

var express = require('express'), 
routes = require('./routes'), 
kids = require('./routes/kids'), 
http = require('http'), path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('S3CRE7'));
app.use(express.cookieSession());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post("/verifyLogin", routes.verifyLogin);
app.get('/listKids', kids.listKids);
app.post('/saveKid', kids.saveKid);
app.post("/deleteKid", kids.deleteKid);
app.post("/setKidId", kids.setKidId);
app.post("/logout", function(req, res) {
	req.session = null;
	res.send("Loged Out");
});

// Create default user if is not created



http.createServer(app).listen(app.get('port'), function() {
	/*Users.find({
		userName : 'admin@gmail.com'
	}, function(error, users) {
		if (users.length === 0) {
			var newUser = new Users({
				"userName" : "admin@gmail.com",
				"password" : "admin"
			});
			console.log(newUser);
			newUser.save(function(error, result) {
				if (error !== null) {
					console.log(error);
				}
			});
		}

	});*/
	console.log('Express server listening on port ' + app.get('port'));
});
