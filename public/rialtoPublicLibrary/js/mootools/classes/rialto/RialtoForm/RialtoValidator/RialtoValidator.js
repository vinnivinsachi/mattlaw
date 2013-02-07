var RialtoValidator = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		Extends: Form.Validator.Inline,
		//Implements: [Options],
		
		// default options
		options: {
			adviceClass: 'rv-advice',
			showError: function(errorElmt){
				//console.log(errorElmt);
				errorElmt.setStyle('display', 'inline-block'); // set display to 
				if (errorElmt.fade) errorElmt.fade('in');
				else errorElmt.setStyle('display', 'inline-block');
			},
			hideError: function(errorElmt){
				if (errorElmt.fade) errorElmt.fade('out');
				else errorElmt.setStyle('display', 'none');
			},
			errorPrefix: '',
			stopOnFailure: false,
			scrollToErrorsOnSubmit: false,
			evaluateOnSubmit: false,
			evaluateFieldsOnBlur: true
		},
		
		isRialto: true,
		
		initialize: function(form){
			//console.log('initializing RialtoValidator');
			self = this; // avoid conflicts with 'this'
			//self.setOptions(options); // override default options
			//self.isRialto = true; // for checking type of plugin on an object
			this.parent(form, self.options); // call parent method
		},
	
	
		// ======================================================== PUBLIC METHODS ======================================
		
		// ======================================================== PRIVATE METHODS ======================================
				
		
		// ======================================================== OVERRIDES ======================================
		// create the advice elmt
		makeAdvice: function(className, field, error, warn){
			//console.log(field);
			var advice = this.parent(className, field, error, warn); // call parent method
			return advice.set('class', self.options.adviceClass); // change error elmt class and return
		},
		
		// insert advice into the DOM (position according to field)
		insertAdvice: function(advice, field){
			this.parent(advice, field); // call parent method
			advice.position({ // position advice
				relativeTo: field,
				edge: 'left',
				position: 'left'
			});

		}
		
	});
	
})();
