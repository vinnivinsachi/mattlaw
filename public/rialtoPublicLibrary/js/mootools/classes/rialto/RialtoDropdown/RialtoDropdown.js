var RialtoDropdown = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			className: 'rDropdown',
			headerClass: 'RialtoDropdown'
		},
		
		initialize: function(options){
			//console.log('initializing RialtoDropdown');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
		},
	
	
		// ======================================================== SETUP METHODS ======================================
		// setup an elmt
		setup: function(elmt) {
			//nothing			
		},
		
		// setup all relevant elmts in a given container
		setupContainer: function(container){
			container.getElements('.'+self.options.className).each(function(elmt){ // for each elmt in the container
				self.setup(elmt); // setup the plugin
			});
		},
		
		handleClick: function(rialtoEvent) {
			self.clickHeader(rialtoEvent.elmt);
			rialtoEvent.callNext();
		},
		
		
		// ======================================================== PUBLIC METHODS ======================================
		clickHeader: function(headerElmt) {
			var dropdown = headerElmt.getParent('.'+self.options.className);
			var list = dropdown.getElement('ul');
			list.setStyle('display', 'block');
			dropdown.addEvent('mouseleave', function(){ self.onMouseLeave(dropdown); });
		},
		
		
		// ======================================================== EVENT LISTENERS ======================================
		onMouseLeave: function(dropdown) {
			dropdown.removeEvents('mouseleave');
			var list = dropdown.getElement('ul');
			list.setStyle('display', 'none');
		}
		
	});
	
})();
