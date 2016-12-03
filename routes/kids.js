/*
 * GET users listing.
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/424db1');
var KidSchema = mongoose.Schema({
	"user" : String,
	"name" : String,
	"gender" : String,
	"dueDate" : Date
});
var Kid = mongoose.model("Kid", KidSchema);
exports.listKids = function(req, res) {
	Kid.find({}, function(error, kid) {
		// add some error checking...
		res.json(kid);
	});
};
exports.saveKid = function(req, res) {
	var newKid = new Kid({
		"user" : 'psolizrodriguez',
		"name" : req.body.name,
		"gender" : req.body.gender,
		"dueDate" : req.body.dueDate,
	});
	console.log(newKid);
	newKid.save(function(error, result) {
		if (error !== null) {
			console.log(error);
			res.send("error reported");
		} else {
			Kid.find({}, function(error, result) {
				// add some error checking...
				res.json(result);
			});
		}
	});
};

exports.deleteKid = function(req, res) {
	Kid.remove({
		_id : req.body.id
	}, function(error) {
		if (error !== null) {
			console.log(error);
			res.send("error reported");
		} else {
			Kid.find({}, function(error, result) {
				// add some error checking...
				res.json(result);
			});
		}
	});
};
exports.setKidId = function(req, res) {
	req.session.user = req.body.id;
	res.json(true);
};
