var RialtoLink = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			paramPosType: 0,
			paramTypeAjax: 'ajax',
			paramTypeJson: 'json',
			paramTypeForm: 'form',
			paramTypeNothing: 'nothing',
			preDCBAttr: 'rialtoLinkPreDCB',
			respCBAttr: 'rialtoLinkRespCB',
			formLinkFormIDAttr: 'rialtoLinkFormID'
		},
		
		initialize: function(options){
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
		},
	
	
		// ======================================================== PUBLIC METHODS ======================================
		handleClick: function(rialtoEvent, params) {
			if(params[self.options.paramPosType] == self.options.paramTypeAjax) self.handleAjaxLink(rialtoEvent); // IF AJAX link
			else if(params[self.options.paramPosType] == self.options.paramTypeJson) self.handleJsonLink(rialtoEvent); // ELSE IF JSON link
			else if(params[self.options.paramPosType] == self.options.paramTypeNothing) self.handleNothingLink(rialtoEvent); // ELSE IF nothing link
			else if(params[self.options.paramPosType] == self.options.paramTypeForm) self.handleFormLink(rialtoEvent); // ELSE IF nothing link
			else { // ELSE redirect the page
				var href = rialtoEvent.elmt.get('href');
				if(href) window.location = href;
			}
		},
		
		
		// ======================================================== PRIVATE METHODS ======================================
		handleAjaxLink: function(rialtoEvent, type) {
			if(!$Rialto.callCB(rialtoEvent.elmt.get(self.options.preDCB), rialtoEvent.elmt)) { return false; } // IF PreDCB fails

			var rialtoAjax = $Rialto.getPlugin('RialtoAjax'); // get the plugin	
			var o = { // set ajax options
				url: rialtoEvent.elmt.get('href'), // get the url to load
				onSuccess: function(response){
					self.handleSuccess(response, rialtoEvent);
				}
			};
			if(type == self.options.paramTypeJson) rialtoAjax.jsonRequest(o, rialtoEvent); // make the call
			else rialtoAjax.htmlRequest(o, rialtoEvent); // make the html request call
		},
		
		handleJsonLink: function(rialtoEvent) {
			self.handleAjaxLink(rialtoEvent, self.options.paramTypeJson); // delegate
		},
		
		handleNothingLink: function(rialtoEvent) {
			if($Rialto.callCB(rialtoEvent.elmt.get(self.options.preDCBAttr), rialtoEvent.elmt)) rialtoEvent.callNext(); 
		},
		
		handleFormLink: function(rialtoEvent) {
			var formID = rialtoEvent.elmt.get(self.options.formLinkFormIDAttr);
			var form = $(formID);
			var href = rialtoEvent.elmt.get('href');
			form.set('action', href);
			form.submit();
		},
		
		handleSuccess: function(response, rialtoEvent) {
			if($Rialto.callCB(rialtoEvent.elmt.get(self.options.respCBAttr), [response, rialtoEvent.elmt])) rialtoEvent.callNext();
		}
		
		
	});
	
})();
