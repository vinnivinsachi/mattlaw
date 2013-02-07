var Rialto = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			class: 'Rialto'
		},
		
		initialize: function(options){
			console.log('initializing Rialto');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
		},
	
	
		// ======================================================== SETUP METHODS ======================================
		// setup an elmt
		setup: function(elmt) {
			// setup elmt
		},
		
		// setup all relevant elmts in a given container
		setupContainer: function(container){
			container.getElements('.'+self.options.class).each(function(elmt){ // for each elmt in the container
				self.setup(elmt); // setup the plugin
			});
		}
		
		// ======================================================== PRIVATE METHODS ======================================
		
	});
	
})();
