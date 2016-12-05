var callBack;
var callBackDelete;
var deleteMessage;
$(function() {
	addDeleteConfirmationMessage();
	refreshListChildren();
	initializeDatePickers();
	initializeInsertKidDialog();
	initializeControls();

});
function openMyWeeks(kidId) {
	$.post("/setKidId", {
		id : kidId
	}, function(response) {
		window.location = 'listWeeks.html';
	});

}
function logOut(kidId) {
	$.post("/logOut", null, function(response) {
		window.location = 'index.html';
	});

}
function initializeControls() {
	$("#addKidButton").click(function() {
		$('#addKidForm').dialog('open');
	});
}
function initializeInsertKidDialog() {
	callBack = {
		success : function() {

			var name = $("#name").val();
			var gender = $('input:radio[name=gender]:checked').val();
			var dueDate = $("#dueDate").datepicker("getDate");
			//createWeeks(dueDate);
			// create new note
			var newKid = {
				"name" : name,
				"gender" : gender,
				"dueDate" : dueDate
			};
			// post new note to server
			$.post("/saveKid", newKid, function(response) {
				buildNote(response);
			})

		}
	};
	var addKidForm = $('#addKidForm');
	addKidForm.dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		buttons : {
			'Save' : function() {
				$(this).dialog("close");
				if (null != callBack) {
					if (callBack.success) {
						callBack.success();
					}
				}
			},
			'Cancel' : function() {
				$(this).dialog("close");
				if (null != callBack) {
					if (callBack.cancel) {
						callBack.cancel();
					}
				}
			}
		}
	});
}
function initializeDatePickers() {
	$.datepicker.setDefaults({
		changeYear : true,
		changeMonth : true,
		dateFormat : 'mm/dd/yy',
		numberOfMonths : 2,
		showOn : "both",
		buttonImage : 'media/images/calendar.png',
		buttonImageOnly : true
	});
	var currentDate = new Date();
	$("input.datePicker").val(getFormattedDate(currentDate));
	$("input.datePicker").datepicker("setDate", currentDate).attr('readonly',
			'readonly');
	$("input.datePicker").datepicker();
}
function addDeleteConfirmationMessage() {
	deleteMessage = $('<div id="deleteConfirm" title="Delete Confirmation"><label>Are you sure you want to delete this record?</label></div>');
	deleteMessage.dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		buttons : {
			'Delete' : function() {
				$(this).dialog("close");
				if (null != deleteMessage) {
					if (deleteMessage.success) {
						deleteMessage.success();
					}
				}
			},
			'Cancel' : function() {
				$(this).dialog("close");
				// Callback for false;
			}
		}
	});
}
function deleteRecord(idDelete) {
	event.stopPropagation();
	deleteMessage.dialog('open');
	deleteMessage.success = function() {
		var name = $("#name").val();
		var gender = $('input:radio[name=gender]:checked').val();
		var dueDate = $("#dueDate").datepicker("getDate");
		// post new note to server
		$.post("/deleteKid", {
			id : idDelete
		}, function(response) {
			buildNote(response);
		});

	}
}
function getFormattedDate(date) {
	var year = date.getFullYear();
	var month = (1 + date.getMonth()).toString();
	month = month.length > 1 ? month : '0' + month;
	var day = date.getDate().toString();
	day = day.length > 1 ? day : '0' + day;
	return month + '/' + day + '/' + year;
}
function refreshListChildren() {
	$.getJSON("/listKids", function(response) {
		buildNote(response);
	});
}

function buildNote(data) {
	$(".note-output").empty();
	for (var int = 0; int < data.length; int++) {
		var array_element = data[int];
		$(".note-output")
				.append(
						$(
								'<p class="flex-item kid'
										+ array_element.gender
										+ '" onclick="openMyWeeks(\''
										+ array_element._id + '\')">')
								.html(array_element.name)
								.append(
										$('<button class="note-delete" onclick="deleteRecord(\''
												+ array_element._id
												+ '\')"></button>')));
	}

}