// requires RialtoAjax
// requires RialtoFlashMessage
var RialtoForm = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			className: 'RialtoForm',
			paramPosType: 0,
			paramTypeAjax: 'ajax',
			paramTypeJson: 'json',
			preDCBAttr: 'rialtoFormPreDCB', // function to decide whether or not form should submit
			postDCBAttr: 'rialtoFormPostDCB'
		},
		
		initialize: function(options){
			//console.log('initializing RialtoForm');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
		},
	
	
		// ======================================================== SETUP METHODS ======================================
		// setup an elmt
		setup: function(form) {
			self.getValidator(form); // get the validator
		},
		
		// setup all relavant elmts in a given container
		setupContainer: function(container){
			container.getElements('[class*="'+self.options.className+'"]').each(function(elmt){ // for each elmt in the container
				self.setup(elmt); // setup the plugin
			});
		},
		
		handleClick: function(rialtoEvent, params) {
			self.submitForm(rialtoEvent.elmt, params[self.options.paramPosType], rialtoEvent);
		},
		
		
		// ======================================================== PUBLIC METHODS ======================================
		submitForm: function(form, type, rialtoEvent) {
			if(self.validate(form)) { if($Rialto.callCB(form.get(self.options.preDCBAttr), form)) {
				if(type == self.options.paramTypeAjax) { self.submitFormAjax(form, rialtoEvent); }
				else if(type == self.options.paramTypeJson) {self.submitFormJson(form, rialtoEvent); }
				else { self.submitFormNormal(form, rialtoEvent); }
			}};
		},
		
		
		// ======================================================== PRIVATE METHODS ======================================
		submitFormAjax: function(form, rialtoEvent) {
			var url = $Rialto.formatURL(form.get('action'), 'zendNoLayout'); // get url
			form.set('action', url); // set the formatted url
			self.sendAjaxfully(form, rialtoEvent); // send the form
		},
		
		submitFormJson: function(form, rialtoEvent) {
			var url = $Rialto.formatURL(form.get('action'), 'zendJSON'); // get url
			form.set('action', url); // set the formatted url
			self.sendAjaxfully(form, rialtoEvent); // send the form
		},
		
		submitFormNormal: function(form, rialtoEvent) {
			form.submit();
			rialtoEvent.callNext();
		},
		
		// validate form
		validate: function(form){
			var rialtoValidator = self.getValidator(form); // get the validator
			if(rialtoValidator.validate()) return true; // validate the form
			return false;
		},
		
		// send form via ajax
		sendAjaxfully: function(form, rialtoEvent){
			var o = { // set ajax options
				form: form, // the form that was submitted
				onRequest: function(){
					form.getElements('input[type="submit"]').set('disabled', 'disabled'); // disable submit buttons
					//$Rialto.getPlugin('RialtoLoadingImage').show(); // show loading image in the form
				},
				onSuccess: function(data){ self.onFormSubmitSuccess(data, rialtoEvent); },
				onComplete: function(){
					form.getElements('input[type="submit"]').set('disabled', ''); // enable submit buttons
					//$Rialto.getPlugin('RialtoLoadingImage').hide(); // show loading image in the form
				},
			};
			$Rialto.getPlugin('RialtoAjax').formRequest(o); // send the form
		},
		
		// setup an elmt
		setup: function(form) {
			return;
			self.getValidator(form); // get the validator
		},
		
		// setup all relavant elmts in a given container
		setupContainer: function(container){
			container.getElements('.'+self.options.className).each(function(elmt){ // for each elmt in the container
				self.setup(elmt); // setup the plugin
			});
		},
		
		// ======================================================== PRIVATE METHODS ======================================
		// get the validator for a form
		getValidator: function(form){
			if(!form.get('validator').isRialto) new RialtoValidator(form); // first time setup
			return form.get('validator'); // return the validator;
		},
		
		onFormSubmitSuccess: function(data, rialtoEvent) {
			var postDCB = rialtoEvent.elmt.get(self.options.postDCBAttr);
			if($Rialto.callCB(postDCB, [data, rialtoEvent.elmt])) { rialtoEvent.callNext(); }
		}
		
	});
	
})();
