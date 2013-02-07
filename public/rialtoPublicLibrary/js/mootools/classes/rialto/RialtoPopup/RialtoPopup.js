var RialtoPopup = (function(){

	// TODO MARK: make our own popup plugin instead of using a jQuery one
	
	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			preDCBAttr: 'rialtoPopupPreDCB', // function to perform about the popup
			paramPosType: 0,
			paramPosWindowName: 1,
			paramTypeWindow: 'window'
		},
		
		initialize: function(options){
			//console.log('initializing RialtoPopup');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
		},
		
		
		// ======================================================== PUBLIC METHODS ======================================
		handleClick: function(rialtoEvent, params) {			
			var preDCB = rialtoEvent.elmt.get(self.options.preDCBAttr); // get predispatch callback
			if(!$Rialto.callCB(preDCB, rialtoEvent.elmt)) return false; // perform a predispatch call.

			var url = rialtoEvent.elmt.get('href'); // get the url to load
			url = $Rialto.formatURL(url, 'zendPopup'); // for auto-setting the layout in zend
			
			if(params[self.options.paramPosType] == self.options.paramTypeWindow) {
				var windowName = params[self.options.paramPosWindowName];
				self.window(url, rialtoEvent, windowName);
			} else { self.show(url, rialtoEvent); }
		},
		
		/**
		 * Popup a url in a javscript popup. (delegates to jQuery fancybox).
		 * 
		 * @param string url The url to load into the popup.
		 * @param function onComplete The function to call once the content has been loaded.
		 * @return void
		 */
		show: function(url, rialtoEvent) {
			if(!url) return; // make sure a url was passed
			$j.fancybox({
				href: url,
				onComplete: function(){ // open fancybox with the url
					$Rialto.getPlugin('RialtoPlugins').setupContainer($$('#fancybox-content')[0]);
					$Rialto.getPlugin('RialtoLoadReplaces').load($$('#fancybox-content')[0], true); // start loading the replaces
				}
			});
			if(rialtoEvent) { rialtoEvent.callNext(); }
		},
		
		// close the popup
		close: function(){
			$j.fancybox.close();
		},
		
		// create a new popup window
		window: function(url, rialtoEvent, windowName) {
			var url = rialtoEvent.elmt.get('href'); // get the url to load
			url = $Rialto.formatURL(url, 'zendNoTop'); // for auto-setting the layout in zend			
			var windowName = windowName || 'rialtoPopup';
			var options = 'width=1080,height=700,resizable=0,scrollbars=1,toolbar=0,status=0';
			var popWindow = window.open(url, windowName, options);
			popWindow.focus();
			if(rialtoEvent) { rialtoEvent.callNext(); }
		}
		
	});
	
})();
