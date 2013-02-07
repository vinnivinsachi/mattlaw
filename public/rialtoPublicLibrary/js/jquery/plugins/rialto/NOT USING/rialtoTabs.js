(function($){
	$.fn.rialtoTabs = function(passedContentContainer, passedOptions){
	
		// default options
			var options = {
				// setting default options
				// key : 'value'

			};
			
		// merge passed options with defaults
			if(passedOptions){ $.extend(options, passedOptions); }
		
		// IF next is passed
			if(passedContentContainer == 'next') {
				return this.each(function(){
					// get the tabs container
						var tabsContainer = $(this);
					// get the currently selected tab
						var currentTab = tabsContainer.find('a.current');
					// click the next tab in the tabs container
						//tabClicked(null, currentTab.)
				});
			}
		
		// ELSE make sure to return this in order for jquery chaining
			else {
				return this.each(function(){
					var tabsContainer = $(this);
					var contentContainer = $j(passedContentContainer);
					//console.log(contentContainer);
					//console.log(tabsContainer);
					// hide all tabs
						contentContainer.children('.rialtoTabs-content').hide();
					// show the current tab
					//console.log(tabsContainer.find('a.current').attr('href'));
				//console.log(contentContainer.find(tabsContainer.find('a.current').attr('href')));
					    contentContainer.children(tabsContainer.find('a.current').attr('href')).show();
					// add event listeners
						tabsContainer.find('a[class!="no-rialtoTabs"]').click(function(e){ tabClicked(e, $(this), tabsContainer, contentContainer); });
						contentContainer.find('a[class="rialtoTabs-link"]').click(function(e){ tabClicked(e, $(this), tabsContainer, contentContainer); });
				});
			}
			
		// when a tab is clicked
			function tabClicked(e, clickedLink, tabsContainer, contentContainer) {
					//console.log('here at link clicked');
				// prevent the links from changing the page
					if(e) e.preventDefault();
				// don't do anything if the clicked link is the current one
					if(clickedLink.hasClass('current')) return;
				// remove current class from previous links
					tabsContainer.find('a.current').removeClass('current');
				// add current class to link
					tabsContainer.find('a[href="'+clickedLink.attr('href')+'"]').addClass('current');
				// hide all divs
					contentContainer.children('.rialtoTabs-content').hide();
				// show the correct div
					console.log('showing the correct div');
					contentContainer.children(clickedLink.attr('href')).fadeIn();
			}
	};
	
})(jQuery)