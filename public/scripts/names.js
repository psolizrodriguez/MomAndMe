var callBack;
var callBackDelete;
var deleteMessage;
var namesOnList;
$(function() {
	initializeInsertKidDialog();
	refreshListNames();
	initializeControls();
	addDeleteConfirmationMessage();
});
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
function refreshListNames() {
	$.getJSON("listNames", function(response) {
		buildNote(response);
	});
}

function buildPossibleNames(data) {
	$("#addNameForm").empty();
	var table = $('<table border="1">');
	var tableHeader = $('<tr>');
	tableHeader.append($('<th>').html("*"));
	tableHeader.append($('<th>').html("Name"));
	tableHeader.append($('<th>').html("Meaning"));
	table.append(tableHeader);
	for (var int = 0; int < data.length; int++) {
		var array_element = data[int];
		if (namesOnList.indexOf(array_element.name) == -1) {
			var tr = $('<tr>');
			var colCheckBox = $('<td class="checkBoxTable">');
			var checkbox = $('<input type="checkbox" onclick="savePossibleName(\''
					+ array_element.name + '\')">');
			colCheckBox.append(checkbox);
			var colName = $('<td class="BabyName">');

			var BabyCol = $('<td>');
			var MeaningCol = $('<td>');
			BabyCol.html(array_element.name);
			MeaningCol.html(array_element.meaning);
			colName.append(BabyCol);
			tr.append(colCheckBox);
			tr.append(BabyCol);
			tr.append(MeaningCol);
			table.append(tr);
		}
	}
	$("#addNameForm").append(table);
}
// Code for deleting names
function deleteRecordName(idDelete) {
	event.stopPropagation();
	deleteMessage.dialog('open');
	deleteMessage.success = function() {
		$.post("/deleteName", {
			id : idDelete
		}, function(response) {
			buildNote(response);
		});

	}
}

function savePossibleName(nameToSave) {
	// var description = $("#description").val();
	// var rating = $('input:radio[name=rating]:checked').val();
	// create new Name
	var newName = {
		"description" : nameToSave,
		"rating" : "1"
	};
	// post new note to server
	$.post("/saveName", newName, function(response) {
		// buildNote(response);
	})
}
function buildNote(data) {
	namesOnList = [];
	$(".note-output").empty();
	for (var int = 0; int < data.length; int++) {
		var array_element = data[int];
		namesOnList[int] = array_element.description;
		
		$(".note-output")
				.append(
						$('<p>')
								.html(array_element.description)
								.append(
										$('<button class="note-delete" onclick="deleteRecordName(\''
												+ array_element._id
												+ '\')"></button>')));
	}
}
// Code fro adding the Open dialog on click to button
function initializeControls() {
	$("#addKidButton").click(function() {

		// Pull name suggestions for babies
		$.getJSON("listPossibleNames", function(response) {
			buildPossibleNames(response);
		});
		$('#addNameForm').dialog('open');
	});
}
// Code for Initializing Names Insert Form
function initializeInsertKidDialog() {
	var addNameForm = $('#addNameForm');
	addNameForm.dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		buttons : {
			'Save' : function() {
				refreshListNames();
				$(this).dialog("close");
				/*
				 * var description = $("#description").val(); var rating =
				 * $('input:radio[name=rating]:checked').val(); // create new
				 * Name var newName = { "description" : description, "rating" :
				 * rating }; // post new note to server $.post("/saveName",
				 * newName, function(response) { buildNote(response); })
				 */
			},
			'Cancel' : function() {
				$(this).dialog("close");
			}
		}
	});
}