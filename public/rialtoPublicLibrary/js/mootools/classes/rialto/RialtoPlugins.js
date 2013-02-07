// requires Rialto
var RialtoPlugins = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		// TODO MARK: make a function for clicking an element programatically
		// TODO MARK: try catch of callbacks is making debugging difficult
		
		// TODO MARK: fix the ignoring of clicks on forms
		
		Implements: [Options],
		
		// default options
		options: {
			// framework: 'zend', // what framework is being used?
			oneTimeSetupPlugins: ['RialtoLoadingImage'], // plugins to setup upon initial load
			setupPlugins:	['RialtoFlashMessage', 'RialtoTooltip', 'RialtoDatePicker', 'RialtoForm', 'RialtoTabs', 'RialtoTableAccordion', 'RialtoRolloverImage', 'RialtoImageBook', 'RialtoImageScrollSwitch', 'RialtoPagination', 'RialtoPalette', 'RialtoFilters', 'RialtoStars', 'RialtoScrollable'], // plugins to setup on any loading (with events other than click)
			noClickClasses:	[], // classes that shouldn't fire the default rialto click handler'
			clickOnLoadClass: 'rialtoClickOnLoad', // class to make elmt auto click on page or partial load			
			// setupOnLoadClass: 'rSetupOnLoad',
		},
		
		selectorString: '[class*="Rialto"]',
		pluginsRegex: /Rialto[\w:]*/g,
		//elmt: null, // clicked elmt
		ignoreNextClickEvent: false, // ignore the next click event
		
		initialize: function(options){
			//console.log('initializing RialtoPlugins');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
			
			// TODO MARK: change body to window?
			var body = $('body'); // get the body
			if(!body) alert('You must give <body> id=\'body\''); // make sure body has an ID
			body.addEvent('click:relay('+self.selectorString+':not(form))', self.handleClick); // setup generic click listener
			//body.addEvent('click:relay(.'+self.options.clickOnLoadClass+')');
			body.addEvent('submit:relay('+self.selectorString+')', function(e, elmt){ self.handleClick(e, elmt, true); }); // setup generic form submit listener
			
			//$Rialto.getPlugin('RialtoLoadingImage'); // get rialtoLoadingImage plugin
			
			// var rialtoLoadReplaces = $Rialto.getPlugin('RialtoLoadReplaces'); // get RialtoLoadReplaces plugin
			// 			rialtoLoadReplaces.addEvent(rialtoLoadReplaces.LOADED_EVENT, function(container){ self.setupContainer(container); }); // setup listener for loaded stuff

			self.setupContainer($(document.body), true); // setup classes that don't use a click handler
			$$('.'+self.options.setupOnLoadClass).each(function(elmt){ self.setupContainer(elmt); }); // setup elmts that need to be setup upon load
		},

		// setup stuff that doesn't use click handler
		setupContainer: function(container, initialSetup){
			if(!self.options.setupPlugins) return; // make sure there are classes to set up
			if(!container) return; // make sure a container was passed
			//console.log('Rialto setting up: '+self.options.setupPlugins+' in: '+container);
			
			if(initialSetup) { self.options.oneTimeSetupPlugins.each(function(plugin, index){ // FOR EACH plugin specified needing special setup
				$Rialto.getPlugin(plugin).setupContainer(container); // call setupContainer() method
			}); } else {
				$Rialto.getPlugin('RialtoLoadReplaces').load(container, true);
			}
			self.options.setupPlugins.each(function(plugin, index){ // FOR EACH plugin specified needing special setup
				$Rialto.getPlugin(plugin).setupContainer(container); // call setupContainer() method
			});
			
			if(container.hasClass(self.options.clickOnLoadClass)){ $Rialto.clickElmt(container); } // possibly auto-click continer
			container.getElements('.'+self.options.clickOnLoadClass).each(function(elmt){ $Rialto.clickElmt(elmt); }); // possibly auto click elements
		},
		
		// handle a click
		handleClick: function(event, fireElmt, includeAllClasses) {
			// TODO MARK: don't call endingCall for non-click classes
			if(typeOf(event.stop) == 'function') { event.stop(); } // stop the event
			var rialtoEvent = new RialtoEvent(event, fireElmt); // create rialto event
			console.log(rialtoEvent);
			var toCall = rialtoEvent.elmt.get('class').match(self.pluginsRegex); // get all rialto plugins to call from elmt class names
			toCall.unshift('RialtoInit'); // add RialtoInit to beginning of plugins array
			if(!includeAllClasses) self.options.noClickClasses.each(function(className){ self.toCall.erase(className); }); // remove all classes that shouldn't respond to a click
			toCall.push('RialtoClosure'); // add RialtoClosure to the end
			
			rialtoEvent.toCall = toCall; // set the plugins to call in the event
						
			rialtoEvent.callNext(); // call the first plugin
			
			return true;

			
			
			//console.log('handleClick()');
			if(self.isIgnoringNextClick()) { // IF ignoring next click
				console.log('RialtoPlugins ignoring click');
				//self.stopEvent(event); // stop the event
				self.unignoreNextClick(); // reset the ignore flag
				return; // interrupt method execution
			}
		},
		
		// ignore the next click (optionally only ignor for certain amount of time)
		ignoreNextClick: function(time) {
			self.ignoreNextClickEvent = true; // ignore the next click
			if(time) self.unignoreNextClick.delay(time); // reset the ignore after time
		},
		isIgnoringNextClick: function() { return self.ignoreNextClickEvent; }, // will ignore next click?
		unignoreNextClick: function() { self.ignoreNextClickEvent = false; }, // don't ignore the next click		
		
		
		// ======================================================== MAIN PLUGINS ======================================
		/*// click on load
		rialtoClickOnLoad: function() {
			self.callNextPlugin(); // call next plugin
		},
		
		// dialog
		rialtoDialog: function(){
			//self.stopEvent(); // stop the event
			var rialtoDialog = $Rialto.getPlugin('RialtoDialog'); // get the plugin
			rialtoDialog.start(self.elmt, self.callNextPlugin); // show dialog / possibly call next plugin
		},
		
		// popup
		rialtoPopup: function(){
			//self.stopEvent(); // stop the event
			var rialtoPopup = $Rialto.getPlugin('RialtoPopup'); // get the plugin
			
			var rialtoPopupPreDispatchCallback = self.elmt.get('rialtoPopupPreDispatchCallback'); // get predispatch callback
			if($Rialto.callCallback(rialtoPopupPreDispatchCallback, self.elmt) === false) return; // perform a predispatch call.
			
			var url = self.elmt.get('href'); // get the url to load
			if(self.options.framework == 'zend') url = $Rialto.formatURL(url, 'zendPopup'); // for auto-setting the layout in zend
			rialtoPopup.show(url, function(){ // open fancybox with the url
				//self.init($j('#popup-content')); // initialize stuff in the popup
				//self.loadReplaces($$('#fancybox-content')[0]); // load replace content
				self.setup($$('#fancybox-content')[0]); // setup stuff in the popup
				self.loadReplaces($$('#fancybox-content')[0]); // start loading the replaces
			});
			self.callNextPlugin(); // call next plugin
		},
		
		// popup window
		rialtoPopupWindow: function(){
			//self.stopEvent(); // stop the event
			var rialtoPopup = $Rialto.getPlugin('RialtoPopup'); // get the plugin
			var url = self.elmt.get('href'); // get the url to load
			if(self.options.framework == 'zend') url = $Rialto.formatURL(url, 'zendNoTop'); // for auto-setting the layout in zend
			rialtoPopup.popupWindow(url);
			self.callNextPlugin(); // call next plugin
		},
		
		// ajax link (up to server what to return) // defaults to html request
		rialtoAjaxLink: function(format){
			var rialtoAjaxLinkPreDispatchCallback = self.elmt.get('rialtoLinkPreDispatchCallback'); // get predispatch callback
			if($Rialto.callCallback(rialtoAjaxLinkPreDispatchCallback, self.elmt) === true) {
				var rialtoAjax = $Rialto.getPlugin('RialtoAjax'); // get the plugin
				var url = self.elmt.get('href'); // get the url to load
				if(format == 'json') url = $Rialto.formatURL(url, 'zendJSON'); // possibly format url to request json
				else url = $Rialto.formatURL(url, 'zendNoLayout'); // possibly format url to request layout=none
				if(url) {
					var o = { // set ajax options
						url: url,
						onRequest: function(){ $Rialto.getPlugin('RialtoLoadingImage').show(); },
						onSuccess: function(responseJSON, responseText){
							self.ajaxSuccess(self.elmt, responseJSON, responseText);
							self.callNextPlugin(); // call next plugin
						},
						onError: function(){ $Rialto.getPlugin('RialtoFlashMessage').showError(); },
						onComplete: function(){ $Rialto.getPlugin('RialtoLoadingImage').hide(); }
					};
					if(format == 'json') rialtoAjax.jsonRequest(o); // make the call
					else rialtoAjax.htmlRequest(o); // make the html request call
				}
			}
		},
		
		// json ajax link (ask server to return JSON)
		rialtoJsonLink: function(){
			self.rialtoAjaxLink('json'); // delegate to existing function
		},
		
		// tooltips
		rialtoTooltip: function(){
			//self.stopEvent(); // stop the event
			var rialtoTooltip = $Rialto.getPlugin('RialtoTooltip'); // get the plugin
			rialtoTooltip.click(self.elmt); // show the tooltip contents
			self.callNextPlugin(); // call next plugin
		}, // does nothing
		rialtoTooltipClick: function(){
			//self.stopEvent(); // stop the event
			var rialtoTooltip = $Rialto.getPlugin('RialtoTooltip'); // get the plugin
			self.loadReplaces(self.elmt); // start loading the replaces
			rialtoTooltip.click(self.elmt); // show the tooltip contents
			self.callNextPlugin(); // call next plugin
		},
		rialtoTooltipClickAlways: function(){
			self.rialtoTooltipClick(); // delegate to other function
		},
		
		// image books
		/*rialtoImageBook: function(){
			//self.stopEvent(); // stop the event
			var rialtoImageBook = $Rialto.getPlugin('RialtoImageBook'); // get the plugin
			rialtoImageBook.click(self.clickedElmt); // click the thumbnail
			self.callNextPlugin(); // call next plugin
		},
		
		// validates a form
		rialtoForm: function(){
			self.callNextPlugin();
			return;
			var rialtoForm = $Rialto.getPlugin('RialtoForm'); // get the plugin
			var result = rialtoForm.validate(self.elmt); // validate the parent form
			//if(result) self.callNextPlugin(); // call next plugin
			if(result) self.elmt.submit();
			//else self.stopEvent(); // stop the event
		},
		
		// submits a form via ajax (up to server how to respond)
		rialtoAjaxForm: function(format){
			var rialtoAjaxFormPreDispatchCallback = self.elmt.get('rialtoFormPreDispatchCallback'); // get predispatch callback
			if($Rialto.callCallback(rialtoAjaxFormPreDispatchCallback, self.elmt) === true) {
				var rialtoForm = $Rialto.getPlugin('RialtoForm'); // get the plugin
				var url = $Rialto.formatURL(self.elmt.get('action'), 'zendNoLayout'); // get url
				if(format == 'json') url = $Rialto.formatURL(url, 'zendJSON'); // optionally ask for a JSON response
				self.elmt.set('action', url); // format the form url
				rialtoForm.send(self.elmt, function(data){ self.responseCallback(data); self.callNextPlugin(); }); // send the form / call callbacks and next plugin onSuccess
			}
		},
		
		// submits a form via ajax (asks server for JSON response)
		rialtoJsonForm: function(){
			self.rialtoAjaxForm('json'); // delegate to previous method
		},
		
		// tabs
		rialtoTabs: function(){
			//self.stopEvent(); // stop the event
			var rialtoTabs = $Rialto.getPlugin('RialtoTabs'); // get the plugin
			rialtoTabs.click(self.elmt); // do the tab stuff for the clicked elmt
			self.callNextPlugin(); // call next plugin
		},
		
		// rialto deletes
		rialtoDelete: function(){
			//self.stopEvent(); // stop the event
			var rialtoDelete = $Rialto.getPlugin('RialtoDelete'); // get the plugin
			rialtoDelete.delete(self.elmt); // delete the elmt or a parent elmt
			self.callNextPlugin(); // call next plugin
		},
		// table accordion row
		rialtoTableAccordionRow: function(){
			//self.stopEvent(); // stop the event
			var rialtoTableAccordion = $Rialto.getPlugin('RialtoTableAccordion'); // get the plugin
			rialtoTableAccordion.clickRow(self.elmt); // select the row
			self.callNextPlugin(); // call next plugin
		},
		
		// scrolling
		rialtoScroll: function(){
			//self.stopEvent(); // stop the event
			var rialtoScroll = $Rialto.getPlugin('RialtoScroll'); // get the plugin
			rialtoScroll.click(self.elmt); // process the clicked scroll elmt
			self.callNextPlugin(); // call next plugin
		},
		
		// a regular link (allow default functionality)
		rialtoLink: function() {
			var href = self.elmt.get('href'); // get href
			window.location = href; // redirect the page
		},
		
		// a function that is called after everyting else has been run
		rialtoClosureCallback: function() {
			if(self.closureCallback) try{window[self.closureCallback](self.elmt)}catch(err){ $Rialto.throwCatchError(err); }; // call the ending function
		},
		
		// bubble an event up
		rialtoBubble: function() {
			$Rialto.clickElmt(self.elmt.getParent(self.selectorString)); // fire event on the first parent
		},
		
		rialtoFiltersListItem: function() {
			if($Rialto.getPlugin('RialtoFilters').clickListItem(self.elmt)) self.callNextPlugin();
		},
		rialtoFiltersX: function() {
			if($Rialto.getPlugin('RialtoFilters').clickX(self.elmt)) self.callNextPlugin();
		},
		rialtoClearFilters: function() {
			if($Rialto.getPlugin('RialtoFilters').clickClearFilters(self.elmt)) self.callNextPlugin();
		},
		
		rialtoLoadReplaces: function() {
			self.loadReplaces(self.elmt, true);
		},
		
		rialtoFormLink: function() {
			var formIDAttr = 'rialtoFormLinkFormID';
			var formID = self.elmt.get(formIDAttr);
			var form = $(formID);
			var href = self.elmt.get('href');
			form.set('action', href);
			form.submit();
		},
		
		rialtoDropdownHeader: function() {
			if($Rialto.getPlugin('RialtoDropdown').clickHeader(self.elmt)) self.callNextPlugin();
		},*/
		
		// ======================================================== PRIVATE METHODS ======================================
		// stop the  event
		stopEvent: function(event){
			var eventToStop = event || self.event; // get the event to stop
			if(typeof eventToStop.stop == 'function') eventToStop.stop(); // stop the event
		},
		
		// when an ajax call is successful
		ajaxSuccess: function(triggerElmt, responseJSON, responseText) {
			console.log('ajaxSuccess called');
			var appendTargetID = self.elmt.get(self.options.appendTargetIDAttr);
			var replacesTargetID = self.elmt.get(self.options.replacesTargetIDAttr);
			console.log(replacesTargetID);
			if(appendTargetID) {
				var newElmt = Elements.from('<span>'+responseJSON+'</span>')[0]; // get new elmt
				newElmt.fade('hide').inject(appendTargetID, 'bottom').fade('in'); // replace old elmt with new and fade in
				self.setup(newElmt);
			} else if(replacesTargetID) {
				var newElmt = Elements.from('<span>'+responseJSON+'</span>')[0]; // get new elmt
				newElmt.fade('hide').replaces(replacesTargetID).fade('in'); // replace old elmt with new and fade in
				self.setup(newElmt);
			}
			//$Rialto.getPlugin('RialtoFlashMessage').show('Ajax Success'); // show a flash message
			self.responseCallback(responseJSON); // callback functions
		},
		
		// call the init function
		// initCallback: function() {
		// 		var initCallback = self.elmt.get(self.options.initCallbackAttr); // get init callback
		// 		if(initCallback) try{ if(window[initCallback](self.elmt) === false) return; }
		// 		catch(err){ 
		// 			 console.log(self.elmt); 
		// 			 $Rialto.throwCatchError(err); 
		// 		}; // call init IF provided
		// 	},
		
		// call JSON response function on elmt
		responseCallback: function(data){
			if(callbackName = self.elmt.get(self.options.responseCallbackAttr)) { // IF a response callback is specified
				try{window[callbackName](data, self.elmt)}catch(err){ $Rialto.throwCatchError(err); }; // callback
				if(window[callbackName+'Page']) try{window[callbackName+'Page'](data, self.elmt)}catch(err){ $Rialto.throwCatchError(err); }; //callback + 'Page'
			}
			if(data.success === false) $Rialto.getPlugin('RialtoFlashMessage').show(data.error.message); // flash error message
		},
		
		// load replaces
		loadReplaces: function(container, thisElmt){
			console.log('loading replaces on: '); console.log(container);
			if(!container) return; // make sure a container was passed
			if(!thisElmt) $Rialto.getPlugin('RialtoLoadReplaces').load(container); // load replaces
			else $Rialto.getPlugin('RialtoLoadReplaces').loadSingleReplaces(container, true); // load replaces
		}

	});
	
})();
