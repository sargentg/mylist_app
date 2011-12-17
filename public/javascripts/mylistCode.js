// ---------- on page load script ------------

$(function(){
	/* initialize list items. These in real life would be read from a database */       
	var xx               = [
	"1. these are the days", 
	"2. that the <b>Lord</b>", 
	"3. hath made"
	];

	/* put the above items into the list */
	for (val in xx) {
		$('#mylist1').append(makeObject("listItem", xx[val]));
	}



	/* ---------------- event bindings ------------------------ */
	// click handler for Add another item hyperlink
	$('#addItem').click(function(){
		$("#newListItemContainer").show();
		$("#newListItemContainer input").focus();
	});

	// keypress event handler
	$('#newListItemContainer input').live('keypress', function(event){
		var el  = $(this);
		var key = event.which;
		switch(key){
			
			case 13: // ENTER
				appendConsole("Got ENTER --" + this.tagName + "--" + el.val());
				$('#mylist1').append(makeObject("listItem", el.val()));
				el.val("");
				el.focus();
				return false;
				break;
				
			case 27: // ESC
			case  0: // alternate (apple keyboard seems to send 0 for ESC)
				appendConsole("Got ESC --" + this.tagName + "--" + el.val());
				el.val("");
				$("#newListItemContainer").hide();
				return false;
				break;
				
			default: // not interested in anythingelse
				break; // keep going don't stop the bubble
		} 
	});

	// button click handler - Add this item Button
	$("#newListItemContainer button").click(function(event){
		var el = $("#newListItemContainer input");
		appendConsole("clicked BUTTON -- " + el.val());
		$('#mylist1').append(makeObject("listItem", el.val()));
		el.val("");
		el.focus();
	});
	
	
	// hyperlink click handler - close hyperlink when adding new todo item
	$("#newListItemContainer a").click(function(event){
		appendConsole("clicked CLOSE link");
		$("#newListItemContainer input").val("");
		$("#newListItemContainer").hide();
		return false;
	});

});
// end jQuery document ready handler
	


// construct objects from the templates below
function makeObject(templateId, contentsString){
	// get template node,
	// set it's contents (contained in a <span>)
	var newTemplateItem = $('#' + templateId).html();
	return $("span", newTemplateItem).html(contentsString).end(); 
}

// utility
function appendConsole(someString) {
	$("#console").append(someString + "<br />");
}



