var RialtoScrollable = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			className: 'rialtoScrollable',
			classHover: 'rialtoScrollableHover',
			classInverted: 'rialtoScrollableInverted'
		},
		
		initialize: function(options){
			//console.log('initializing RialtoScrollable');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
		},
	
	
		// ======================================================== SETUP METHODS ======================================
		// setup an elmt
		setup: function(elmt) {
			elmt.addEvent('mouseenter', function(event){ self.onMouseEnter(event, elmt); }); // add mouse enter listener
			elmt.addEvent('mouseleave', function(event){ self.onMouseLeave(event, elmt); }); // add mouse enter listener
		},
		
		// setup all relevant elmts in a given container
		setupContainer: function(container){
			container.getElements('.'+self.options.className).each(function(elmt){ // for each elmt in the container
				self.setup(elmt); // setup the plugin
			});
		},
		
		
		// ======================================================== EVENT LISTENERS ======================================
		onMouseEnter: function(event, elmt) {
			elmt.addClass(self.options.classHover); // add hover class
		},
		
		onMouseLeave: function(event, elmt) {
			elmt.removeClass(self.options.classHover); // add hover class
		}
		
		
	});
	
})();
