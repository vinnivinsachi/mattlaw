var RialtoPagination = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS
	
	// TODO MARK: add ability to submit form with pagination
	
	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			className: 'rPagination', // the class name
			minDistance: 150, // the scroll distance at which to load more stuff
			viewportClass: 'rPaginationViewport', // the class of the viewport
			elementsListID: 'rialtoPaginationListID', // the ID of the list of elements
			elementClass: 'rPaginationElement', // the class of the pagination elements
			pageTopElmtClass: 'rPaginationPageTop', // the class of the pagination elements at the top of each page
			pageNumAttr: 'rialtoPaginationPage', // the page number
			pageLinksViewportClass: 'rPaginationViewport', // the pagination links viewport
			pageLinksCurrentClass: 'rPaginationCurrent', // the class of the current page link
			pageLinkFirstID: 'rPaginationFirst',
			pageLinkPrevID: 'rPaginationPrev',
			pageLinkNextID: 'rPaginationNext',
			pageLinkLastID: 'rPaginationLast',
			injectMethodAttr: 'rialtoPaginationInjectionMethod'
		},
		
		loading: false, // currently loading new stuff?
		scrolling: false, // currently auto-scrolling?
		prevScrollY: 0, // start scrolling at 0
		scrollingDown: true, // shich direction are we scrolling?
		url: null, // the url to call for new stuff
		pageChangeY: null, // the y where the pages change
		pageHeight: null, // the height of a single page
		currPageNum: null, // the current page
		loadedPages: [], // an array of loaded pages
		
		paginationElmt: null, // the pagination link menu
		pageLinkLis: null, // an array of page link li elmts
		pageLinksUl: null, // the ul of page links
		pageLinksCenterX: null, // the X center of the page links
		pageLinksCurrentLi: null, // the current li
		
		initialize: function(options){
			console.log('initializing RialtoPagination');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
		},
	
	
		// ======================================================== PUBLIC METHODS ======================================
		// setup an elmt
		setup: function(elmt) {
			/*elmt.addEvent('scroll', function(event){
				console.log(elmt.getScrollSize().y - elmt.getSize().y - elmt.getScroll().y);
			});*/
		},
		
		// setup all relevant elmts in a given container
		setupContainer: function(container){
			if(!self.initialized && container.getElements('.'+self.options.className).length) { // IF pagination exists and not yet setup
				window.addEvent('scroll', function(){ // ON SCROLL FOR WINDOW
					var scrollY = self.getScrollY(); // get scroll pos
					if((scrollY - self.prevScrollY) >= 0) self.scrollingDown = true;
					else self.scrollingDown = false;
					self.prevScrollY = scrollY; // set prev scroll pos
				});
				self.windowScroll = new Fx.Scroll(window); // create window scroll FX
				self.windowScroll.addEvent('complete', function(){ self.scrolling = false; }); // setup window scroll FX
				self.setupLinks(container);	
				self.createPages();
				$('body').addEvent('click:relay(.'+self.options.viewportClass+' a)', function(event){ self.clickPage(event.target); }); // setup generic click listener
				$(self.options.pageLinkFirstID).addEvent('click', function(){ self.clickPage(self.pageLinkLis[0].getElement('a')); }); // first page click event
				$(self.options.pageLinkPrevID).addEvent('click', function(){ self.clickPage(self.pageLinkLis[self.currPageNum-2].getElement('a')); }); // previous page click event
				$(self.options.pageLinkNextID).addEvent('click', function(){ self.clickPage(self.pageLinkLis[self.currPageNum].getElement('a')); }); // next page click event
				$(self.options.pageLinkLastID).addEvent('click', function(){ self.clickPage(self.pageLinkLis[self.pageLinkLis.length-1].getElement('a')); }); // last page click event
			};	
		},
		
		// ======================================================== PRIVATE METHODS ======================================
		/*scroll: function() {
			var distance = self.getScrollY();
			var scrollRemaining = self.getScrollRemaining();
			//console.log(distance);
			if(distance < self.currentPage.top) { self.setCurrentPage(self.currentPage.num-1); } // IF paging up
			else if(distance > self.currentPage.bottom) { self.setCurrentPage(self.currentPage.num+1); } // IF paging down
			if(!self.loading && scrollRemaining < self.options.minDistance) { // IF reaching the bottom of the page
				$Rialto.getPlugin('RialtoFlashMessage').show('Loading Stuff Now!');
				self.loading = true;
			}
		},*/
		
		setupLinks: function(container) {
			self.paginationElmt = container.getElements('.'+self.options.className)[0]; // save the pagination link menu
			self.pageLinkLis = self.paginationElmt.getElements('li'); // get all page link li
			self.pageLinksUl = self.paginationElmt.getElements('ul')[0]; // get ul
			self.pageLinksCenterX = Math.floor(self.paginationElmt.getElements('.'+self.options.pageLinksViewportClass)[0].getSize().x/2);
			self.url = self.paginationElmt.get('href');
		},
		
		createPages: function() {
			self.setupPageTops($$('.'+self.options.pageTopElmtClass)); // get page top elmts
			var firstPage = null;
			var secondPage = null;
			var index = 0;
			while((!firstPage || !secondPage) && index < self.loadedPages.length) {
				if(self.loadedPages[index]) {
					if(!firstPage) firstPage = index+1;
					else if(!secondPage) secondPage = index+1;
				}
				index ++;
			}
			
			if(secondPage) { // IF more than one page loaded
				var pageOneTop = self.loadedPages[firstPage-1].getCoordinates().top;
				var pageTwoTop = self.loadedPages[secondPage-1].getCoordinates().top;
				self.pageHeight = pageTwoTop - pageOneTop; // get page height
			} else if(firstPage) { // ELSE IF only one page loaded
				var pageOne = self.loadedPages[firstPage-1];
				var pageOneTop = pageOne.getCoordinates().top;
				var siblings = self.loadedPages[firstPage-1].getParent().getChildren('.'+self.options.elementClass);
				var lastElmt = siblings[siblings.length-1];
				var pageOneBottom = lastElmt.getCoordinates().bottom;
				// TODO MARK: not getting height of page correctly
				self.pageHeight = pageOneBottom - pageOneTop; // get page height
				self.setCurrentPage(1);
			} //else alert('ERROR: no pages found in rialtoPagination::createPages()!');
			self.pageChangeY = Math.floor(window.getSize().y / 2); // get the middle of the page			
		},
		
		setupPageTops: function(newTops) {
			newTops.each(function(top){ // FOR EACH PAGE TOP
				self.loadedPages[top.get(self.options.pageNumAttr)-1] = top; // record what pages have been loaded
				window.addEvent('scroll', function(event){ self.onElmtScroll(top); }); // add event listener to each elmt
			});
		},
		
		getScrollY: function() { return window.getScroll().y; },
		getScrollRemaining: function() { return window.getScrollSize().y - window.getSize().y - window.getScroll().y; },
		
		setCurrentPage: function(pageNum) {
			$Rialto.getPlugin('RialtoFlashMessage').show('Page '+pageNum);
			self.currPageNum = pageNum; // set current page
			var newLi = self.pageLinkLis[pageNum-1]; // get new current li
			if(self.pageLinksCurrentLi) self.pageLinksCurrentLi.removeClass(self.options.pageLinksCurrentClass); // remove current class from old current li
			self.pageLinksCurrentLi = newLi; // set new current li
			self.pageLinksCurrentLi.addClass(self.options.pageLinksCurrentClass); // add current class to new current li
			var liOffset = Math.floor(newLi.getPosition(newLi.getOffsetParent()).x + newLi.getSize().x/2); // get li offset from parent ul
			self.pageLinksUl.tween('margin-left', (self.pageLinksCenterX - liOffset)); // scroll links to current page
		},
		
		onElmtScroll: function(elmt) {
			if(self.scrolling) return; // nothing IF auto-scrolling
			var pageTop = elmt.getPosition().y; // get the position of the page top
			var pageBottom = pageTop+self.pageHeight; // the position of the page bottom
			var scrollPos = self.getScrollY(); // get the position of the scroll
			var changeY = scrollPos+self.pageChangeY; // the y coordinate for switching pages
			if(pageTop <= changeY && pageBottom > changeY) { // IF this page is in view
				var pageNum = elmt.get(self.options.pageNumAttr); // get the page number
				if(pageNum != self.currPageNum) self.setCurrentPage(pageNum); // IF not the current page, set the new current page
				else if(!self.loading) { // ELSE IF this is the current paged, and not currently loading another page
					if(!self.scrollingDown && pageNum > 1 && (scrollPos - pageTop) <= self.options.minDistance && !self.loadedPages[pageNum-2] && self.pageLinkLis[pageNum-2]) { // IF above page needs to be loaded
						self.loadPage(Number(pageNum)-1); // load one page above
					}
					else if(self.scrollingDown && (pageBottom - (scrollPos + window.getSize().y)) <= self.options.minDistance && !self.loadedPages[pageNum] && self.pageLinkLis[pageNum]) {
						self.loadPage(Number(pageNum)+1); // load one page below
					}
				}
			}
		},
		
		clickPage: function(pageAnchor) {
			var pageNum = pageAnchor.get('html');
			if(self.loadedPages[pageNum-1]) {
				self.scrollToElmt(self.loadedPages[pageNum-1]);
				self.setCurrentPage(pageNum);
			} else self.loadPage(pageNum, true); // load the clicked page
		},
		
		loadPage: function(pageNum, scrollToPage) {
			self.loading = true;
			var pageNext = null;
			var index = pageNum;
			while(!pageNext && index < self.loadedPages.length) {
				if(self.loadedPages[index]) pageNext = Number(index)+1;
				index ++;
			}
			var rialtoAjax = $Rialto.getPlugin('RialtoAjax'); // get the plugin
			var url = self.url + '?layout=none&page=' + pageNum;
			var o = { // set ajax options
				url: url,
				onRequest: function(){ $Rialto.getPlugin('RialtoLoadingImage').show(); },
				onSuccess: function(html){
					var newElmts = Elements.from(html); // create new page from response
					self.setupPageTops([newElmts[0]]); // setup incoming page
					var listContainer = $(self.paginationElmt.get(self.options.elementsListID)); // get elmts list container
					var insertNewPage = function() { // define how to insert the new page
						if(pageNext) {
							if(listContainer.get(self.options.injectMethodAttr) == 'instant') newElmts.inject(self.loadedPages[pageNext-1], 'before');
							else newElmts.fade('hide').inject(self.loadedPages[pageNext-1], 'before').fade('in'); // add new elmts to the DOM
						} else {
							if(listContainer.get(self.options.injectMethodAttr) == 'instant') listContainer.adopt(newElmts); // add new page to DOM
							else {
								
								newElmts.fade('hide');
								listContainer.adopt(newElmts); // add new page to DOM
								newElmts.fade('in');
							}
						}
					}
					if(scrollToPage) { // IF scrolling to the loaded page
						insertNewPage(); // insert the new page
						self.setCurrentPage(pageNum); // select loaded page
						self.scrollToElmt(self.loadedPages[pageNum-1]); // scroll to newly loaded page
					} else { // ELSE IF not scrolling to the loaded page
						if(self.currPageNum > pageNum) { // IF the loaded page is above the current page
							var origPos = self.loadedPages[self.currPageNum-1].getPosition().y;
							insertNewPage(); // insert the new page
							var newPos = self.loadedPages[self.currPageNum-1].getPosition().y;
							self.scrolling = true; // set the scrolling bool
							self.windowScroll.set(0, self.getScrollY()+(newPos-origPos)); // scroll back to where we were
							setTimeout(function(){ self.scrolling = false; }, 50); // reset the scrolling bool after a short delay
						} else insertNewPage(); // ELSE just insert the new page
					}
					self.loading = false; // reset loading bool
				},
				onError: function(){
					$Rialto.getPlugin('RialtoFlashMessage').showError();
					self.loading = false;
				},
				onComplete: function(){ $Rialto.getPlugin('RialtoLoadingImage').hide() }
			};
			rialtoAjax.htmlRequest(o); // make the html request call
		},
		
		scrollToElmt: function(elmt) {
			self.scrolling = true;
			self.windowScroll.toElement(elmt, 'y');
		}
		
	});
	
})();
