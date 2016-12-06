var $confirm;
var callBack;
var iconStyle = '<span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 50px 0;"></span>';
var messageStyleStart = '<span align="center" style="font-family:arial, verdana, sans-serif;font-size:9.3pt;">';
var messageStyleEnd = '</span>';
/*
 * $(document).ready(function() { $('#confirmDialog').dialog({ autoOpen : false,
 * modal : true }); // jquery confirm box -- the general alert box $confirm =
 * $('<div style="vertical-align:middle;"></div>').html('This Message will be
 * replaced!').dialog({ autoOpen : false, modal : true, position : 'top', height :
 * 300, width : 460, modal : true, buttons : { Ok : function() {
 * $(this).dialog("close"); if (null != callBack) callBack.success(); }, Cancel :
 * function() { $(this).dialog("close"); if (null != callBack) callBack.fail(); } }
 * });
 * 
 * });
 * 
 * function showConfirm(message, callBackMe, title) { callBack = null;
 * $confirm.html(""); // work around $confirm.html(iconStyle + messageStyleStart +
 * message + messageStyleEnd); if (title == 'undefined' || null == title)
 * $confirm.dialog("option", "title", "Please confirm"); else
 * $confirm.dialog("option", "title", title); var val = $confirm.dialog('open');
 * callBack = callBackMe; // prevent the default action return true; }
 */
var $divConfirmDialog;
var $divAlertDialog;
var $divBlockDialog;
var $divConfirmDialog_3;
// $(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);
// $(document).ajaxStart($divBlockDialog.dialog('open')).ajaxStop($divBlockDialog.dialog('close'));
$(function() {
	$divConfirmDialog = $('<div id="confirmDialog" title="Confirm Dialog"></div>');
	$divConfirmDialog.dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		buttons : {
			'Si' : function() {
				$(this).dialog("close");
				if (null != callBack) {
					if (callBack.success) {
						callBack.success();
					}
				}
			},
			'No' : function() {
				$(this).dialog("close");
				if (null != callBack) {
					if (callBack.fail) {
						callBack.fail();
					}
				}
			}
		}
	});
	// ini ------
	$divConfirmDialog_3 = $('<div id="confirmDialog3" title="Confirm Dialog"></div>');
	$divConfirmDialog_3.dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		buttons : {
			'Si' : function() {
				$(this).dialog("close");
				if (null != callBack) {
					if (callBack.success) {
						callBack.success();
					}
				}
			},
			'No' : function() {
				$(this).dialog("close");
				if (null != callBack) {
					if (callBack.fail) {
						callBack.fail();
					}
				}
			},
			'Cancelar' : function() {
				$(this).dialog("close");
				if (null != callBack) {
					if (callBack.cancel) {
						callBack.cancel();
					}
				}
			}
		}
	});
	// fin --------
	$divAlertDialog = $('<div id="alertDialog" title="Alert Dialog"></div>');
	$divAlertDialog.dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		buttons : {
			"Aceptar" : function() {
				$(this).dialog("close");
				if (null != callBack) {
					if (callBack.success) {
						callBack.success();
					}
				}
			}
		},
		close : function(ev, ui) {
			if (null != callBack) {
				if (callBack.success) {
					callBack.success();
				}
			}
		}
	});
	$divBlockDialog = $('<div id="blockDialog"><img src="media/images/ajax_loading_med.gif" /></div>');
	$divBlockDialog.dialog({
		autoOpen : false,
		modal : true,
		closeOnEscape : false,
		dialogClass : 'no-close',
		resizable : false,
		width : 150,
		height : 150
	});
	$('#dialogContainer').append($divConfirmDialog);
	$('#dialogContainer').append($divAlertDialog);
	$('#dialogContainer').append($divBlockDialog);
});
function showConfirmDialog(message, title, callBackMe) {
	hideAjaxBlockDialog();
	$divConfirmDialog.html(message);
	if (title != null) {
		$divConfirmDialog.dialog('option', 'title', title);
	}
	$divConfirmDialog.dialog('open');
	callBack = {
		success : callBackMe
	};
}
function showConfirmDialogCancel(message, title, callBackMe, callBackFailed) {
	hideAjaxBlockDialog();
	$divConfirmDialog.html(message);
	if (title != null) {
		$divConfirmDialog.dialog('option', 'title', title);
	}
	$divConfirmDialog.dialog('open');
	callBack = {
		success : callBackMe,
		fail : callBackFailed
	};
}
// ini -------
function showConfirmDialogCancel_3(message, title, callBackMe, callBackFailed, callBackcancel) {
	hideAjaxBlockDialog();
	$divConfirmDialog_3.html(message);
	if (title != null) {
		$divConfirmDialog_3.dialog('option', 'title', title);
	}
	$divConfirmDialog_3.dialog('open');
	callBack = {
		success : callBackMe,
		fail : callBackFailed,
		cancel : callBackcancel
	};
}
// fin -------
function showAlertDialog(message, title, callBackMe) {
	hideAjaxBlockDialog();
	$divAlertDialog.html(message);
	if (title != null) {
		$divAlertDialog.dialog('option', 'title', title);
	}
	$divAlertDialog.dialog('open');
	callBack = {
		success : callBackMe
	};
}
function showAjaxBlockDialog() {
	$divBlockDialog.dialog('open');
}
function hideAjaxBlockDialog() {
	$divBlockDialog.dialog('close');
}
