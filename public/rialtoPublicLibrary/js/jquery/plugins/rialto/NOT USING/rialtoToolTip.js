(function($){
	$.fn.rialtoToolTip = function(passedOptions){
	
		//the tool tip click must contain a tool-tip-loading-container class inorder for the laoding to work. Also, the tool-tip-click main span must have an href reference. 
		// click : false;
		var options = {
			// setting default options
			clicked : true
			// key : 'value'
		};
		
		// merge passed options with defaults
		if(passedOptions){$.extend(options, passedOptions); }
		// make sure to return this in order for jquery chaining
		return this.each(function(){
			var theObject = $(this);
			if(options.clicked){
				theObject.click(function(e){
					e.stopPropagation();
					e.preventDefault();
					
					theObject.addClass('clicked');
					if(!theObject.hasClass('loaded')){
						//alert('here');						
						theObject.addClass('loaded');
						theObject.attr('title', '');
					}
					$.rialtoLoadReplaces(theObject);
				});
			// do stuff to each element
			}
			
			theObject.mouseout(function(){
				theObject.removeClass('clicked');	
			});
		});
	};	
})(jQuery)