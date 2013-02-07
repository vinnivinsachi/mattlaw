var RialtoLoadingImage = (function(){
	
	// TODO MARK: fails when more than one loading image is assigned before first one is deleted
	// TODO MARK: remove loading image from DOM once it is hidden
	
	var self; // for reference anywhere in the class
	
	// HTML wrappers
	var loadingImageOverlayHTML = function(){ return "<div id='rialto-loading-image-overlay' style='opacity:0; display:none'><img src='"+self.options.url+"'/></div>"; };
	var loadingImageHTML = function(){ return "<div class='rialto-loading-image'><img src='"+self.options.url+"'/></div>"; };
	
	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			url: 'images/loading.gif'
		},
		
		initialize: function(options) {
			console.log('initializing RialtoLoadingImage');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
		},

		container: null,

		// ======================================================== PUBLIC METHODS ======================================
		/**
		 * Attach a loading image to something.
		 * Also attach a function to remove the loading image.
		 * 
		 * @param Object elmt The element to attach the loading image to.
		 * @param bool overlay Puts an overlay over all content if true.
		 * @return void
		 */
		show: function(elmt, overlay) { // show the global loading image
			//console.log('showLoading called');
			//(elmt) ? self.attachLoadingImage(elmt, false) : self.attachLoadingImage(document.body, true);
			// TODO MARK: fix conflict in ID
			if(elmt) self.attachLoadingImage(elmt);
			else self.showBodyLoadingImage();
		},
		
		/**
		 * Detaches the loading image from an element.
		 * 
		 * @param Object elmt The element to detach the loading image from.
		 * @return void
		 */
		hide: function(elmt) { // hide the global loading image
			//console.log('hideLoading called');
			//(elmt) ? elmt.rialtoDetachLoadingImage() : document.body.rialtoDetachLoadingImage();
			if(elmt) elmt.rialtoDetachLoadingImage();
			else self.hideBodyLoadingImage();
		},
		
		setupContainer: function(container) {
			self.container = container;
			var img = Elements.from(loadingImageOverlayHTML())[0];
			img.inject(container, 'top');
		},
		
		// ======================================================== PROTECTED METHODS ======================================
		// attach the loading image
		attachLoadingImage: function(elmt, overlay){
			var img = (overlay) ? Elements.from(loadingImageOverlayHTML())[0] : Elements.from(loadingImageHTML())[0]; // create loading image object
			img.chains(); // make animations queue
			elmt.rialtoDetachLoadingImage = function(){ // make detach loading image function on elmt
				$Rialto.fx.fadeOut(img, {destroy:true}); // fade out loading image and destroy it
			};
			if(elmt.getStyle('position') == 'static') elmt.setStyle('position', 'relative'); // make sure elmt has some sort of positioning
			img.setStyle('opacity', 0); // start loading image with no opacity
			img.inject(elmt, 'bottom'); // inject loading image into elmt
			$Rialto.fx.fadeIn(img); // fade in the loading image
		},
		
		showBodyLoadingImage: function() {
			$Rialto.fx.fadeIn($('rialto-loading-image-overlay'));
		},
		
		hideBodyLoadingImage: function() {
			$Rialto.fx.fadeOut($('rialto-loading-image-overlay'));
		}

	});
	
})();
