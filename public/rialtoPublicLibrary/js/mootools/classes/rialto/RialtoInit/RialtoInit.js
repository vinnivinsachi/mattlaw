var RialtoInit = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			initCBAttr: 'rialtoInitCB'
		},
		
		initialize: function(options){
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
		},
		
		// ======================================================== PUBLIC METHODS ======================================
		handleClick: function(rialtoEvent) {
			if($Rialto.callCB(rialtoEvent.elmt.get(self.options.initCBAttr), [rialtoEvent.elmt, rialtoEvent])) { rialtoEvent.callNext(); }
		}
		
	});
	
})();
