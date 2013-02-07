var RialtoBubble = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options],
		
		initialize: function(options){
			self = this; // avoid conflicts with 'this'
		},
	
		// ======================================================== SETUP METHODS ======================================
		handleClick: function(rialtoEvent) {
			var selectorString = $Rialto.getPlugin('RialtoPlugins').selectorString;
			$Rialto.clickElmt(rialtoEvent.elmt.getParent(selectorString)); // fire event on the first parent
		}
		
		// ======================================================== PRIVATE METHODS ======================================
		
	});
	
})();
