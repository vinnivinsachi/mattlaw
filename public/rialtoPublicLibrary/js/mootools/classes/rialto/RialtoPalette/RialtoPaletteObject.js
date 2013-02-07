var RialtoPaletteObject = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			maxSelections: null, // max number of selections at once (null = infinite)
			clickElmtSelector: '> li', // the selector to the elmts to respond to clicks
			checkboxSelector: 'input[type="checkbox"]' // the selector to the checkbox to select on click (relative to the clicked elmt)
		},
		// TODO MARK: make sure this works with two palettes (listing page)
		
		$rialtoPalette: null,
		palette: null,
		//selectedElmts: [],
		
		initialize: function(elmt, options){
			//console.log('initializing RialtoPalette');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
			self.$rialtoPalette = $Rialto.getPlugin('RialtoPalette');
			self.palette = elmt;
			self.palette.addEvent('click:relay('+self.options.clickElmtSelector+')', self.onElmtClick);
			elmt.store('selectedElmts', []);
			//select all selected elements.
			selectedElements = elmt.getChildren(self.options.clickElmtSelector+'.'+self.$rialtoPalette.options.selectedClass).each(function(li){
				self.selectElmt(li);
			});
		},
	
		
		// ======================================================== PUBLIC METHODS =====================================
		selectElmt: function(elmt) {
			var palette = elmt.getParent('.'+self.$rialtoPalette.options.className);
			var selectedElmts = palette.retrieve('selectedElmts');
			selectedElmts.push(elmt);
			elmt.addClass(self.$rialtoPalette.options.selectedClass);
			if(self.options.maxSelections && selectedElmts.length > self.options.maxSelections) self.unselectElmt(selectedElmts[0]);
			if(self.options.checkboxSelector) {
				var checkbox = elmt.getElement(self.options.checkboxSelector);
				checkbox.set('checked', true);
			}
		},
		
		unselectElmt: function(elmt) {
			var palette = elmt.getParent('.'+self.$rialtoPalette.options.className);
			var selectedElmts = palette.retrieve('selectedElmts');
			elmt.removeClass(self.$rialtoPalette.options.selectedClass);
			selectedElmts.splice(selectedElmts.indexOf(elmt), 1);
			if(self.options.checkboxSelector) {
				var checkbox = elmt.getElement(self.options.checkboxSelector);
				checkbox.set('checked', null);
			}
		},
		
		// ======================================================== EVENT HANDLERS ======================================
		onElmtClick: function(event, elmt) {
			if(!$Rialto.callCB(self.palette.get(self.$rialtoPalette.options.preDispatchAttr), elmt)) return false;
			if(elmt.hasClass(self.$rialtoPalette.options.selectedClass)) self.unselectElmt(elmt);
			else self.selectElmt(elmt);
			if(!$Rialto.callCB(self.palette.get(self.$rialtoPalette.options.postDispatchAttr), elmt)) return false;	
			return true;
		}
		
	});
	
})();
