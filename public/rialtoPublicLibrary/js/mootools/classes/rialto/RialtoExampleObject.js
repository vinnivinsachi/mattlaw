var RialtoExampleObject = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			
		},
		
		$rialtoParentClass: null,
		object: null,
		
		initialize: function(elmt, options){
			//console.log('initializing RialtoPalette');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
			self.$rialtoParentClass = $Rialto.getPlugin('RialtoParentClass');
			self.object = elmt;
		},
	
		
		// ======================================================== PUBLIC METHODS =====================================
		
		
		// ======================================================== EVENT HANDLERS ======================================
		
		
	});
	
})();
