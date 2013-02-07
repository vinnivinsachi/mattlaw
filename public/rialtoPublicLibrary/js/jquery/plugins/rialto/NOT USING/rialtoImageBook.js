(function($){
	$.fn.rialtoImageBook = function(passedOptions){
	
		// default options
		var options = {
			// setting default options
		};
		
		// merge passed options with defaults
		if(passedOptions){$.extend(options, passedOptions); }

		// make sure to return this in order for jquery chaining
		return this.each(function(){
			var theObject = $(this);
				//alert(theObject);
			theObject.find('ul > li > a').click(function(e){
				// prevent the default behavior of the clicked link
				//alert('at at image click');
					e.preventDefault();
				// move selected class to new thumbnail
					theObject.find('ul > li.selected').removeClass('selected');
					$(this).parent('li').addClass('selected');
				// find the location of the new image
					var newImage = $(this).attr('href');
				// replace the main image image with the new image
					theObject.find('.main-image > img').attr('src', newImage);
			});
			
		});
	};	
})(jQuery)