// REQUIRES:
// fancybox
// ui dialog
// validation engine

(function($){
	
	// ============================================================= CONFIGURABLE VARIABLES =============================
	// default options
	var _o = {
		framework: 		null,
		loadingImage: 	'images/loading.gif'
	};
	
	// default messages
	var flashMessageError = 'Something went wrong!!!';
	
	// HTML wrappers
	var loadingImageOverlayHTML = function(){ return "<div id='rialto-loading-image-overlay'><img src='"+_o.loadingImage+"'/></div>"; }
	var loadingImageHTML = function(){ return "<div class='rialto-loading-image'><img src='"+_o.loadingImage+"'/></div>"; }
	var flashMessageHTML = "<div id='rialto-flash-message'><span class='rialto-message-replace' /></div>";
	var dialogHTML = "<div id='rialto-dialog' style='display:none' title='Dialog Title'><span class='rialto-message-replace' /></div>";
	
	
	
	// ============================================================= CONSTANTS =============================
	var RIALTO_LOADED_EVENT = 'rialtoLoaded'; // custom event for loading complete (to hide loading image)
	
	
	// ============================================================= PRIVATE VARIABLES =============================
	var _dialog = $(dialogHTML);
	var _framework;

	
	// ============================================================= PRIVATE FUNCTIONS =============================
	// attach a loading image to something
	// also attach a listener to remove the loading image
	_attachLoadingImage = function(parentElmt, overlay){
		// make image vertical-align middle in td
			//if(parentElmt[0].nodeName == 'TD') parentElmt.css('display', 'relative');
		// create loading image object
			var img = (overlay) ? $j(loadingImageOverlayHTML()) : $j(loadingImageHTML());
		// add event to elmt for hiding loading image
			parentElmt.bind(RIALTO_LOADED_EVENT, function(e){
				img.fadeOut(function(){ img.remove(); }); // remove the loading image from the DOM
			});
		// add image to parent and show
			img.prependTo(parentElmt).fadeIn();
	};
	// trigger the event event that will hide the loading image
	_triggerHideLoadingImage = function(parentElmt) { parentElmt.trigger(RIALTO_LOADED_EVENT); };
	
	// turn a form into its ajax loading state
	_formLoading = function(form) {
		var submitBtn = form.find('input:submit'); // get submit button
		var submitBtnVal = submitBtn.attr('value'); // save original value text
		// IF loading text is specified
			if(loadingText = submitBtn.attr('loadingText')) { submitBtn.attr('value', loadingText); } // change the button text
		submitBtn.attr('disabled', 'disabled'); // disable the button
		// add event to form for resetting submit button
			form.bind(RIALTO_LOADED_EVENT, function(e){
				submitBtn.attr('value', submitBtnVal); // change the button text back
				submitBtn.removeAttr('disabled'); // enable the button
			});
	};
	// trigger the event event that will hide the loading image
	_triggerFormLoadingComplete = function(form) { form.trigger(RIALTO_LOADED_EVENT); };
	
	// show a javascript flash message
	_flashMessage = function(message) {
		var parentElmt = $('body'); // show it in the body tag
		var flash = $(flashMessageHTML); // create the html
		flash.find('.rialto-message-replace').replaceWith(message);
		flash.prependTo(parentElmt).delay(500).fadeIn(400).delay(1500).fadeOut(400); // add image to parent and show
	};
	
	// when an ajax call is successful
	_ajaxSuccess = function(triggerElmt, data, textStatus, jqXHR) {
		// IF callback attr specified, call the callback function and pass it the json data
			if(callbackName = triggerElmt.attr('rialtoCallback')) {
				try{window[callbackName](data)}catch(err){ $Rialto.throwCatchError(err); }; // callback
				try{window[callbackName+'Page'](data)}catch(err){ $Rialto.throwCatchError(err); }; //callback + 'Page'
			}
		// IF deleteParent attr specified, go up the DOM until you find it and hide it
			if(deleteParent = triggerElmt.attr('rialtoDeleteParent')) triggerElmt.closest(deleteParent).fadeOut();
		// IF redirect attr specified, redirect the page
			if(redirect = triggerElmt.attr('rialtoRedirect')) window.location.href = redirect;
			if(redirectPopup = triggerElmt.attr('rialtoRedirectPopup')) window.location.href = redirectPopup; // redirects the popup to another page
	};
	
	// show a dialog
	_showDialog = function(dialogTitle, confirmBtnCallback) {
		var dialogMessage = 'Are you sure you want to '+dialogTitle; // construct the message
		_dialog.find('.rialto-message-replace').replaceWith(dialogMessage); // insert the message
		_dialog.dialog({
					resizable: false,
					modal: true,
					title: dialogTitle,
					buttons: {
						'Yes' : function() { $(this).dialog('close'); try{confirmBtnCallback();}catch(err){ $Rialto.throwCatchError(err); }; },
						Cancel: function() { $(this).dialog('close'); }
					}
				});
	};
	
	// when you click on a rialtoAjaxLink
	_doAjaxLink = function(clickedElmt) {
		// IF has href, then do ajax call
			if(clickedElmt.attr('href')) $.ajax({
				data: {},
				beforeSend: $.rialtoShowLoading,
				success: function(data, textStatus, jqXHR){ _ajaxSuccess(clickedElmt, data, textStatus, jqXHR); },
				error: $.rialtoFlashMessageError,
				complete: $.rialtoHideLoading,
				type: 'POST',
				dataType: 'json',
				url: _jsonizeURL(clickedElmt.attr('href'))
			});
		// ELSE skip the ajax call and pretend it was successful
			else _ajaxSuccess(clickedElmt);
	};
	
	_popup = function(url) {
		if(_o.framework == 'zend') url = ((url[url.length-1] == '/') ? url.slice(0, -1) : url) + '/layout/popup';
		$.fancybox({
			href: url,
			onComplete: function() { _loadReplaces($('#popup-content')); }
		});
	};
	
	_jsonizeURL = function(url) { return ((url[url.length-1] == '/') ? url.slice(0, -1) : url) + '/format/json'; }
	
	// replace any elements that have a rLoadReplacesURL specified
	_loadReplaces = function(jqParent) {
		var container = jqParent || $('body');
		container.find('[rLoadReplacesURL]').each(function(){
			var elmt = $(this); // the elmt being replaced
			var parent = elmt.parent(); // the container
			_attachLoadingImage(parent);  // show loading image
			$.ajax({
				url: elmt.attr('rLoadReplacesURL'),
				complete: function(jqXHR) {
					_triggerHideLoadingImage(parent); // hide loading image
					var child = $(jqXHR.responseText); // get returned html
					parent.append($(child).hide().fadeIn()); // add to page and fade in
				}
			});
			elmt.remove(); // remove the elmt
		});
	}
	
	// ============================================================= CHAINABLE FUNCTIONS =============================
	// show the loading image on a particular element
	$.fn.rialtoShowLoading = function() {
		// make sure to return this in order for jquery chaining
			return this.each(function(){
				_attachLoadingImage($(this)); // show the loading image
			});
	};
	// hide the loading image on a particular element
	$.fn.rialtoHideLoading = function() {
		// make sure to return this in order for jquery chaining
			return this.each(function(){
				_triggerHideLoadingImage($(this)); // hide the loading image
			});
	};
	
	
	// ============================================================= STATIC FUNCTIONS =============================
	// show the global loading image
	$.rialtoShowLoading = function() { _attachLoadingImage($('html'), true); };
	// hide the global loading image
	$.rialtoHideLoading = function() { _triggerHideLoadingImage($('html')); };
	// flash a generic error message
	$.rialtoFlashMessageError = function() { _flashMessage(flashMessageError); };
	// flash a custom message
	$.rialtoFlashMessage = function(message) { _flashMessage(message); };
	$.rialtoPopup = function(url) { _popup(url); }; // popup the url
	$.rialtoLoadReplaces = function(container) { _loadReplaces($(container)); } // load all rialtoReplaces in the given container
	
	// ============================================================= SETUP =============================
	$.rialtoSetup = function(o) {
		if(o) $.extend(_o, o); // override default options

		$('body').prepend(_dialog); // put the dialog HTML in the DOM
		
		$('.rialtoPopup').live('click', function(e){
			e.preventDefault(); // prevent default behavior
			e.stopPropagation(); // prevent event bubbling
			var clickedElmt = $(this); // get the element that was clicked
			var urlToLoad = clickedElmt.attr('href'); // get the url to load
			_popup(urlToLoad) // open fancybox with the url
		});
		
		$('.rialtoAjaxLink').live('click', function(e){
			e.preventDefault(); // prevent default behavior
			e.stopPropagation(); // prevent event bubbling
			var clickedElmt = $(this); // get the element that was clicked
			// IF has rialtoDialogMessage, then show dialog
				if(dialogTitle = clickedElmt.attr('rialtoDialogTitle')) _showDialog(dialogTitle, function(){ _doAjaxLink(clickedElmt); });
			// ELSE just do the stuff
				else _doAjaxLink(clickedElmt);
		});
		
		$('form').live('submit', function(e){
			var clickedForm = $(this); // get the clicked form
			if(!clickedForm.validationEngine('validate')) return false; // prevent submission if not valide
			// IF rialto-ajax-form
				if(clickedForm.hasClass('rialto-ajax-form')) {
					e.preventDefault(); // prevent default behavior
					clickedForm.ajaxSubmit({
						url: _jsonizeURL(clickedForm.attr('action')),
						dataType: 'json',
						beforeSend: function(){ _formLoading(clickedForm); $.rialtoShowLoading(); },
						success: function(data, textStatus, jqXHR){ _ajaxSuccess(clickedForm, data, textStatus, jqXHR); },
						error: $.rialtoFlashMessageError,
						complete: function(){ _triggerFormLoadingComplete(clickedForm); }
					});
				}
			// ELSE submission goes through as normal
		});
		
	};

})(jQuery)