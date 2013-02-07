(function($){
	$.fn.rialtoSlideout = function(passedOptions){
	
		// default options
		var options = {
			//setting default options
		};
		
		//merge passed options with defaults
		if(options){$.extend(options, passedOptions); }
		
		//make sure to return this in order for jquery chaining
		return this.each(function(){
			var $this = $(this);
			
			//--------------------------------------------------------------------
			var currentItem = $this.find('.rialto-slideout-item-list .selected');
			var currentList = $this.find('.rialto-slideout-item-list');
			var currentListItems = $('.rialto-slideout-item-list .selectable-items');
			
			
			var currentItemDefaultPosition = currentItem.position(); // the default position of the item before clicking
			var currentItemPosition = currentItem.position(); //the position of the current item in relation to its parent
			var currentItemOffset = currentItem.offset(); // the position of the current item inrelation to the window
			var itemListDefaultPosition = currentList.position(); // the default position of the list to its parent
			var itemListCurrentPosition = currentList.scrollTop(); // the current positin of the list scroll top. 
			var tempCurrentItemOffsetPosition;
			
			currentListItems.click(function(){
				if(currentItem.length > 0){ currentItem.removeClass('selected'); }
				currentItem = $(this);

				currentItem.addClass('selected');
				currentItemDefaultPosition =currentItem.position();
			});
			
				//upon scrolling in the rialto-slideout-item-list scroll section
			currentList.scroll(function() {
				//alert('here');
				if(currentItem.length > 0){
					//alert('here at scroll in ul')
					currentItemPosition = currentItem.position();
					currentItemOffset = currentItem.offset();
					itemListDefaultPosition = currentList.position();
					itemListCurrentPosition = currentList.scrollTop();
					if(currentItemOffset.top < $(window).scrollTop()){
						//alert('adding fixed');
						currentItem.addClass('fixed-selected').removeClass('absolute-selected static-selected');
					
						currentItem.css('width', currentList.width()-10);
					}else if (currentItemPosition.top <  0){
						//alert('adding absolute');
						currentItem.addClass('absolute-selected').removeClass('fixed-selected static-selected');
						currentItem.css('width', currentList.width()-10);
						//alert('scrolled out top!');
					}else if((itemListCurrentPosition < currentItemDefaultPosition.top) && (currentItem.css('position')!= 'static')){
						//alert('adding static');
						currentItem.addClass('static-selected').removeClass('fixed-selected absolute-selected');
						currentItem.css('width', currentList.width()-10);
		
					}
				}
			});
				//upon scrolling on the page. 
			$(window).scroll(function () { 
				
				if(currentItem.length > 0){
					//alert('here at scroll on page');
					itemListDefaultPosition = currentList.offset();
					currentOffset = currentItem.offset();
					
					if(($(window).scrollTop() > itemListDefaultPosition.top && currentItem.css('position')=='absolute')||($(window).scrollTop() > currentOffset.top)){
						tempCurrentItemOffsetPosition = currentOffset;
						currentItem.addClass('fixed-selected').removeClass('absolute-selected static-selected');
						currentItem.css('width', currentList.width()-10);
					}else if($(window).scrollTop() < itemListDefaultPosition.top && currentItem.css('position')=='fixed'){
		
						currentItem.addClass('absolute-selected').removeClass('fixed-selected static-selected');
						currentItem.css('width', currentList.width()-10);
					}else if(tempCurrentItemOffsetPosition && ($(window).scrollTop() <= tempCurrentItemOffsetPosition.top)){
		
						currentItem.addClass('static-selected').removeClass('fixed-selected absolute-selected');
						currentItem.css('width', currentList.width()-10);

					} 
				}	
				//setting behavior for bottom
			});
			//--------------------------------------------------------------------			
		});
	};	
})(jQuery)