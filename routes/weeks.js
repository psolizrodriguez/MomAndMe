/*
 * GET users listing.
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var WeekSchema = mongoose.Schema({
	"kid" : String,
	"description" : String,
	"order" : Number,
	"initialDate" : Date,
	"finalDate" : Date
});
var Week = mongoose.model("Weeks", WeekSchema);
exports.listWeeks = function(req, res) {
	var kid_id = req.session.kidSelected;
	console.log('kid_id = ' + kid_id);
	
	Week.find({ kid : kid_id}, function(error, listResult) {
		res.json(listResult);
	}).sort({'order':1});
};

function addDays(date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

exports.createWeeks = function(kidId, currentDate, resultsKids) {
	var weeksMax = 40;
	var weeksCounter = 1;
	while (weeksMax > 0) {
		var initial = new Date(currentDate).setDate(new Date(currentDate).getDate() - weeksMax * 7);
		var final = new Date(currentDate).setDate(new Date(currentDate).getDate() - (weeksMax - 1) * 7);
		var newWeek = new Week({
			"kid" : kidId,
			"description" : "Week " + weeksCounter,
			"order" : weeksCounter,
			"initialDate" : initial,
			"finalDate" : final
		});
		console.log(newWeek);
		newWeek.save(function(error, result) {
			if (error !== null) {
				console.log(error);
			}
		});
		weeksMax--;
		weeksCounter++;
	}
	return resultsKids;
};
