(function($){
	$.fn.rialtoTableAccordion = function(passedOptions){
	
		// default options
		var options = {
			// setting default options
			loadingTableType: '.table-sortable'
		};
		
		// merge passed options with defaults
		if(passedOptions){$.extend(options, passedOptions); }
		
		// make sure to return this in order for jquery chaining
		return this.each(function(){
			var theObject = $(this);
			
			// do stuff to each element
			//lert('here');
			theObject.find('.accordion-bar').live('click', function(event){
				//console.log('here at accordion-bar');
				//event.preventDefault(); // prevent default behavior
				//event.stopPropagation(); 
				var jClickedElement=$j(this);
				var jContentContainerElement = $j('#accordion-content-container-id-'+jClickedElement.attr('rialtoAccordionBarID'));
				var jLoadedContainer = jContentContainerElement.find('.content-details');
				
				if(!jClickedElement.hasClass('loaded')){
					jLoadedContainer.load(jClickedElement.attr("href"), function(){
						//need to check options here.
						//turning into sortable table jquery now. 
						loadingTable = jLoadedContainer.find(options.loadingTableType);
						if(loadingTable.length>0){
							loadingTable.tablesorter();
						}
						//alert('here');	
					});
		
					jClickedElement.addClass('loaded');
					jClickedElement.attr('title', '');
				}if(!jClickedElement.hasClass('current')){
					$j('tr.current').removeClass('current');
					$j('tr.table-row').removeClass('table-row');
					
					jClickedElement.addClass('current');
					jContentContainerElement.addClass('table-row');
				}else{
					jClickedElement.removeClass('current');
					jContentContainerElement.removeClass('table-row');
				}
			
			});
		});
	};	
})(jQuery)