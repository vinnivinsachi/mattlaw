var RialtoFlashMessage = (function(){
	
	var self; // for reference anywhere in the class
		
	// TODO MARK: flash message is flashing twice!
	// HTML
	flashMessageHTML = function(){ return "<div id='rialto-flash-message'><span class='rialto-flash-message-container'></span></div>"};
	
	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			class: 'RialtoFlashMessage',
			flashMessageError: 'Something went wrong!'
		},
		
		$flashMessage: Elements.from(flashMessageHTML())[0],
		
		initialize: function(options) {
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options	
			self.$flashMessage.inject(document.body).fade('hide'); // put the flash message HTML in the DOM
		},
		
		
		// ======================================================== SETUP METHODS ======================================
		// setup all relavant elmts in a given container
		setupContainer: function(container){
			container.getElements('[class*="'+self.options.class+'"]').each(function(elmt){ // for each elmt in the container
				self.showElmt(elmt);
			});
		},


		// ======================================================== PUBLIC METHODS ======================================
		showElmt: function(elmt) {
			$Rialto.fx.fadeIn(elmt);
			(function(){
				$Rialto.fx.fadeOut(elmt);
			}).delay(3000);
		},
		
		show: function(message) {
			self.$flashMessage.getElements('.rialto-flash-message-container').set('html', message);
			(function(){self.$flashMessage.fade('in').pauseFx(2000).fade('out')}).delay(500); // add image to parent and show
		},
		/**
		 * Flashes a message to the screen.
		 * 
		 * @param string message The message to be flashed.
		 * @return void
		 */
		 /*showMessage: function(message) {
		 			self.$flashMessage.getElements('.rialto-flash-message-container').set('html', message);
		 			(function(){self.$flashMessage.fade('in').pauseFx(2000).fade('out')}).delay(500); // add image to parent and show
		 		},
		*/
		/**
		 * Flashes a generic error message to the screen. (delegates to self.show());
		 * 
		 * @return void
		 */
		//showError: function() { this.showMessage(this.options.flashMessageError); } // flash a generic error message
		
		
		// ======================================================== PROTECTED METHODS ======================================
	
	});
	
})();
