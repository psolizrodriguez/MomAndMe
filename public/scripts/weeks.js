var callBack;
var callBackDelete;
var deleteMessage;
$(function() {
	refreshListChildren();
});
function refreshListChildren() {
	$.post("listWeeks",{}, function(response) {
		buildNote(response);
	});
}

function getFormattedDate(date) {
	var year = date.getFullYear();
	var month = (1 + date.getMonth()).toString();
	month = month.length > 1 ? month : '0' + month;
	var day = date.getDate().toString();
	day = day.length > 1 ? day : '0' + day;
	return month + '/' + day + '/' + year;
}

function buildNote(data) {
	$("#accordionWeeks").empty();
	for (var int = 0; int < data.length; int++) {
		var array_element = data[int];
		var aStart = new Date(array_element.initialDate);
		var aEnd = new Date(array_element.finalDate);
		var weekName = array_element.description + " (" + getFormattedDate(aStart) + " - " + getFormattedDate(aEnd) + ")";
		var title = $('<h3>').html(weekName);
		$("#accordionWeeks").append(title);
		var record = $('<div>');
		var currentTime = new Date();
		if (aStart.getTime() < currentTime.getTime() && currentTime.getTime() < aEnd.getTime()) {
			record.addClass("selectedWeek");
			record.html('Current Week');
		}
		$("#accordionWeeks").append(record);
		
	}
	$("#accordionWeeks").accordion();

}