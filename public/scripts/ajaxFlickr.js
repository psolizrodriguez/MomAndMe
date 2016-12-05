//load main app logic - v3
function loadApp(week) {
  "use strict";

    function buildImage(data) {
        //create each note's <p>
        var img = $("<img>");
        //add note text
        img.attr("src", data);
        //append to DOM
        
        $("#imageContainer").append(img);
    }

    //get the Flickr public feed JSON for images
    function getImages() {
		    	 $(".ui-dialog-title").empty();
    	$("#imageContainer").empty();
        //.get returns an object derived from a Deferred object - do not need explicit deferred object
        var $deferredNotesRequest = $.getJSON (
          "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
          { tags: "baby,week," + week,
            tagmode: "all",
            format: "json"
          });
        return $deferredNotesRequest;
    }

      $.when(getImages()).done(function(response) {
        console.log("done..."+response);
        //use jQuery's generic iterative function for the response...
        var number = Math.random() * 10;
        number = Math.round(number);
        console.log(number);
        console.log(response.items[number]);
        buildImage(response.items[number].media.m);
        $(".ui-dialog-title").html(response.items[number].title);
        
        /*$.each( response.items, function( i, item ) {
        buildImage(item.media.m);
        //limit test images to 8
        if ( i === number ) {
          return false;
        }
      });*/
      });

};