$(function() {
	refreshListSymptoms();
});
var dataByLetter = {};
function refreshListSymptoms(letter) {
	if (letter == 'undefined' || letter == null) {
		letter = "A";
	}
	$.post("listSymptoms", {
		'letter' : letter
	}, function(response) {
		buildNote(response);
	});
}

function buildNote(data) {
	$(".note-output").empty();
	dataByLetter = {};
	for (var int = 0; int < data.length; int++) {
		var array_element = data[int];
		dataByLetter[array_element._id] = array_element;
		$(".note-output").append($('<p onclick="refreshingContent(\'' + array_element._id + '\')">').html(array_element.title));
	}
	$('#catalogContent').hide();
	$('#contentChildren').show();

}
function goBackToList() {
	$('#catalogContent').hide();
	$('#contentChildren').show();
	$('#backButton').hide();

}
function refreshingContent(id) {
	var currentArticle = dataByLetter[id];
	dataByLetter[currentArticle._id] = currentArticle;
	$('#symptomsTitle').html(currentArticle.title);
	// $('#symptomsImgUrl').attr('src', 'symptom_' + id);
	$('#imageContent').empty();
	$('#imageContent').append('<img class="symptomsImgUrl" src="../media/images/symptom_' + id + '.jpg"></img>');

	$('#symptomContent').html(currentArticle.content);

	$('#contentChildren').hide();
	$('#catalogContent').show();
	$('#backButton').show();
}