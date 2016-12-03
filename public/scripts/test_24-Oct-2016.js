$(function() {
	createDialog();
	$("#accordion").accordion();
	$("#showDialog").on("click", function() {
		$("#dialog").dialog('open');
		console.dir($("#dialog"));
	});

});
function createDialog() {
	$("#dialog").dialog({
		autoOpen : false,
		width : 400,
		buttons : [ {
			text : "Ok",
			click : function() {
				$(this).dialog("close");
			}
		}, {
			text : "Cancel",
			click : function() {
				$(this).dialog("close");
			}
		} ]
	});
}