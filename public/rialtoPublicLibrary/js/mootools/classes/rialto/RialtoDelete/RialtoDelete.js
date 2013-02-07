var RialtoDelete = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			className: 'rialtoDelete', // the class name
			selectorParamPos: 'div'
		},
		
		initialize: function(options){
			//console.log('initializing RialtoDelete');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
		},
	
	
		// ======================================================== PUBLIC METHODS ======================================
		/**
		 * Looks up the DOM tree (including the elmt itself) for the first parent that matches the given selector, and deletes it.
		 * 
		 * @param Object elmt The element to delete, or who's parent to delete.
		 * @return void
		 */
		handleClick: function(rialtoEvent, params) {
			var selector = self.options.selectorParamPos; // get the selector
			//console.log(params);
			//console.log(selector);
			console.log(rialtoEvent.elmt);
			if(!selector) $Rialto.fx.fadeOut(rialtoEvent.elmt, {destroy: true}); // fade out and delete the elmt
			else $Rialto.fx.fadeOut(rialtoEvent.elmt.getParent(selector), {destroy: true}); // fade out and delete the parent elmt
		},
		
	});
	
})();
