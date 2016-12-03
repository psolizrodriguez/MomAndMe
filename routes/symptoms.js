/*
 * GET users listing.
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var SymptomsSchema = mongoose.Schema({
	"title" : String,
	"imageUrl" : String,
	"content" : String
});
var Symptoms = mongoose.model("Symptoms", SymptomsSchema);

exports.listSymptoms = function(req, res) {
	Symptoms.find({}, function(error, kid) {
		// add some error checking...
		res.json(kid);
	});
};
