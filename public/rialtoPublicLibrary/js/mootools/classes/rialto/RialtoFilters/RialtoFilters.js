var RialtoFilters = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS
	
	// TODO MARK: check for pre selected elmts on load

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			className: 'rFilters',
			clickClass: 'RialtoFilters',
			paramPosType: 0,
			paramTypeListItem: 'listItem',
			paramTypeX: 'x',
			paramTypeClear: 'clear',
			filtersListClass: 'rFiltersList',
			selectedFiltersListItemClass: 'rSelected',
			selectedFiltersListClass: 'rFiltersSelectedList',
			listItemParentSelector: 'ul',
			//listItemXClass: 'rialtoFilterX',
			listItemXParentSelector: 'li',
			typeAttr: 'rialtoFiltersType',
			valueAttr: 'rialtoFiltersValue',
			allFiltersClass: 'rFiltersAll'
		},
		
		initialize: function(options){
			//console.log('initializing RialtoFilters');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
		},
	
	
		// ======================================================== SETUP METHODS ======================================
		// setup an elmt
		setup: function(elmt) {
			elmt.getElements('.'+self.options.filtersListClass).each(function(singleFilterList){ // FOREACH list in filters
				singleFilterList.addClass($Rialto.getPlugin('RialtoScrollable').options.className); // add scrollable class
				singleFilterList.addClass($Rialto.getPlugin('RialtoScrollable').options.classInverted); // add scrollable class
			});
			var selectedFilters = {};
			/*elmt.getElement('.'+self.options.selectedFiltersListClass).getElements('['+self.options.typeAttr+']').each(function(typeElmt){
				selectedFilters.push(typeElmt.get(self.options.typeAttr));
			});*/
			elmt.store('selectedFilters', selectedFilters); // create an array in elmt storage to hold selected filters
			var selectedFilters = elmt.getElements('.'+self.options.selectedFiltersListItemClass+'[class*="'+self.options.clickClass+':'+self.options.paramTypeListItem+'"]');
			selectedFilters.each(function(filter){ self.selectListItem(filter); });
		},
		
		// setup all relevant elmts in a given container
		setupContainer: function(container){
			container.getElements('.'+self.options.className).each(function(elmt){ // for each elmt in the container
				self.setup(elmt); // setup the plugin
			});
		},
		
		handleClick: function(rialtoEvent, params) {
			if(params[self.options.paramPosType] == self.options.paramTypeListItem) { self.clickListItem(rialtoEvent.elmt); }
			else if(params[self.options.paramPosType] == self.options.paramTypeX) { self.clickX(rialtoEvent.elmt); }
			else if(params[self.options.paramPosType] == self.options.paramTypeClear) { self.clickClearFilters(rialtoEvent.elmt); }
			rialtoEvent.callNext();
		},
		
		
		// ======================================================== PUBLIC METHODS ======================================
		clickListItem: function(listItem) {
			if(!listItem.hasClass(self.options.selectedFiltersListItemClass)) return self.selectListItem(listItem);
			else return self.unselectListItem(listItem);
		},
		
		// START HERE
		clickX: function(xItem) {
			var parentLi = xItem.getParent(self.options.listItemXParentSelector);
			var parentUl = parentLi.getParent('ul');
			var filterValue = parentLi.get(self.options.valueAttr);
			var filterType = parentUl.get(self.options.typeAttr);
			var filters = xItem.getParent('.'+self.options.className);
			var listItem = filters.getElement('.'+self.options.filtersListClass+'['+self.options.typeAttr+'="'+filterType+'"] [class*="'+self.options.clickClass+':'+self.options.paramTypeListItem+'"]['+self.options.valueAttr+'="'+filterValue+'"]');
			return self.unselectListItem(listItem);
		},
		
		clickClearFilters: function(clearButton) {
			var filters = clearButton.getParent('.'+self.options.className);
			return self.clearFilters(filters);
		},
		
		selectListItem: function(listItem) {
			var filters = listItem.getParent('.'+self.options.className); // get the whole filters object
			var selectedFilters = filters.retrieve('selectedFilters'); // get currently selected filters for this list
			var selectedFiltersList = filters.getElement('.'+self.options.selectedFiltersListClass); // get the selected filters container			
			var filterValue = listItem.get(self.options.valueAttr); // get the selected value
			var listItemParent = listItem.getParent('.'+self.options.filtersListClass);
			var filterType = listItemParent.get(self.options.typeAttr); // get the filter type
			var checkbox = listItem.getElement('[type="checkbox"]');

			if(!selectedFilters[filterType]) selectedFilters[filterType] = []; // create array to hold selected values IF none exists

			var selectedFiltersList = selectedFiltersList.getElement('['+self.options.typeAttr+'="'+filterType+'"]');
						
			if(!selectedFilters[filterType].length) $Rialto.fx.fadeOut(selectedFiltersList.getElement('.'+self.options.allFiltersClass), {hide: true}); // hide the Showing All if visible

			selectedFilters[filterType].push(filterValue); // record the selection

			listItem.addClass(self.options.selectedFiltersListItemClass); // add selected class
			checkbox.set('checked', 'checked'); // check checkbox

			$Rialto.fx.fadeIn(selectedFiltersList.getElement('['+self.options.valueAttr+'="'+filterValue+'"]')); // show item in list
			
			return true;
		},
		
		unselectListItem: function(listItem) {
			var filters = listItem.getParent('.'+self.options.className); // get the whole filters object
			var selectedFilters = filters.retrieve('selectedFilters'); // get currently selected filters for this list
			var selectedFiltersList = filters.getElement('.'+self.options.selectedFiltersListClass); // get the selected filters container
			var filterValue = listItem.get(self.options.valueAttr); // get the selected value
			var listItemParent = listItem.getParent('.'+self.options.filtersListClass);
			var filterType = listItemParent.get(self.options.typeAttr); // get the filter type
			var checkbox = listItem.getElement('[type="checkbox"]');

			var selectedFiltersList = selectedFiltersList.getElement('['+self.options.typeAttr+'="'+filterType+'"]');

			selectedFilters[filterType].splice(selectedFilters[filterType].indexOf(filterValue), 1);

			listItem.removeClass(self.options.selectedFiltersListItemClass); // remove selected class from Li
			checkbox.set('checked', null); // uncheck checkbox

			// TODO MARK: fix errors when you click too fast and all-filters li item doesn't show and hide correctly

			$Rialto.fx.fadeOut(selectedFiltersList.getElement('['+self.options.valueAttr+'="'+filterValue+'"]'), {hide: true}); // remove item from the selected filters list
			if(!selectedFilters[filterType].length) $Rialto.fx.fadeIn(selectedFiltersList.getElement('.'+self.options.allFiltersClass)); // hide the Showing All if visible
			
			return true;
		},
		
		clearFilters: function(filters) {
			var selectedFilters = filters.getElements('[class*="'+self.options.clickClass+':'+self.options.paramTypeListItem+'"].'+self.options.selectedFiltersListItemClass);
			selectedFilters.each(function(filterItem){ self.unselectListItem(filterItem); });
			return true;
		}
		
		
	});
	
})();
