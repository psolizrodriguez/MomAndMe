$(function() {
	refreshListSymptoms();
});
function refreshListSymptoms() {
	$.getJSON("listSymptoms", function(response) {
		buildNote(response);
	});
}

function buildNote(data) {
	$(".note-output").empty();
	for (var int = 0; int < data.length; int++) {
		var array_element = data[int];
		$(".note-output").append($('<p>').html(array_element.title));
	}

}