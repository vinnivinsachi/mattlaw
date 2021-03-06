(function($){
	$.fn.rialtoPalette = function(passedOptions){
	
		// default options
		var options = {
			// setting default options
		};
		
		// merge passed options with defaults
		if(passedOptions){$.extend(options, passedOptions); }
		
		// make sure to return this in order for jquery chaining
		return this.each(function(){
			var theObject = $(this);

			theObject.children('li').click(function(){
				// toggle 'selected' class
					if($(this).children('span').hasClass('selected')) $(this).children('span').removeClass('selected');
					else $(this).children('span').addClass('selected');
			});
			
		});
	};	
})(jQuery)