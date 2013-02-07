var RialtoDialog = (function(){
	
	var self; // for reference anywhere in the class
		
	// HTML
	dialogHTML = function(){ return "<div id='rialto-dialog' style='display:none' title='Dialog Title'><span class='rialto-message-replace' /></div>" };
		
	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			className: 				'rialtoDialog',
			titleAttr:			'rialtoDialogTitle',
			contentAttr:		'rialtoDialogHTML',
			showCheckCBAttr: 	'rialtoDialogShowCheckCB'
		},
		
		$dialog: $j(dialogHTML()),
		
		initialize: function(options) {
			//console.log('initializing RialtoDialog');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
				
			self.$dialog.appendTo(document.body); // put the dialog HTML in the DOM
		},


		// ======================================================== PUBLIC METHODS ======================================
		handleClick: function(rialtoEvent) {			
			var showCheck = rialtoEvent.elmt.get(this.options.showCheckCBAttr); // get showCheck callback if it exists
			if($Rialto.callCB(showCheck, rialtoEvent.elmt)) { self.show(rialtoEvent.elmt, rialtoEvent.callNext); } // show dialog if preDispatchCallback returns exactly true
			else rialtoEvent.callNext();
		},
		
		
		/**
		 * Displays a dialog for an element.
		 * 
		 * @param Object elmt The element to show the dialog for.
		 * @param string confirmBtnCallback The function to call when the dialog confirm button is clicked.
		 * @return void
		 */
		show: function(elmt, confirmBtnCallback) {
			var dialogTitle = elmt.get(self.options.titleAttr) || 'Confirm'; // get dialog title
			var dialogHTML = elmt.get(self.options.contentAttr) || 'Are you sure?'; // get dialog html
			self.showMessage(dialogTitle, dialogHTML, confirmBtnCallback); // delegate to other method
		},

		showMessage: function(dialogTitle, dialogHTML, confirmBtnCallback, cancelBtnCallback) {
			self.$dialog.find('.rialto-message-replace').replaceWith(dialogHTML); // insert the message
			self.$dialog.dialog({
				resizable: false,
				modal: true,
				title: dialogTitle,
				zIndex: 6000,
				buttons: {
					'Yes' : function() {
						$j(this).dialog('close');
						if(confirmBtnCallback) {
							try{ confirmBtnCallback(); }
							catch(err){ $Rialto.throwCatchError(err); };
						}
					},
					Cancel: function() {
						$j(this).dialog('close');
						if(cancelBtnCallback) {
							try{ cancelBtnCallback(); }
							catch(err){ $Rialto.throwCatchError(err); };
						}
					}
				}
			});
		}
		
		// ======================================================== PROTECTED METHODS ======================================
	
	});
	
})();
