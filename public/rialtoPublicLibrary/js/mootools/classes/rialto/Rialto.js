var Rialto = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS
	
	//TODO MARK: create urls that load javascript calls like popups upon page load

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			throwCatchErrors: true, // throw errors caught in a try catch block?
			tweenOptions: {
				duration: 500
			}
		},
		
		timing: 300, // for timing things up
		
		effectsOptions: { // global effects options
			duration: 300,
			link: 'chain',
			transition: 'sine:out'
		},
		
		initialize: function(options){
			//console.log('initializing Rialto');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
			if(self.options.timing) self.timing = self.options.timing; // override timing default
			Fx.implement({options: self.effectsOptions}); // implement global effects options
		},
		
		setup: function() {
			console.log('here at setup rialto');
			self.getPlugin('RialtoPlugins');
		},


		// ======================================================== PUBLIC METHODS ======================================
		// get a plugin by name
		getPlugin: function(plugin){
			//console.warn(plugin);
			if(!self['$'+plugin]){ 
				self['$'+plugin] = new window[plugin](self.options[plugin]); // first time setup
			}
			return self['$'+plugin]; // return the plugin
		},
		
		// click an element
		clickElmt: function(elmt) {
			$('body').fireEvent('click', {target: elmt});
		},
		
		// ======================================================== ANIMATION METHODS ======================================
		// TODO MARK: find better way of animating multiple elements (NOT looping)
		fx: {
			// fade elmts in
			fadeIn: function(elmts, o){
				var options = Object.merge(Object.clone(self.options.tweenOptions), { // merge in passed options
					property: 'opacity', // the property to tween
					startOpacity: 0, // starting opacity
					endOpacity: 1 // ending opacity
				}, o);

				if(typeOf(elmts) == 'element') elmts = [elmts]; // turn single elements into array
				
				var numElmts = elmts.length; // get length of elements array (for adding event listener on last one)
				elmts.each(function(elmt, index){ // FOR EACH element
					var fx = new Fx.Tween(elmt, options); // create tween
					if(index == elmts.length-1 && options.onAllComplete) fx.addEvent('complete', function(){ options.onAllComplete(elmts); }); // edd event listener on last elmt
					elmt.setStyle('opacity', options.startOpacity);
					elmt.setStyle('display', null); // reset inline display property
					fx.start(options.endOpacity); // start tween
				});
			},
			
			// fade elmts out
			fadeOut: function(elmts, o){
				var options = Object.merge(Object.clone(self.options.tweenOptions), { // merge in passed options
					property: 'opacity', // the property to tween
					startOpacity: 1, // starting opacity
					endOpacity: 0 // ending opacity
				}, o);
								
				if(typeOf(elmts) == 'element') elmts = [elmts]; // turn single elements into array
				
				var numElmts = elmts.length; // get length of elements array (for adding event listener on last one)
				elmts.each(function(elmt, index){ // FOR EACH element
					var fx = new Fx.Tween(elmt, options); // create tween
					if(options.destroy) fx.addEvent('complete', function(elmt) { elmt.destroy(); }); // optionally destroy elmt when finished fading out
					else if(options.hide) fx.addEvent('complete', function(elmt) { elmt.setStyle('display', 'none'); }); // optionally hide elmt when finished fading out
					if(index == elmts.length-1 && options.onAllComplete) fx.addEvent('complete', function(){ options.onAllComplete(elmts); }); // edd event listener on last elmt
					fx.start(options.startOpacity, options.endOpacity); // start the tween
				});
			},
			hide: function(elmts) {
				var o = {
					endOpacity: 0,
					duration: 0
				};
				self.fadeOut(elmts, o);
			},
			
			highlight: function(elmts, o) {
				var options = Object.merge(Object.clone(self.options.tweenOptions), { // merge in passed options
					property: 'background-color', // the property to tween
					startColor: '#ff8', // starting color
					endColor: null, // ending color
					endTransparent: true // set to transparent bg at end
				}, o);

				if(typeOf(elmts) == 'element') elmts = [elmts]; // turn single elements into array
				
				var numElmts = elmts.length; // get length of elements array (for adding event listener on last one)
				elmts.each(function(elmt, index){ // FOR EACH element
					var fx = new Fx.Tween(elmt, options); // create tween
					if(index == elmts.length-1 && options.onAllComplete) fx.addEvent('complete', function(){ options.onAllComplete(elmts); }); // edd event listener on last elmt
					var endColor = options.endColor || elmt.getStyle('background-color');
					elmt.setStyle('background-color', options.startColor);
					if(options.endTransparent) fx.addEvent('complete', function(){ elmt.setStyle('background-color', null) }); // optionally make bg transparent at end
					fx.start(endColor); // start tween
				});
			},
			
			compact: function(elmts, o){
				var options = Object.merge(Object.clone(self.options.tweenOptions), { // merge in passed options
					property: 'height', // the property to tween
					startHeight: null,
					endHeight: 0
				}, o);
				
				if(typeOf(elmts) == 'element') elmts = [elmts]; // turn single elements into array
				
				elmts.each(function(elmt, index) {
					var fx = new Fx.Tween(elmt, options); // create tween
					if(index == elmts.length-1 && options.onAllComplete) fx.addEvent('complete', function(){ options.onAllComplete(elmts); }); // edd event listener on last elmt
					if(options.startHeight) elmt.setStyle('height', options.startHeight); // optionally set a starting height
					fx.start(options.endHeight); // start the tween
				});
			},
			
			expand: function(elmts, o){
				var options = Object.merge(Object.clone(self.options.tweenOptions), { // merge in passed options
					property: 'height', // the property to tween
					startHeight: null,
					endHeight: null
				}, o);
				
				if(typeOf(elmts) == 'element') elmts = [elmts]; // turn single elements into array
				
				elmts.each(function(elmt, index) {
					if(!options.endHeight) options.endHeight = elmt.measure(function(){ // ELSE get height of hidden elmt
						var currHeight = this.getSize().y; // get current height
						this.setStyle('height', ''); // temp set height to auto
						var height = this.getSize().y; // get height
						this.setStyle('height', currHeight); // set height back to original height
						return height; // return height
					});
					
					var fx = new Fx.Tween(elmt, options); // create tween
					if(index == elmts.length-1 && options.onAllComplete) fx.addEvent('complete', function(){ options.onAllComplete(elmts); }); // edd event listener on last elmt
					if(options.startHeight) elmt.setStyle('height', options.startHeight); // optionally set a starting height
					fx.start(options.endHeight); // start the tween
				});
			}
		},
		
		// ======================================================== AUGEMENTED NATIVE EVENTS =============================		
		// ======================================================== PRIVATE METHODS ======================================
		// CURRENTLY USED IN RIALTO TABLE
		// get the tween for an elmt
		getTween: function(elmt) {
			var tween = elmt.retrieve('tween');
			if (!tween){
				tween = new Fx.Tween(elmt, self.effectOptions);
				elmt.store('tween', tween);
			}
			return tween;
		},
		
		// CURRENTLY USED IN RIALTO TABLE
		// get the morph for an elmt
		getMorph: function(elmt) {
			var morph = elmt.retrieve('morph');
			if (!morph){
				morph = new Fx.Morph(elmt, self.effectsOptions);
				elmt.store('morph', morph);
			}
			return morph;
		},
		
		callCB: function(callback, arguments) {
			if(!callback) return true; // return true if no callback given
			if(typeOf(window[callback]) != 'function') { self.logError('Callback: '+callback+' not found'); return null; }; // make sure callback exists
			if(arguments && typeOf(arguments) != 'array') { arguments = [arguments]; } // make sure arguments is an array 

			var boundCallback = window[callback].pass(arguments); // bond the callback with optional number of arguments
			try{ if(boundCallback() === true) return true; } // return true if callback exists and returns true
			catch(err){ $Rialto.throwCatchError(err); return null }; // return null if error finding callback function
			return false; // return false by default
		},
		
		// optionally throw an error that was caught in a try catch block
		throwCatchError: function(error) { if(self.options.throwCatchErrors) self.logError(error); },
		
		
		// ======================================================== HELPER METHODS ======================================// format URLs in various ways
		formatURL: function(url, format) { // format urls in various ways
			if(format == 'zendPopup') return self.addURLEnding(url, 'layout=popup');
			else if(format == 'zendNoTop') return self.addURLEnding(url, 'layout=no-top');
			else if(format == 'zendNoLayout') return self.addURLEnding(url, 'layout=none');
			else if(format == 'zendJSON') return self.addURLEnding(url, 'format=json');
		},
		
		// add URL ending
		addURLEnding: function(url, ending) {
			var divider = '?';
			if(url.indexOf(ending) != -1) return url;
			if(url.indexOf('?') != -1) divider = '&';
			return url + divider + ending;
		},
		
		logError: function(msg) {
			console.error(msg);
			console.trace();
		}
		
	});
	
})();
