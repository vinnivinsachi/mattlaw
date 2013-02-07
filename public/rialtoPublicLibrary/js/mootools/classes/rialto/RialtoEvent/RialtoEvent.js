var RialtoEvent = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		//Implements: [Options],
		
		// default options
		//options: {},
		
		toCall: [], // an array of plugins to call
		
		initialize: function(event, fireElmt){
			self = this; // avoid conflicts with 'this'
			//self.setOptions(options); // override default options
			
			if(event) {
				self.originalEvent = event;
				self.clickedElmt = event.target;
			}
			self.elmt = fireElmt;			
		},
		
		// ======================================================== PUBLIC METHODS ======================================
		callNext: function() {
			var pluginString = self.toCall.shift(); // get the next plugin to call
			if(pluginString) { // IF there is a plugin to call
				var pluginInfo = pluginString.split(':'); // split plguin string
				var pluginName = pluginInfo.shift();
				//alert('call: '+pluginName);
				$Rialto.getPlugin(pluginName).handleClick(self, pluginInfo); // call the next plugin
			}
		}
		
	});
	
})();
