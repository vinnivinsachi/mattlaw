(function($){
	$.fn.rialtoGeneric = function(po){
		
		// return if no elements were receieved
			if(!$(this).length) return this;
	
		// default options
			var o = {
				// setting default options
				// key : 'value'
			};
		
		// merge passed options with defaults
			if(po){$.extend(o, po); }
		
		// make sure to return this in order for jquery chaining
			return this.each(function(){
				var theObject = $(this);
			
				// do stuff to each element
			
			});
	};	
})(jQuery)