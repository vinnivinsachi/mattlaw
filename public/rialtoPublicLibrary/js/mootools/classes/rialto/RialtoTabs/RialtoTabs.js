var RialtoTabs = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			className: 			'RialtoTabs', // the class name
			groupAttr: 		'rialtoTabsGroup', // the elmt attr to use to group tabs together
			urlAttr: 		'rialtoTabsURL', // the url to load upon clicking a tab
			currentClass: 	'rTabsCurrent', // the class for currently selected tabs
			postDCBAttr:	'rialtoTabsPostDCB', // the elmt attr that holds a function to call when activating a tab
			fadeTime: 200 // the length of the fade animations
		},
		
		initialize: function(options){
			console.log('initializing RialtoTabs');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
		},
	
	
		// ======================================================== PUBLIC METHODS ======================================
		// setup an elmt
		setup: function(tab) {
			var groupName = tab.get(self.options.groupAttr); // get group name of tabs
			var containers = $$('['+self.options.groupAttr+'='+groupName+']:not(.'+self.options.className+')'); // get all the containers in this group
			if(containers.length) {
				$Rialto.fx.fadeOut(containers, {duration: 0, hide: true}); // hide all tab content
				if(tab.hasClass(self.options.currentClass)) {
					var containers = $$(tab.get('href')); // get associated containers
					$Rialto.callCB(tab.get(self.options.postDCBAttr), [tab, containers]);
					$Rialto.fx.fadeIn.pass([containers, {duration: 0}]).delay($Rialto.timing+10); // show clicked tab's content
					$Rialto.getPlugin('RialtoLoadReplaces').load(containers); // load replaces in the current container
				}
			}
		},
		
		// setup all relavant elmts in a given container
		setupContainer: function(container){
			container.getElements('.'+self.options.className+'.'+self.options.currentClass).each(function(elmt){ // for each elmt in the container
				self.setup(elmt); // setup the plugin
			});
		},
		
		handleClick: function(rialtoEvent, params) {
			self.click(rialtoEvent.elmt, rialtoEvent);
		},
		
		// click a tab
		click: function(tab, rialtoEvent) {
			if(tab.hasClass(self.options.currentClass)) return; // don't do anything if the clicked tab is the current one
			
			var groupName = tab.get(self.options.groupAttr); // get the group name of clicked tab
			var oldTab = $$('.'+self.options.className+'.'+self.options.currentClass+'['+self.options.groupAttr+'="'+groupName+'"]')[0]; // get the old tab
			if(oldTab) {oldTab.removeClass(self.options.currentClass);} // remove current class
			tab.addClass(self.options.currentClass); // add current class

			if(oldTab) self.hide(oldTab); // hide the old tab's contents
			self.show.pass(tab, rialtoEvent).delay($Rialto.timing+300); // show the new tab's contents
		},

		
		// ======================================================== PRIVATE METHODS ======================================		
		// hide a tab
		hide: function(tab) {
			var href = tab.get('href'); // get href
			//tab.removeClass(self.options.currentClass); // remove current class
			var containers = $$(href); // get associated containers
			if(containers) $Rialto.fx.fadeOut(containers, {hide: true}); // hide tab contents after fade		
		},
		
		// show a tab
		show: function(tab, rialtoEvent){
			//tab.addClass(self.options.currentClass); // add current class
			var containers = $$(tab.get('href')); // get associated containers

			if(url = tab.get(self.options.urlAttr)) { tab.set(self.options.urlAttr, ''); } // get URL to load (IF it exists)

			if(containers) {
				$Rialto.fx.fadeIn(containers); // fade in tab contents
				containers.each(function(container){
					
					if(url) self.loadURLInContainer(container, url); // IF there is a URL to load in the tab
					else $Rialto.getPlugin('RialtoLoadReplaces').load(container);
					
				}); // load replaces in each container	
			}
			if($Rialto.callCB(tab.get(self.options.
				DCBAttr), [tab, containers])) { if(rialtoEvent) { rialtoEvent.callNext(); } };
		},
		
		loadURLInContainer: function(tabContentContainer, url) {
			var rialtoAjax = $Rialto.getPlugin('RialtoAjax'); // get the plugin
			var o = { // set ajax options
				url: url,
				onRequest: function(){
					$Rialto.getPlugin('RialtoLoadingImage').show(tabContentContainer); // show loading image
				}, // show loading image on row
				onSuccess: function(responseHTML){
					var newContent = Elements.from('<span>'+responseHTML+'</span>');
					tabContentContainer.adopt(newContent);
					$Rialto.getPlugin('RialtoPlugins').setupContainer(tabContentContainer);
				},
				onComplete: function(){
					$Rialto.getPlugin('RialtoLoadingImage').hide(tabContentContainer); // show loading image
				} // hide loading image on parent container
			};
			$Rialto.getPlugin('RialtoAjax').htmlRequest(o); // make the call
		}
		
	});
	
})();
