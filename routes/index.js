/*
 * GET home page.
 */

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db = mongoose.createConnection('mongodb://localhost/424db1');
var UsersSchema = mongoose.Schema({
	"userName" : String,
	"password" : String,
});
var Users = mongoose.model('Users', UsersSchema);

exports.index = function(req, res) {
	req.session.user = 'Percy';
	res.render('index', {
		title : 'Express'
	});
};

exports.verifyLogin = function(req, res) {
	console.log(req.body.userName);
	Users.find({
		userName : req.body.userName
	}, function(error, users) {
		console.log(users);
		if (users.length === 1) {
			res.json(users[0].password === req.body.password);
		}

	});
};