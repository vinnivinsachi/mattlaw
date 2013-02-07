var RialtoPalette = (function(){

	var self; // for reference anywhere in the class
	
	// TODO MARK: palette needs a way to initialize so that already selected palettes can be appended the filter selection. 
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			className: 'rPalette', // the class name
			selectedClass: 'rSelected', // the selected item class
			maxSelectionsAttr: 'rPaletteMaxSelections', // the attribute wto set max num of selections
			clickElmtSelectorAttr: 'rPaletteClickElmtSelector', // the attribute of the click elmt selector to delegate click events to
			checkboxSelectorAttr: 'rPaletteCheckboxSelector', // the attribute of the checkbox selector string
			preDispatchAttr: 'rPalettePreDispatch',
			postDispatchAttr: 'rPalettePostDispatch'
		},

		initialize: function(options){
			//console.log('initializing RialtoPalette');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
		},
	
		
		// ======================================================== PUBLIC METHODS =====================================
		
		
		// ======================================================== SETUP METHODS ======================================
		// setup an elmt
		setup: function(elmt) {
			var options = {};
			if(maxSelections = elmt.get(self.options.maxSelectionsAttr)) options.maxSelections = maxSelections;
			if(clickElmtSelector = elmt.get(self.options.clickElmtSelectorAttr)) options.clickElmtSelector = clickElmtSelector;
			if(checkboxSelector = elmt.get(self.options.checkboxSelectorAttr)) options.checkboxSelector = checkboxSelector;
			var paletteObject = new RialtoPaletteObject(elmt, options);
		},
		
		// setup all relevant elmts in a given container
		setupContainer: function(container){
			container.getElements('.'+self.options.className).each(function(elmt){ // for each elmt in the container
				self.setup(elmt); // setup the plugin
			});
		}
		
		// ======================================================== PRIVATE METHODS ======================================
		
	});
	
})();
