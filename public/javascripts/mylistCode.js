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
		$("#lowerMenu").hide();
		$("#newItemContainer").show();
		$("#newItemContainer input").focus();
	});

	// keypress event handler
	$('#newItemContainer input').live('keypress', function(event){
		var el  = $(this);
		//var key = event.which;
		var key = event.which;
		var keyCode = event.keyCode;
		
		// convert a TAB (9) into an ENTER (13)
		if (keyCode == 9) {
			key = 13;
		}
		appendConsole("key: " + key + "-- keyCode: " + keyCode);
		switch(key){
			
			case 13: // ENTER
				appendConsole("Got ENTER --" + this.tagName + "--" + el.val());
				$('#mylist1').append(makeObject("listItem", el.val()));
				el.val("");
				el.focus();
				return false;
				break;
				
			case  0: // all control keys return key = 0. Must use keyCode
			if (keyCode == 27) {
				appendConsole("Got ESC --" + this.tagName + "--" + el.val());
				el.val("");
				$("#newItemContainer").hide();
				$("#lowerMenu").show();
				return false;
				break;
			}
				
			default: // not interested in anythingelse
				break; // keep going don't stop the bubble
		} 
	});

	// button click handler - Add this item Button
	$("#newItemContainer button").click(function(event){
		var el = $("#newItemContainer input");
		appendConsole("clicked BUTTON -- " + el.val());
		$('#mylist1').append(makeObject("listItem", el.val()));
		el.val("");
		el.focus();
	});
	
	
	// hyperlink click handler - close hyperlink when adding new todo item
	$("#newItemContainer a").click(function(event){
		appendConsole("clicked CLOSE link");
		$("#newItemContainer").hide();
		$("#newItemContainer input").val("");
		$("#lowerMenu").show();
		return false;
	});

	// hyperlink click handler - edit hyperlink
	$("a#editList").click(function(event){
		$("#mainModeContainer").hide();
		$("#editModeContainer").show();
		// now copy every list item in the mainModeContainer to the editModeContainer
		$("#mainModeContainer ul#mylist1 span").each(function(){
			var el = $(this);
			appendConsole(el.html());
			$("#editModeContainer ul#mylist2").append(makeValObject("editItem", el.html()));
		})
		
		
		
		
	})

	// hyperlink click handler - cancel edit mode
	$("#editModeContainer div.menu a").click(function(event){
		$("#mainModeContainer").show();
		$("#editModeContainer").hide();		
	})

});
// end jQuery document ready handler
	


// construct objects from the templates below
function makeObject(templateId, contentsString){
	// get template node,
	// set its contents (contained in a <span>)
	var newTemplateItem = $('#' + templateId).html();
	return $("span", newTemplateItem).html(contentsString).end(); 
}
function makeValObject(templateId, contentsString){
	// get template node,
	// set its value (not contents). HTML <input> field take a value
	//appendConsole(templateId + "--" + contentsString);
	var newTemplateItem = $('#' + templateId).html();
	return $("input", newTemplateItem).val(contentsString).end();
}

// utility
function appendConsole(someString) {
	$("#console").append(someString + "<br />");
}



