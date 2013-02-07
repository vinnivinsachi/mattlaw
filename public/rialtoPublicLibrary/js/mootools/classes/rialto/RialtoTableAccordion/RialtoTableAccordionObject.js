var RialtoTableAccordionObject = (function(){

	var self; // for reference anywhere in the class
	
	// PRIVATE VARS

	return new Class({
		
		Implements: [Options],
		
		// default options
		options: {
			selectedClass: 'rSelected', // the current class
			urlAttr: 'rialtoTableURL', // the url to load upon clicking a row
			formIDAttr: 'rialtoTableFormID', // the ID of the form to submit and load into the row
			accordionRowClass: 'RialtoTableAccordionRow', // visible row class
			accordionHiddenClass: 'rTableAccordionHidden', // accordion hidden rows class
			//accordionHiddenSelectedClass: 'rTableAccordionHiddenCurrent', // accordion current row class
			accordionContentClass: 'rTableAccordionContent', // accordion content class
			accordionContentDetailsClass: 'rTableAccordionContentDetails', // accordion content details class
			accordionExpandedClass: 'rTableAccordionExpanded', // expanded accordion class
			accordionNoAutoCloseClass: 'rTableAccordionNoAutoClose'
		},
		
		table: null,
		
		initialize: function(table, options){
			//console.log('initializing RialtoTableAccordion');
			self = this; // avoid conflicts with 'this'
			self.setOptions(options); // override default options
			//self.$rialtoTable = $Rialto.getPlugin('RialtoTable');
			self.table = table;
			
			if(self.table.hasClass(self.options.accordionExpandedClass)) {
				self.showRows(self.table.getElements('.'+self.options.accordionRowClass)); // add current class to all rows
			} else {
				self.table.getElements('.'+self.options.accordionContentClass).setStyle('height', '0px');
				//self.hideRows(table.getElements('.'+self.options.accordionRowClass), {duration: 0}); // hide rows
				self.showRows(table.getElements('.'+self.options.accordionRowClass+'.'+self.options.accordionExpandedClass)); // show expanded rows
			}
			
			//self.table.getElements('.'+self.options.accordionRowClass).addEvent
		},
	
		
		// ======================================================== PUBLIC METHODS =====================================
		// select a row (and show the content row)
		clickRow: function(clickedRow){
			if(clickedRow.hasClass(self.options.selectedClass)) { return self.hideRow(clickedRow); } // hide the row if it is open
			else {
				var table = clickedRow.getParent('table'); // get parent table
				if(!table.hasClass(self.options.accordionNoAutoCloseClass)) { self.hideRows(table.getElements('.'+self.options.accordionRowClass+'.'+self.options.selectedClass)); } // hide any open rows
				return self.showRow(clickedRow);
			}
			return false;
		},
		
	
		// ======================================================== PUBLIC METHODS ======================================
		// hide rows
		hideRows: function(rows, o){
			rows.each(function(row){ self.hideRow(row, o); }); // hide an array of rows
		},
		hideRow: function(row, o) {
			if(!o) o = {};
			o.onComplete = function(){ hiddenRow.removeClass(self.options.selectedClass); };
			row.removeClass(self.options.selectedClass);
			var hiddenRow = self.getHiddenRow(row); // get hidden row
			var hiddenContent = self.getHiddenContent(hiddenRow); // get hidden content
			$Rialto.fx.compact(hiddenContent, o);
		},

		// show rows
		showRows: function(rows, o){
			if(typeOf(rows) == 'elements') { if(rows.length) rows.each(function(row){ self.showRow(row, o); }); } // show an array of rows
			else { self.showRow(rows, o); } // show a single row
		},
		showRow: function(row, o) {
			row.addClass(self.options.selectedClass);
			var hiddenRow = self.getHiddenRow(row); // get containing tr
			if(url = row.get(self.options.urlAttr)) return self.loadURLInRow(row, url, o);
			else return self.expandRow(row, o);
		},
		expandRow: function(row, o) {
			var hiddenRow = self.getHiddenRow(row); // get hidden row
			var hiddenContent = self.getHiddenContent(hiddenRow); // get hidden content
			//hiddenContent.setStyle('height', '0px');
			hiddenRow.addClass(self.options.selectedClass); // add current classes
			$Rialto.fx.expand(hiddenContent, o); // show the content
			//var rialtoLoadReplaces = $Rialto.getPlugin('RialtoLoadReplaces'); // get loadReplaces plugin
			/*if(rialtoLoadReplaces.needsReplacing(row)) { // check if the content needs any load replaces loaded
				row.addEvent(rialtoLoadReplaces.LOADED_EVENT, function(){ // show clicked row content when loaded
					self.showRows(row); // expand the row with the new content
				});
				rialtoLoadReplaces.load(row); // load replaces
			}*/
			//var rialtoLoadReplaces = $Rialto.getPlugin('RialtoLoadReplaces'); // get loadReplaces plugin
			//rialtoLoadReplaces.load(container); // load replaces
		},

		// show loading image on a row
		/*showLoading: function(row) {
			var hiddenRow = self.getHiddenRow(row);
			var hiddenContent = self.getHiddenContent(hiddenRow);
			$Rialto.fx.fadeOut(hiddenContent, {duration: 0}); // fade out the current content
			self.expandRow(row, {height: 100}); // expand the row just a little bit
			$Rialto.getPlugin('RialtoLoadingImage').show(hiddenRow.getElement('> td')); // show loading image
		},*/
		// hide loading image on a row
		/*hideLoading: function(row) {
			var hiddenRow = self.getHiddenRow(row);
			var hiddenContent = self.getHiddenContent(hiddenRow);
			$Rialto.fx.fadeIn(hiddenContent); // fade out the current content
			(function(){
				$Rialto.getPlugin('RialtoLoadingImage').hide(hiddenRow.getElement('> td')); // show loading image
			}).delay($Rialto.timing); // fade out the current content
		},*/

		loadURLInRow: function(row, url) {
			var rialtoLoadingImage = $Rialto.getPlugin('RialtoLoadingImage'); // show loading image
			var hiddenRow = self.getHiddenRow(row); // get the hidden row
			var hiddenContent = self.getHiddenContent(hiddenRow);
			var rialtoAjax = $Rialto.getPlugin('RialtoAjax'); // get the plugin
			url = $Rialto.formatURL(url, 'zendNoLayout');
			var o = { // set ajax options
				method: 'get', // setting the method to get!
				url: url,
				onRequest: function(){
					$Rialto.fx.fadeOut(hiddenContent, {duration: 0}); // fade out the current content
					$Rialto.getPlugin('RialtoLoadingImage').show(hiddenRow.getElement('> td')); // show loading image
					self.expandRow(row, {endHeight: 100}); // expand the row just a little bit
				}, // show loading image on row
				onSuccess: function(responseHTML){
					row.set(self.options.urlAttr, null); // remove the url so it won't load again on next click
					var newElmt = Elements.from('<span>'+responseHTML+'</span>', false)[0]; // get new elmt from result HTML
					newElmt.inject(hiddenContent); // replace old elmt with new and fade in
					(function(){
						self.showRow(row); // expand the row with the new content
						$Rialto.getPlugin('RialtoPlugins').setup(hiddenRow);
					}).delay($Rialto.timing); // fade out the current content
				},
				onComplete: function(){
					$Rialto.fx.fadeIn(hiddenContent); // fade out the current content
					(function(){
						$Rialto.getPlugin('RialtoLoadingImage').hide(hiddenRow.getElement('> td')); // show loading image
					}).delay($Rialto.timing); // fade out the current content
				} // hide loading image on parent container
			};
			if(formID = row.get(self.options.formIDAttr)) {
				o.form = $(formID); // get the form and set it to the AJAX options
				$Rialto.getPlugin('RialtoAjax').formRequest(o, url); // submit the form
			}
			else $Rialto.getPlugin('RialtoAjax').htmlRequest(o); // make the call
		},


		// ======================================================== HELPER METHODS ======================================
		getHiddenRow: function(row) {
			return row.getNext('tr');
		},
		getHiddenContent: function(hiddenRow) {
			return hiddenRow.getElement('.'+self.options.accordionContentClass);
		}		
		
	});
	
})();
