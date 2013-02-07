var RialtoImageBook = (function(){

	var self; // for reference anywhere in the class
	
	// TODO MARK: make sure that when no images are present the add images work.
	// TODO MARK: make sure that the big image can bring out the popup windows as well too
	// TODO MARK: make sure that when images are on hover, it loads the appropriate sized image in regards to the size of the book.
	
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			className: 'rialtoImageBook',
			mainImageClass: 'rialtoImageBook-main-image',
			largeImageURLAttr: 'rialtoImageBookLargeImageURL'
		},
		
		initialize: function(options){
			console.log('initializing RialtoImageBook');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
		},
		
		getImageLi: function(image, thumb){ return Elements.from('<li><a class="RialtoPopup:window"><img src="'+thumb+'" rialtoImageBookLargeImageURL="'+image+'" /></a></li>'); },
	

		// ======================================================== SETUP METHODS ======================================
		// setup an elmt
		setup: function(book) {
			var mainImage = book.getElement('.'+self.options.mainImageClass+' img').get('src'); // get main image
			book.mainImage = mainImage;
			book.addEvent("mouseenter:relay(li img)", function(event){ self.onMouseEnter(event.target); }); // add mouseover event to li's
			book.addEvent("mouseleave:relay(li img)", function(event){ self.onMouseLeave(event.target); }); // add mouseleave event to li's
		},
		
		// setup all relavant elmts in a given container
		setupContainer: function(container){
			container.getElements('.'+self.options.className).each(function(elmt){ // for each elmt in the container
				self.setup(elmt); // setup the plugin
			});
		},
		
		
		// ======================================================== PUBLIC METHODS ======================================
		// TODO MARK: if added image is the first, make it the big one
		addImageToBook: function(book, image, thumb) {
			var newLi = self.getImageLi(image, thumb);
			newLi.setStyle('opacity', 0);
			var ul = book.getElement('ul'); // get ul
			if(ul) { // IF there is already a main image
				ul.grab(newLi[0]); // create a new thumb
				$Rialto.fx.fadeIn(newLi); // add the thumb
			} else { // ELSE (there is no main image yet)
				var mainImg = book.getElement('.rialtoImageBook-main-image img'); // get main image
				mainImg.set('src', image); // set the main image
			}
		},
		
		/**
		 * Activate a thumbnail to change to the main image.
		 * 
		 * @param Object elmt The licked thumbnail.
		 * @return void
		 */
		/*click: function(elmt) {
			var book = elmt.getParent('.'+self.options.class); // get the whole book element
			book.getElements('ul > li.selected').removeClass('selected'); // remove selected class from current
			elmt.getParent('li').addClass('selected'); // add selected class to clicked
			var newImage = elmt.getParent('a').get('href'); // get new image src
			book.getElements('.'+self.options.mainImageClass+' > img')[0].set('src', newImage); // replace main image with new image
		}*/
		
		
		// ======================================================== EVENT LISTENERS ======================================
		onMouseEnter: function(img) {
			//var newImage = img.getParent('a').get('href'); // get new image src
			var largeImageURL = img.get(self.options.largeImageURLAttr);
			var book = img.getParent('.'+self.options.className); // get the whole book element
			book.getElement('.'+self.options.mainImageClass+' img').set('src', largeImageURL); // replace main image with new image
		},
		
		onMouseLeave: function(img) {
			var book = img.getParent('.'+self.options.className); // get the whole book element
			book.getElement('.'+self.options.mainImageClass+' img').set('src', book.mainImage); // reset main image
		},
				
	});
	
})();
