/**
 * http://usejsdoc.org/
 */
var data = {
	"1" : {
		_title : "Abdominal Achiness",
		_image : "C:\Users\Saharsh\Desktop\aa.jpg",
		_content : "Round ligament pain is typically felt as achy, crampy or sharp sensations on one or both sides of the lower abdomen. You'll probably " +
				"notice occasional round ligament pain more when you change positions suddenly or get up from sitting or lying down, or when you cough, " +
				"sneeze or laugh. It may be brief or last for several hours (yet another mystery of pregnancy)."
	}
}
var lisData =
{
	"A" : [ {
		_id : "1",
		_name : "Abdominal Achiness"
	}, {
		_id : "2",
		_name : "Abdominal Itchiness"
	},{
		_id : "3",
		_name : "Appetite, Increased"
	} ],
	
	"B" : [ {
		_id : "3",
		_name : "Back Pain"
	}, {
		_id : "4",
		_name : "Bloating"
	},{
		_id : "5",
		_name : "Bloodshot eyes"
	},{
		_id : "6",
		_name : "Breast Engorgement"
	},{
		_id :"7",
		_name : "Breast Tenderness and Changes"
	},{
		_id :"8",
		_name : "Breasts, Leaky"
	},{
		_id :"9",
		_name : "Bloody Show / Mucous Plug"
	} ],

	"C" : [ {
		_id : "10",
		_name : "Cervical Dilation"
	}, {
		_id : "11",
		_name : "Cervical Mucus Changes"
	},{
		_id : "12",
		_name : "Chloasma/Mask of Pregnancy"
	},{
		_id : "13",
		_name : "Clumsiness"
	},{
		_id :"14",
		_name : "Constipation"
	},{
		_id :"15",
		_name : "Contractions, Braxton-Hicks"
	},{
		_id :"16",
		_name : "Contractions, Labor"
	} ],
	
	"D" : [ {
		_id : "17",
		_name : "Diarrhea (Prelabor)"
	}, {
		_id : "18",
		_name : "Diarrhea (Pregnancy)"
	}],
	
	"E" : [ {
		_id : "19",
		_name : "Edema"
	}, {
		_id : "20",
		_name : "Energy, Extra"
	}],
	
	"F" : [ {
		_id : "21",
		_name : "Faintness"
	}, {
		_id : "22",
		_name : "Fatigue"
	},{
		_id : "23",
		_name : "Fecal Incontinence"
	},{
		_id : "24",
		_name : "Feet, Increased Size"
	},{
		_id :"25",
		_name : "Food Cravings and Aversions"
	},{
		_id :"26",
		_name : "Forgetfulness"
	} ]
}
function showCatalogDetails(catalogId) {
	// pull information
	var currentArticle = data[catalogId];
	$('#title').html(currentArticle._title);
	$('#image').attr("src", currentArticle._image);
	$('#content').html(currentArticle._content);

	$('#listSection').hide();
	$('#catalogContent').show();

}
function refreshCatalogList(letter) {
	var currentList = lisData[letter];
	
	
	if(currentList == 'undefined'){
		alert('No Data Found');
	}else{
		var listSection = $('#listSection');
		listSection.empty();
	for (var int = 0; int < currentList.length; int++) {
		var currentDissease = currentList[int];
		var p = $('<p class="c" onclick="showCatalogDetails(\''
				+ currentDissease._id + '\')">' + currentDissease._name
				+ '</p>');
		listSection.append(p);
	}
	$('#catalogContent').hide();
	$('#listSection').show();
	}
}