/*
 * GET users listing.
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var NutritionSchema = mongoose.Schema({
	"type" : String,
	"week" : String,
	"description" : String
});
var Nutrition = mongoose.model("nutritions", NutritionSchema);

exports.listNutrition = function(req, res) {
	var type = req.body.type;
	var week = req.body.week;
	console.log(type + " - " + week);
	Nutrition.find({"type" : type, "week" : week }, function(error, nutritions) {
		console.log(nutritions[0]);
		res.json(nutritions[0]);
	});
};
