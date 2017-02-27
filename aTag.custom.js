// Customizing 'A' Tag.
var customTagA = function() {
	$.fn.dataURL = function() {
		// variables
		var aTag = $(this);
		//var aHref = "";
		var aTarget = "";
		var post = false;

		// get & set attributes
		aTag.each(function() {
			var aHref = $(this).attr('href');
			if (aHref == "" || aHref == "#" || typeof aHref == "undefined") {
				$(this).attr('href', null);
			}
		});
	}
	
	$('a').dataURL();
}
