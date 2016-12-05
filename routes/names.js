/*
 * GET users listing.
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var NamesSchema = mongoose.Schema({
	"user" : String,
	"description" : String,
	"rating" : String
});
var Names = mongoose.model("Names", NamesSchema);

exports.listNames = function(req, res) {
	Names.find({}, function(error, name) {
		// add some error checking...
		res.json(name);
	});
};

exports.saveName = function(req, res) {
	var newName = new Names({
		"user" : 'psolizrodriguez',
		"description" : req.body.description,
		"rating" : req.body.rating
	});
	console.log(newName);
	newName.save(function(error, result) {
		if (error !== null) {
			console.log(error);
			res.send("error reported");
		} else {
			Names.find({}, function(error, result) {
				// add some error checking...
				res.json(result);
			});
		}
	});
};
//Delete Name

exports.deleteName = function(req, res) {
	Names.remove({
		_id : req.body.id
	}, function(error) {
		if (error !== null) {
			console.log(error);
			res.send("error reported");
		} else {
			Names.find({}, function(error, result) {
				// add some error checking...
				res.json(result);
			});
		}
	});
};
//PossibleNames
var PossibleNamesSchema = mongoose.Schema({
	"name" : String,
	"meaning" : String
});
var PossibleNames = mongoose.model("PossibleNames", PossibleNamesSchema);

exports.listPossibleNames = function(req, res) {
	PossibleNames.find({}, function(error, possibleName) {
		// add some error checking...
		console.log(possibleName);
		res.json(possibleName);
	});
};
