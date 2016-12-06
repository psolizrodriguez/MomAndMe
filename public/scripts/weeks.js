var callBack;
var callBackDelete;
var deleteMessage;
$(function() {
	initializeInsertKidDialog();
	initializeNutritionalNeeds();
	initializeShowImage();
	refreshListChildren();
	// $("#accordionWeeks").accordion();

});
function loadNutritionalInfo(type) {
	var selectedWeek = $('#selectedWeek').val();
	if (selectedWeek > 5) {
		selectedWeek = 5;
	}
	$("#" + type).toggle('fadeout', null, 500);
	$.post("/listNutrition", {
		"week" : selectedWeek,
		"type" : type
	}, function(response) {
		if (response.description == $('#' + type).html()) {
			$('#' + type).html(response.type);
		} else {
			$('#' + type).html(response.description);
		}
		$("#" + type).toggle('fadein', null, 500);
	});

}
function refreshListChildren() {
	$.post("listWeeks", {}, function(response) {
		buildNote(response);
	});
}
function initializeNutritionalNeeds() {
	$('#nutritionalNeeds').dialog({
		autoOpen : false,
		modal : true,
		height : 440,
		width : 522,
		resizable : false
	});
}

function initializeShowImage() {
	$('#showImage').dialog({
		autoOpen : false,
		modal : true,
		resizable : false
	});
}
function openNutritionalNeeds(week) {
	$('.ui-dialog-title').html("Nutritional Needs For Week " + week);
	$('#selectedWeek').val(week);
	var content = '<p id="protein" class="flex-item proteins" onclick="loadNutritionalInfo(\'protein\')">protein</p>'
			+ '<p id="fat" class="flex-item fats" onclick="loadNutritionalInfo(\'fat\')">fat</p>'
			+ '<p id="vegetable" class="flex-item vegetables" onclick="loadNutritionalInfo(\'vegetable\')">vegetable</p>'
			+ '<p id="calcium" class="flex-item calcium" onclick="loadNutritionalInfo(\'calcium\')">calcium</p>';
	$('#classNutritionalNeeds').empty();
	$('#classNutritionalNeeds').append(content);
	$('#nutritionalNeeds').dialog('open');
}

function lookForImage(week) {
	loadApp(week);
	$('#showImage').dialog('open');
}

function editComment(id) {
	$('.ui-dialog-title').html("Edit My Notes");
	$("#myNotes").val($('#' + id).html());
	callBack = {
		success : function() {
			var comment = $("#myNotes").val();
			var auxObject = {
				"id" : id,
				"comment" : comment
			};
			$.post("/updateComment", auxObject, function(response) {
				// update content of note
				console.log(response);
				//$('#' + id).html(response.description);
				$('#' + id).html(comment);
				
			});

		}
	};
	$('#editCommentForm').dialog('open');
}
function initializeInsertKidDialog() {
	$('#editCommentForm').dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		buttons : {
			'Save' : function() {

				if (null != callBack) {
					if (callBack.success) {
						callBack.success();
					}
				}
				$(this).dialog("close");
			},
			'Cancel' : function() {
				$(this).dialog("close");
			}
		}
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
	var accordionNumber = 0;
	var idToFocus = 0;
	for (var int = 0; int < data.length; int++) {
		var array_element = data[int];
		var aStart = new Date(array_element.initialDate);
		var aEnd = new Date(array_element.finalDate);
		var weekName = "Week " + array_element.order;
		var title = $('<h3>').html(weekName);
		$("#accordionWeeks").append(title);
		var record = $('<div>');
		var currentTime = new Date();
		if (aStart.getTime() < currentTime.getTime() && currentTime.getTime() < aEnd.getTime()) {
			record.addClass("selectedWeek");
			// record.html('Current Week');
			record.append('<span id="currentWeekId"></span>');
			accordionNumber = int;
			idToFocus = array_element._id;
		}
		var firstLine = $('<div class="firstLine">');
		firstLine.append('<span class="labelWeeks">Initial Date : </span>');
		firstLine.append('<span class="initialDate">' + getFormattedDate(aStart) + '</span>');
		record.append(firstLine);

		var secondLine = $('<div class="secondLine">');
		secondLine.append('<span class="labelWeeks">Final Date : </span>');
		secondLine.append('<span class="initialDate">' + getFormattedDate(aEnd) + '</span>');
		record.append(secondLine);
		var buttonsContainer = $('<div class="buttonsContainerWeeks">');
		buttonsContainer.append($('<button title="Baby Pics!" class="viewImages" onclick="lookForImage(\'' + array_element.order + '\')"></button>'));
		buttonsContainer.append($('<button title="View Nutritional Needs" class="viewTips" onclick="openNutritionalNeeds(\'' + array_element.order + '\')"></button>'));
		record.append(buttonsContainer);
		record.append($('<label class="labelNotes">My Notes</label>'));
		var content = $('<p class="weekContent" id="' + array_element._id + '" onclick="editComment(\'' + array_element._id + '\')">');
		content.html(array_element.description);
		record.append(content);
		$("#accordionWeeks").append(record);

	}
	$("#accordionWeeks").accordion();
	console.log(accordionNumber);
	$("#accordionWeeks").accordion('option', 'active', accordionNumber);
	$("#currentWeekId").focus();
	// $("#accordionWeeks").accordion( "activate" , accordionNumber);

}