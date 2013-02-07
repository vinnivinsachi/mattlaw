(function($){
	$.fn.rialtoAttention = function(passedOptions){
	
		// default options
		var options = {
			// setting default options
		};
		
		// merge passed options with defaults
		if(passedOptions){$.extend(options, passedOptions); }
		
		// make sure to return this in order for jquery chaining
		return this.each(function(){
			var theObject = $(this);
			
			theObject.effect("pulsate", { times:1 }, 500); 
			// do stuff to each element
			
		});
	};	
})(jQuery)