// make link make a json call and displays the result in a popup
(function( $ ){
$.fn.aJson = function( options ){

	// Default settings
	var settings = {
	};
	// Merge passed options with defaults
	if(options){$.extend(settings, options);}

	// Make sure to return 'this' in order to allow chaining with other jquery functions
	return this.each(function(){

		// Get 'this' as a jQuery object
		var $this = $(this);
		
		$this.hover(function(){ this.src = this.src.replace(settings.off, settings.on); },
				   function(){ this.src = this.src.replace(settings.on, settings.off); });
				
		$this.click(function(event){
			// prevent link from navigating page
				event.preventDefault();
			// get url to make json call to
				var url = $j(this).attr('href');
			// add the json format (for Zend)
				url += '/format/json';
			// make json call
			$j.getJSON(url, function(data){
				// display a message upon complete return
					flashMessage(data.flashMessage);
			});
		});
		
	});

};
})( jQuery )