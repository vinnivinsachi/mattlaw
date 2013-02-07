var RialtoScroll = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			paramPosTarget: 0
		},
		
		scrollTween: { // scroll tween options
			duration: 200,
			link: 'cancel',
			transition: 'sine:out'
		},
		
		windowScroll: null, // the window scroll Fx.Scroll object (setup in self.initialize())
		
		initialize: function(options){
			console.log('initializing RialtoScroll');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
			self.windowScroll = new Fx.Scroll(window, self.scrollTween); // set up the windows Fx.Scroll object
		},
	
	
		// ======================================================== PUBLIC METHODS ======================================
		handleClick: function(rialtoEvent, params) {
			self.scrollWindow(params[self.options.paramPosTarget]);
			rialtoEvent.callNext();
		},
		
		// scroll the windows somewhere
		scrollWindow: function(target){
			if(target == 'top') self.windowScroll.toTop(); // scroll to the top
			else self.windowScroll.toElement(target); // scroll to an element
		},
		
		// click on a scroll elmt
		/*click: function(elmt, rialtoEvent){
			if(!elmt) { $Rialto.logError('No elmt was provided'); } // make sure an elmt was passed
			var target = elmt.get(self.options.attr); // get the target
			self.scrollWindow(target); // do the scrolling
		},*/
		
	});
	
})();
