var RialtoImageScrollSwitch = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	// TODO MARK: add a delay?

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			className: 			'rImageScrollSwitch', // the class name
			mainImageClass: 'rImageScrollSwitch-main-image', // the main image
			//altImagesClass: 'rImageScrollSwitch-alt-images', // the alt image
			altImagesID: 	'rialtoImageScrollSwitchAltID', // the ID of the alt images
			parentSelectorAttr: 'rialtoImageScrollSwitchParentSelecter'
		},
		
		initialize: function(options){
			//console.log('initializing RialtoImageScrollSwitch');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
		},
	
	
		// ======================================================== PUBLIC METHODS ======================================
		// setup an elmt
		// should receive an img element
		// each image can only have one parent and each parent only one image
		setup: function(elmt, container) {
			elmt.containerElmt = elmt.getParent(elmt.get(self.options.parentSelectorAttr));
			elmt.containerElmt.imageElmt = elmt;
			var altID = elmt.get(self.options.altImagesID); // get alt images ID
			elmt.originalSrc = elmt.get('src'); // save the original image src
			var altImageContainer = container.getElementById(altID); // get alt image container
			if(altImageContainer) elmt.containerElmt.altImages = altImageContainer.getElements('img'); // save the alt images in an array in the elmt
			if(elmt.containerElmt.altImages && elmt.containerElmt.altImages.length) { // IF there is at least one alt image
				elmt.containerElmt.addEvent('mousemove', function(event){ self.mouseMove(event, elmt.containerElmt); }); // setup mouse move event
				elmt.containerElmt.addEvent('mouseleave', function(event){ self.mouseLeave(event, elmt.containerElmt); }); // setup mouse leave event
			}
		},
		
		// setup all relavant elmts in a given container
		setupContainer: function(container){
			container.getElements('.'+self.options.className).each(function(elmt){ // for each elmt in the container
				self.setup(elmt, container); // setup the plugin
			});
		},
		
		// ======================================================== PRIVATE METHODS ======================================
		mouseMove: function(event, containerElmt) {
			containerElmt.imageElmt.set('src', self.getSwitchImageSrc(event, containerElmt)); // set the new image src
		},
		
		mouseLeave: function(event, containerElmt) {
			containerElmt.imageElmt.set('src', containerElmt.imageElmt.originalSrc); // reset to original image src
		},
		
		getSwitchImageSrc: function(event, containerElmt) {
			// TODO MARK: offset is not being calculated correctly (it's relative to the image, not the container)
			var offsetX = event.event.offsetX;
			//var offsetX = event.event.target.getPosition(event.event.target.getOffsetParent()).x + event.event.offsetX;
			return containerElmt.altImages[Math.floor(offsetX/((containerElmt.getSize().x)/containerElmt.altImages.length))].get('src'); // get the src of the alt image to be shown (depending on mouse position)
		}
		
	});
	
})();
