// requires RialtoAjax
// requires RialtoLoadingImage
var RialtoLoadReplaces = (function(){

	// TODO MARK: automatically add layout/none to loading stuff?
	// TODO MARK: add callback and ending callback functionality and preDispatch
	// TOOD MARK: merge common options with an ajaxoptions options
	
	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options, Events],
		
		LOADED_EVENT: 'rialtoLoadReplacesLoaded',
		
		// default options
		options: {
			className: 'RialtoLoadReplaces',
			replaceURLAttr: 'rialtoLoadReplacesURL',
			showLoadingImage: true, // default to show the loading image
			RialtoLoadingImage: {}
		},
		
		initialize: function(options){
			// console.log('initializing RialtoLoadReplaces');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
		},
		
		
		// ======================================================== PUBLIC METHODS ======================================
		handleClick: function(rialtoEvent) {
			self.loadOne(rialtoEvent.elmt, null, rialtoEvent);
		},
		
		// check if there are any load replaces to load
		needsReplacing: function(container) {
			var loadReplaces = self.getLoadReplaces(container);
			return loadReplaces.length;
		},

		/**
		 * Replace any elements that have a [self.options.replaceTag] tag.
		 * 
		 * @param elmt container The container in which to load and replaces.
		 * @param bool showLoading Show a loading image in container if true.
		 * @return void
		 */
		load: function(containers, showLoading){
			if(typeOf(containers) == 'elements') { containers.each(function(container){ self.loadContainer(container, showLoading); }); } // IF a group elements load each individually
			else self.loadContainer(containers, showLoading); // delegate to loadContainer()
		},
		
		
		// ======================================================== PRIVATE METHODS ======================================
		// load a single container
		loadContainer: function(container, showLoading) {
			var loadReplaces = self.getLoadReplaces(container); // get all load replaces in container
			loadReplaces.each(function(lr){ $Rialto.clickElmt(lr); }); // delegate each load replaces to it's handleClick() method
		},
		
		// load a single container
		loadOne: function(elmt, showLoading, rialtoEvent) {
			if(!elmt) $Rialto.throwCatchError('No elmt provided'); // make sure an elmt was provided
			var rialtoAjax = $Rialto.getPlugin('RialtoAjax');
			if(showLoading == null) showLoading = self.options.showLoadingImage // option to show loading image
			var url = elmt.get(self.options.replaceURLAttr); // get the URL to load
			if(!url) { $Rialto.throwCatchError('No URL provided'); } // make sure URL was provided
			url = $Rialto.formatURL(url, 'zendNoLayout'); // format url for no Zend layout
			var parent = elmt.getParent(); // find the parent container (for loading image)
			var o = { // set ajax options
				method: 'get', // setting the method to get!
				url: url,
				onRequest: function(){ if(showLoading) self.showLoadingImage(parent); }, // show loading image on parent container
				onComplete: function(){ if(showLoading) self.hideLoadingImage(parent); } // hide loading image on parent container
			};
			elmt.set(rialtoAjax.options.replaceTargetIDAttr, 'self'); // make elmt replace itself
			rialtoAjax.htmlRequest(o, rialtoEvent); // make the call
		},
		
		// loadSingleReplaces: function(elmt, showLoading) {
		// 		var url = elmt.get(self.options.replaceTag); // get the URL to load
		// 		url = $Rialto.formatURL(url, 'zendNoLayout');
		// 		if(url) { // IF there is a URL
		// 			var parent = elmt.getParent(); // find the parent container
		// 			var o = { // set ajax options
		// 				method: 'get', // setting the method to get!
		// 				url: url,
		// 				onRequest: function(){ if(showLoading) self.showLoadingImage(parent); }, // show loading image on parent container
		// 				onSuccess: function(responseJSON, responseText){
		// 					self.onSuccess(elmt, responseJSON, responseText, true, parent);
		// 				},
		// 				onFailure: function(xhr){
		// 					$Rialto.getPlugin('RialtoFlashMessage').showError(); // show error message
		// 					console.log(xhr);
		// 				},
		// 				onComplete: function(){ if(showLoading) self.hideLoadingImage(parent); } // hide loading image on parent container
		// 			};
		// 			$Rialto.getPlugin('RialtoAjax').htmlRequest(o); // make the call
		// 		}
		// 	},
		
		// show a loading image in a container
		showLoadingImage: function(container) {
			self.getLoadingImage().show(container); // show loading image
		},
		// hide a loading image in a container
		hideLoadingImage: function(container) {
			self.getLoadingImage().hide(container); // hide loading image
		},		
		
		// on successfull load
		onSuccess: function(elmt, responseJSON, responseText, finished, container){
			// var rialtoLoadReplaces = $Rialto.getPlugin('RialtoLoadReplaces'); // get RialtoLoadReplaces plugin
			// rialtoLoadReplaces.addEvent(rialtoLoadReplaces.LOADED_EVENT, function(container){ self.setupContainer(container); }); // setup listener for loaded stuff
			var parent = elmt.getParent(); // get parent container
			var newElmt = Elements.from('<span>'+responseJSON+'</span>', false)[0]; // get new elmt
			// console.log(newElmt);
			newElmt.fade('hide').replaces(elmt).fade('in'); // replace old elmt with new and fade in
			self.fireEvent(self.LOADED_EVENT, parent); // fire loaded event for self
			if(finished) container.fireEvent(self.LOADED_EVENT); // fire loaded event for container
		},
		
		
		// ======================================================== PRIVATE METHODS ======================================	
		// get RialtoLoadingImage instance
		getLoadingImage: function(){ return $Rialto.getPlugin('RialtoLoadingImage'); }, // get loading image plugin
		
		getLoadReplaces: function(container) {
			if(container.hasClass(self.options.className)) var loadReplaces = [container];
			else var loadReplaces = container.getElements('.'+self.options.className); // return number of load replaces
			return loadReplaces;
		}
		
	});
	
})();
