var RialtoAjax = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			appendTargetIDAttr: 'rialtoAjaxAppendTargetID', // pass self to append to the item that was clicked
			replaceTargetIDAttr: 'rialtoAjaxReplaceTargetID', // pass 'self' to replace the item that was clicked
			method: 'get',
			link: 'ignore',
			noCache: true,
			evalScripts: true,
			onRequest: function(){ /*$Rialto.getPlugin('RialtoLoadingImage').show();*/ },
			onError: function(){ $Rialto.getPlugin('RialtoFlashMessage').showError(); },
			onComplete: function(){ /*$Rialto.getPlugin('RialtoLoadingImage').hide();*/ },
			onFailure: function(xhr){
				$Rialto.getPlugin('RialtoFlashMessage').showError(); // show error message
				$Rialto.logError(xhr); // log error
			}
		},
		
		initialize: function(options){
			//console.log('initializing RialtoAjax');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
		},
	
	
		// ======================================================== PUBLIC METHODS ======================================		
		/**
		 * Make an ajax request for an HTML response.
		 * 
		 * @param Object o Request options.
		 * @throws error if no url is provided.
		 * @return void
		 */
		htmlRequest: function(o, rialtoEvent){
			o = Object.merge(Object.clone(self.options), o);
			if(!o.url) { $Rialto.logError('No url was provided'); } // make sure a url was passed
			o.url = $Rialto.formatURL(o.url, 'zendNoLayout'); // format url to request layout=none
			o = self.addOnSuccess(o, rialtoEvent); // add additional onSuccess functionality
			//console.log('HTML loading: '+o.url);
			htmlRequest = new Request(o); // create HTML request object
			htmlRequest.send(); // send the request
			// TODO MARK: make sure rialtoEvent.callNext() gets called
		},
		
		/**
		 * Make an ajax request for a JSON response.
		 * 
		 * @param o Object Request options.
		 * @throws error if no url is provided.
		 * @return void
		 */
		jsonRequest: function(o, rialtoEvent) {
			o = Object.merge(Object.clone(self.options), o);
			if(!o.url) { $Rialto.logError('No url was provided'); } // make sure a url was passed
			o.url = $Rialto.formatURL(o.url, 'zendJSON'); // format url to request json
			o = self.addOnSuccess(o, rialtoEvent); // add additional onSuccess functionality
			jsonRequest = new Request.JSON(o); // create JSON request object
			jsonRequest.send(); // send the request
		},
				
		/**
		 * Submit a form via ajax.
		 * 
		 * @param Object o Request options.
		 * @throws error if no form is provided.
		 * @return void
		 */
		formRequest: function(o, rialtoEvent){
			if(!o.form) { $Rialto.logError('No form was provided to submit'); return; }  // make sure a form was passed
			o = Object.merge(Object.clone(self.options), o);
			o.data = o.form; // set the data attribute for the request
			o.url = o.form.get('action'); // get the url (action) of the form
			//o.url = overrideURL || o.form.get('action'); // get the url (action) of the form
			o.method = o.form.get('method') || 'post';
			//var passedSuccess = o.onSuccess; // passed success function
			o = self.addOnSuccess(o, rialtoEvent); // add additional onSuccess functionality
			/*o.onSuccess = function(data){ // onSuccess
				if(this.getHeader('content-type') == 'application/json') data = JSON.decode(data); // decode JSON resonses
				if(passedSuccess) passedSuccess(data); // call the passed function
			};*/
			formRequest = new Request(o); // create a Form Request object
			formRequest.send(); // send the request
		},
		
		
		// ======================================================== HELPER METHODS ======================================
		addOnSuccess: function(o, rialtoEvent) {
			if(typeOf(o.onSuccess) == 'function') var passedOnSuccess = o.onSuccess; // copy passed onSuccess function
			o.onSuccess = function(response) {
				if(this.getHeader('content-type') == 'application/json' && typeOf(response) == 'string') response = JSON.decode(response); // decode JSON resonses IF needed
				self.ajaxSuccess(response, rialtoEvent);
				if(passedOnSuccess) passedOnSuccess(response); // run passedOnSuccess function if it was provided
			}
			return o;
		},
		
		ajaxSuccess: function(response, rialtoEvent) {
			if(rialtoEvent) {
				var appendTargetID = rialtoEvent.elmt.get(self.options.appendTargetIDAttr);
				var replaceTargetID = rialtoEvent.elmt.get(self.options.replaceTargetIDAttr);
				if(appendTargetID) {
					var newElmt = Elements.from('<span>'+response+'</span>')[0]; // get new elmt
					if(appendTargetID == 'self') appendTargetID = rialtoEvent.elmt; // optionally append to self
					newElmt.fade('hide').inject(appendTargetID, 'bottom').fade('in'); // replace old elmt with new and fade in
					$Rialto.getPlugin('RialtoPlugins').setupContainer(newElmt);
				} else if(replaceTargetID) {
					var newElmt = Elements.from('<span>'+response+'</span>')[0]; // get new elmt
					if(replaceTargetID == 'self') replaceTargetID = rialtoEvent.elmt; // optionally replace self
					newElmt.fade('hide').replaces(replaceTargetID).fade('in'); // replace old elmt with new and fade in
					$Rialto.getPlugin('RialtoPlugins').setupContainer(newElmt);
				}
			}
		}
		
		
	});
	
})();
