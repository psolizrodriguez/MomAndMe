$(function() {
	addDeleteConfirmationMessage();
});
function showAlertMessage(message) {
	hideAjaxBlockDialog();
	$("#errorMessage").html(message);
	alertMessage.dialog('open');
}
function closeAlertMessage() {
	hideAjaxBlockDialog();
	alertMessage.dialog('close');
}
var alertMessage = $('<div id="deleteConfirm" title="Error Found"><label id="errorMessage"></label></div>');
function addDeleteConfirmationMessage() {
	alertMessage.dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		buttons : {
			'OK' : function() {
				hideAjaxBlockDialog();
				$(this).dialog("close");
			}
		}
	});
}

function verifyLogin() {
	showAjaxBlockDialog();
	var email = $("#userName").val();
	var password = $("#password").val();
	if (email == '') {
		hideAjaxBlockDialog();
		showAlertMessage("Email must not be empty");
	} else {
		if (password == '') {
			hideAjaxBlockDialog();
			showAlertMessage("Password must not be empty");
		} else {
			$.post("/verifyLogin", {
				userName : email,
				password : password
			}, function(response) {
				if (response) {
					showAlertMessage("Welcome to Mom And Me!");
					setTimeout(function() {
						window.location = 'listChildren.html';
					}, 1000);

				} else {
					showAlertMessage("Email or Password do not match");
				}

			});
		}
	}

}