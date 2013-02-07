var RialtoDatePicker = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			className: 'rialtoDatePicker',
			paramPosType: 0,
			paramTypeDate: 'date',
			paramTypeTime: 'time',
			paramTypeBoth: 'both',
			paramPosFormat: 1,
			pickerOptions: {
			    timePicker: false,
				format: '%b %d, %Y',
			    positionOffset: {x: 5, y: 0},
			    pickerClass: 'datepicker_rialto',
			    useFadeInOut: !Browser.ie
			}
		},
		
		initialize: function(options){
			//console.log('initializing RialtoDatePicker');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
		},
	
	
		// ======================================================== PUBLIC METHODS ======================================
		// setup all relavant elmts in a given container
		setupContainer: function(container){
			container.getElements('.'+self.options.className).each(function(elmt){ // for each elmt in the container
				self.setupElmt(elmt); // setup the plugin
			});
		},
		
		// setup up a datepicker
		setupElmt: function(elmt){
			new Picker.Date(elmt, self.options.pickerOptions); // mootools datepicker
		},
		
		
		// ======================================================== PRIVATE METHODS ======================================
		
	});
	
})();
