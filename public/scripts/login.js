$(function() {
	addDeleteConfirmationMessage();
});
function showAlertMessage(message) {
	$("#errorMessage").html(message);
	alertMessage.dialog('open');
}
function closeAlertMessage() {
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
				$(this).dialog("close");

			}
		}
	});
}

function verifyLogin() {
	var email = $("#userName").val();
	var password = $("#password").val();
	if (email.lenght == 0) {
		showAlertMessage("Email must not be empty");
	} else {
		if (password.lenght == 0) {
			showAlertMessage("Password must not be empty");
		} else {
			$.post("/verifyLogin", {
				userName : email,
				password : password
			}, function(response) {
				if (response) {
					window.location = 'listChildren.html';
				} else {
					showAlertMessage("Email or Password do not match");
				}

			});
		}
	}

}