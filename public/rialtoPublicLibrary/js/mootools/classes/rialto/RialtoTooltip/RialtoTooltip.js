var RialtoTooltip = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			className: 'RialtoTooltip',
			paramPosType: 0,
			paramTypeHover: 'hover',
			paramTypeClick: 'click',
			paramTypeClickAlways: 'clickAlways',
			contentClass: 'rTooltipContent',
			contentBodyClass: 'rTooltipBody',
			formIDAttr: 'rialtoTooltipFormID', // the ID of the form to submit and load into the row
			urlAttr: 'rialtoTooltipURL', // the url to load upon clicking a row
			pauseTime: 300
		},
		
		opacityTween: {
			duration: 200,
			link: 'chain',
			property: 'opacity',
			transition: 'sine:out'
		},
		
		initialize: function(options){
			//console.log('initializing RialtoTooltip');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
		},
		
	
		// ======================================================== PUBLIC METHODS ======================================
		setup: function(elmt){
			self.getContent(elmt).set('tween', self.opacityTween); // add tween
			if(elmt.hasClass(self.options.className+':'+self.options.paramTypeHover)) elmt.addEvent('mouseenter', function(event){ self.hover(this); }); // setup mouseenter listener
			elmt.addEvent('mouseleave', function(event){ self.hide(this); }); // setup mouselave event listener
		},
		
		// setup all relavant elmts in a given container
		setupContainer: function(container){
			container.getElements('[class*="'+self.options.className+'"]').each(function(elmt){ // for each elmt in the container
				self.setup(elmt); // setup the plugin
			});
		},
		
		handleClick: function(rialtoEvent) {
			self.click(rialtoEvent.elmt, rialtoEvent);
		},
		
		click: function(elmt, rialtoEvent){
			if(elmt.hasClass(self.options.className+':'+self.options.paramTypeClick)) {
				elmt.removeClass(self.options.className+':'+self.options.paramTypeClick); // remove click class
				elmt.addClass(self.options.className+':'+self.options.paramTypeHover); // add normal tooltip class
				if(url = elmt.get(self.options.urlAttr)) self.loadURLInTooltip(elmt, url);
				self.setup(elmt); // setup element as normal tooltip
			} else if(elmt.hasClass(self.options.className+':'+self.options.paramTypeClickAlways)) {
				if(url = elmt.get(self.options.urlAttr)) self.loadURLInTooltip(elmt, url);
				//self.setup(elmt, true); // setup element as normal tooltip (with no hover)
			}
			//self.stopTween(elmt);
			self.show(elmt); // show the content
		},
		
		
		show: function(elmt, delay){
			self.stopTween(elmt); // stop the current animations
			if(delay) self.getTween(elmt).start(self.getContent(elmt).getStyle('opacity')).wait(self.options.pauseTime); // pause for a bit
			self.getContent(elmt).setStyle('display', 'block'); // display the content
			//console.log(elmt);
			//console.log(self.getContent(elmt)); 
			self.getTween(elmt).start(1); // start fade in
		},
		
		hide: function(elmt){
			self.stopTween(elmt); // stop the current animations
			self.getTween(elmt).start(0).chain(function(){ self.getContent(elmt).setStyle('display', 'none'); }); // cancel current animations and start fade out
		},
		
		hover: function(elmt){
			self.show(elmt, true); // start fade in
		},
		
		
		// ======================================================== PRIVATE METHODS ======================================
		getContent: function(elmt) {
			return elmt.getChildren('.'+self.options.contentClass)[0]; // get the rialtoContent container to be tweened
		},
		
		getTween: function(elmt) {
			return self.getContent(elmt).get('tween'); // get the tween object
		},
		
		stopTween: function(elmt) {
			var tween = self.getTween(elmt); // get the tween
			tween.clearChain(); // clear animation chain
			tween.cancel(); // cancel current animation
		},
		// show loading image in tooltip body
		showLoading: function(tooltipBody) {
			$Rialto.getPlugin('RialtoLoadingImage').show(tooltipBody); // show loading image
		},
		// show loading image in tooltip body
		hideLoading: function(tooltipBody) {
			$Rialto.getPlugin('RialtoLoadingImage').hide(tooltipBody); // hide loading image
		},
		loadURLInTooltip: function(tooltipBody, url) {
			var rialtoAjax = $Rialto.getPlugin('RialtoAjax'); // get the plugin
			url = $Rialto.formatURL(url, 'zendNoLayout');
			var o = { // set ajax options
				method: 'get', // setting the method to get!
				url: url,
				onRequest: function(){ self.showLoading(tooltipBody); }, // show loading image on tooltipBody
				onSuccess: function(responseHTML){
					if(!tooltipBody.hasClass(self.options.clickAlwaysClass)){ // if it is not always click on load
						tooltipBody.set(self.options.urlAttr, null); // so that it doesn't set it anymore. 
					}
					var newElmt = Elements.from('<span>'+responseHTML+'</span>', false)[0]; // get new elmt
					var bodyContainer = tooltipBody.getElement('.'+self.options.contentBodyClass);
					newElmt.inject(bodyContainer);
					$Rialto.getPlugin('RialtoPlugins').setupContainer(tooltipBody);
				},
				onComplete: function(){
					self.hideLoading(tooltipBody); // hide the loading image
				} // hide loading image on parent container
			};
			if(formID = tooltipBody.get(self.options.formIDAttr)) {
				o.form = $(formID); // get the form and set it to the AJAX options
				$Rialto.getPlugin('RialtoAjax').formRequest(o, url); // submit the form
			}
			else $Rialto.getPlugin('RialtoAjax').htmlRequest(o); // make the call
		}
	});
	
})();
