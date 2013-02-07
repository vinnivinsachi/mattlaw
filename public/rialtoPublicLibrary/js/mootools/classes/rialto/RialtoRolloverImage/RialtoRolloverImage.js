var RialtoRolloverImage = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			className: 			'rialtoRolloverImage', // the class name
			overImageAttr: 	'rialtoRolloverImageOver', // the rollover image name
			outImageAttr: 	'rialtoRolloverImageOut', // the out image name
			defaultSuffix: 	'_over' // the default rollover suffix
		},
		
		initialize: function(options){
			//console.log('initializing Rialto Rollover');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
		},
	
	
		// ======================================================== PUBLIC METHODS ======================================
		// setup an elmt
		setup: function(elmt) {
			elmt.addEvent('mouseenter', function(e){ self.over(elmt); });
			elmt.addEvent('mouseleave', function(e){ self.out(elmt); });
			//$this.hover(function(){ this.src = this.src.replace(settings.off, settings.on); },
			//		   function(){ this.src = this.src.replace(settings.on, settings.off); });
		},
		
		// setup all relavant elmts in a given container
		setupContainer: function(container){
			container.getElements('.'+self.options.className).each(function(elmt){ // for each elmt in the container
				self.setup(elmt); // setup the plugin
			});
		},
		
		over: function(elmt) {
			var currImage = elmt.get('src'); // get the file path of the image
			var imageName = self.getImageName(currImage); // get the image name
			if(!elmt.get(self.options.outImageAttr)) elmt.set(self.options.outImageAttr, imageName); // set the image to return to on mouse out IF not already set
			var overImageAttr = elmt.get(self.options.overImageAttr); // get hover image if it is specified
			if(overImageAttr) var newImage = currImage.replace(imageName, overImageAttr); // IF hover image is specified
			else var newImage = currImage.replace(imageName, imageName+self.options.defaultSuffix); // ELSE (no hover specified)
			elmt.set('src', newImage); // set the new image
		},
		
		out: function(elmt) {
			var currImage = elmt.get('src'); // get the file path of the image
			var imageName = self.getImageName(currImage); // get the image name
			elmt.set('src', currImage.replace(imageName, elmt.get(self.options.outImageAttr))); // set back the old image
		},
		
		// ======================================================== PRIVATE METHODS ======================================
		/**
		* Gets image name from a path (no path or file extension included).
		*
		* @param string path The path from which to find the image name.
		* @return string
		*/
		getImageName: function(path) {
			var lastSlash = path.lastIndexOf('/')+1; // find the last slash
			return path.substr(lastSlash, path.lastIndexOf('.')-lastSlash); // return the image name
		}
		
	});
	
})();
