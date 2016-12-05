/*
 * GET users listing.
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var SymptomsSchema = mongoose.Schema({
	"title" : String,
	"content" : String
});
var Symptoms = mongoose.model("symptoms", SymptomsSchema);

exports.listSymptoms = function(req, res) {
	var letter = req.body.letter;
	letter = new RegExp('^'+letter);
	console.log(letter);
	Symptoms.find({"title" : letter }, function(error, kid) {
		// add some error checking...
		res.json(kid);
	});
};
