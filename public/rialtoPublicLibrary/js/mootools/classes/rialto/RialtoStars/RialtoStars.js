var RialtoStars = (function(){

	// TODO MARK: add support for display non-integer star ratings

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			className: 'rialtoStars',
			classStar: 'RialtoStars:star',
			classStarFull: 'rialtoStarsFull',
			classStarHover: 'rialtoStarsHover',
			editableAttr: 'rialtoStarsEditable',
			defaultEditable: false,
			numStarsAttr: 'rialtoStarsNumStars',
			numStars: 5, // default number of stars
			currentStarAttr: 'rialtoStarsCurrentStar',
			clickCBAttr: 'rialtoStarsClickCB'
		},
		
		initialize: function(options){
			//console.log('initializing RialtoStars');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
		},
	
	
		// ======================================================== SETUP METHODS ======================================
		// setup an elmt
		setup: function(starsContainer) {
			var editable = (starsContainer.get(self.options.editableAttr) == 'true') ? true : self.options.defaultEditable; // is the starsContainer editable?
			starsContainer.store('editable', editable); // store whether or not the container is editable
			var numStars = starsContainer.get(self.options.numStarsAttr) || self.options.numStars; // how many stars should be added?
			var stars = []; // create array to hold stars
			for(i = 0; i < numStars; i++) {
				var star = new Element('span', { // create the star span elmt
					'class': self.options.classStar
				});
				star.store('starNum', i+1); // store the stars number
				stars.push(star); // add star to stars array
				if(editable) { star.addEvent('mouseenter', function(event){ self.onStarHover(event.target); }); } // add mouse enter event
			}
			starsContainer.store('stars', stars); // store stars array with stars container
			starsContainer.adopt(stars); // add to stars container
			var currentStar = starsContainer.get(self.options.currentStarAttr) || 0; // get the current star of the container
			self.setCurrentStar(starsContainer, currentStar); // set the current star
			if(editable) {
				starsContainer.setStyle('cursor', 'pointer'); // use pointer cursor on hover
				starsContainer.addEvent('mouseleave', function(){ self.revertContainer(starsContainer); });
			} // revert stars back on mouse leave
		},
		
		// setup all relevant elmts in a given container
		setupContainer: function(container){
			container.getElements('.'+self.options.className).each(function(elmt){ // for each elmt in the container
				self.setup(elmt); // setup the plugin
			});
		},
		
		handleClick: function(rialtoEvent) {
			var starsContainer = rialtoEvent.elmt.getParent('.'+self.options.className); // get starsContainer
			if(starsContainer.retrieve('editable')) {
				var clickedStar = rialtoEvent.elmt; // get the clicked star
				self.clickStar(clickedStar); // click the clicked star
			}
		},
		
		
		// ======================================================== PUBLIC METHODS ======================================
		clickStar: function(star) {
			var starsContainer = star.getParent('.'+self.options.className); // get starsContainer
			self.setCurrentStar(starsContainer, star.retrieve('starNum')); // set container to clicked stars number
			$Rialto.callCB(starsContainer.get(self.options.clickCBAttr), [star, starsContainer]); // possibly call user defined callback
		},
		
		setCurrentStar: function(starsContainer, newCurrentStarNum) {
			newCurrentStarNum = Math.round(newCurrentStarNum);
			self.clearStars(starsContainer); // clear all current stars
			starsContainer.store('currentStarNum', newCurrentStarNum); // store new current star
			self.showStars(starsContainer, newCurrentStarNum)
		},
		
		clearStars: function(starsContainer) {
			var stars = starsContainer.retrieve('stars'); // get stars array
			for(var i = 0; i < stars.length; i++) { // FOREACH star
				self.clearStar(stars[i]); // epmty the star
			}
		},
		
		revertContainer: function(starsContainer) {
			self.clearStars(starsContainer); // clear all stars from the container
			self.showStars(starsContainer, starsContainer.retrieve('currentStarNum')); // show up to the current number of stars
		},
		
		
		// ======================================================== HELPER METHODS ======================================
		clearStar: function(star) {
			star.removeClass(self.options.classStarFull); // remove full star style
			star.removeClass(self.options.classStarHover); // remove hover star style
		},
		
		showStars: function(starsContainer, numStars) {
			var stars = starsContainer.retrieve('stars'); // get stars for container
			for(i = 0; i < numStars; i++) { // FOR number of newCurrentStars
				self.setStarFull(stars[i]); // fill star
			}
		},
		
		setStarFull: function(star) {
			self.clearStar(star); // remove all star styles
			star.addClass(self.options.classStarFull); // set star full style
		},
		
		
		// ======================================================== EVENT LISTENERS ======================================
		onStarHover: function(star) {
			var starNum = star.retrieve('starNum'); // get the stars number
			var starsContainer = star.getParent('.'+self.options.className); // get the star container
			self.clearStars(starsContainer); // clear all stars from the container
			self.showStars(starsContainer, starNum); // show all stars up to the passed star
		}
		
		
	});
	
})();
