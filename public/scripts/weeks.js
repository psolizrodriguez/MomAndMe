var callBack;
var callBackDelete;
var deleteMessage;
$(function() {
	initializeInsertKidDialog();
	refreshListChildren();
	// $("#accordionWeeks").accordion();

});
function refreshListChildren() {
	$.post("listWeeks", {}, function(response) {
		buildNote(response);
	});
}
function editComment(id) {
	$("#myNotes").html($('#' + id).html());
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
				$('#' + id).html(response.description);
			})

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
		}
		var firstLine = $('<div class="firstLine">');
		firstLine.append('<span class="labelWeeks">Initial Date : </span>');
		firstLine.append('<span class="initialDate">' + getFormattedDate(aStart) + '</span>');
		record.append(firstLine);

		var secondLine = $('<div class="secondLine">');
		secondLine.append('<span class="labelWeeks">Final Date : </span>');
		secondLine.append('<span class="initialDate">' + getFormattedDate(aEnd) + '</span>');
		record.append(secondLine);
		var buttonsContainer = $('<div>');
		buttonsContainer.append($('<button class="viewImages">Images</button>'));
		buttonsContainer.append($('<button class="viewTips">Tips</button>'));
		record.append(buttonsContainer);
		record.append($('<label>My Notes : </label>'));
		var content = $('<p class="weekContent" id="' + array_element._id + '" onclick="editComment(\'' + array_element._id + '\')">');
		content.html(array_element.description);
		record.append(content);
		$("#accordionWeeks").append(record);

	}
	$("#accordionWeeks").accordion();

}