var callBack;
var callBackDelete;
var deleteMessage;
$(function() {
	addDeleteConfirmationMessage();
	refreshListChildren();
	initializeInsertKidDialog();
	initializeControls();

});
function openMyWeeks(kidId) {
	$.post("http://localhost:3030/setKidId", {
		id : kidId
	}, function(response) {
		window.openLocation('listWeeks.html');
	});
	

}
function initializeControls() {
	$("#addKidButton").click(function() {
		$('#addKidForm').dialog('open');
	});
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
	deleteMessage.dialog('open');
	deleteMessage.success = function() {
		var name = $("#name").val();
		var gender = $('input:radio[name=gender]:checked').val();
		var dueDate = $("#dueDate").datepicker("getDate");
		// post new note to server
		$.post("http://localhost:3030/deleteKid", {
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
	$.getJSON("http://localhost:3030/weeks.json", function(response) {
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
										+ array_element.gender + '">')
								.html(array_element.name));
	}

}