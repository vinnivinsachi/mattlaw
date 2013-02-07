/*
---

name: Form.Upload
description: Create a multiple file upload form
license: MIT-style license.
authors: Arian Stolwijk
requires: [Form.MultipleFileInput, Request.File]
provides: Form.Upload

...
*/

if (!this.Form) this.Form = {};

Form.Upload = new Class({

	Implements: [Options, Events],
	form: '',
	uploadReq: '',
	drop: '',
	list: '',
	progress: '',
	inputFiles: '',
	options: {
		dropMsg: 'Please drop your images here',
		imagesAllowed: 5,
		imagesOptional: true,
		onComplete: function(){
			// reload
			window.location.href = window.location.href;
		}
	},

	initialize: function(input, options){
		input = this.input = document.id(input);
		this.setOptions(options);
		// Our modern file upload requires FormData to upload
		if ('FormData' in window) this.modernUpload(input);
		else this.legacyUpload(input);
	},

	modernUpload: function(input){
		var self = this;

		this.modern = true;

		self.form = input.getParent('form');
		if (!self.form) return;


			self.drop = input.getNext('div.droppable');
			if(!self.drop){
				self.drop = new Element('div.droppable', {
					text: this.options.dropMsg
				}).inject(input, 'after');
			}
			

			self.list = input.getNext('ul.uploadList');

			if(!self.list){
				self.list = new Element('ul.uploadList').inject(self.drop, 'after');
			}
			
			self.progress = input.getNext('div.progress');

			if(!self.progress){
				self.progress = new Element('div.progress')
				.setStyle('display', 'none').inject(self.list, 'after');				
			}

			self.inputFiles = new Form.MultipleFileInput(input, self.list, self.drop, {
			onDragenter: self.drop.addClass.pass('hover', self.drop),
			onDragleave: self.drop.removeClass.pass('hover', self.drop),
			onDrop: self.drop.removeClass.pass('hover', self.drop),
			imagesAllowed: this.options.imagesAllowed
			});
		
			self.uploadReq = new Request.File({
		
				url: self.form.get('action'),
				onRequest: self.progress.setStyles.pass({display: 'block', width: 0}, self.progress),
				onProgress: function(event){
					var loaded = event.loaded, total = event.total;
					self.progress.setStyle('width', parseInt(loaded / total * 100, 10).limit(0, 100) + '%');
				},
				onComplete: function(){
					self.progress.setStyle('width', '100%');
					self.fireEvent('complete', arguments);
					self.uploadReq.resetRequestData();
				}
			});
			

			inputname = input.get('name');

		self.form.addEvent('submit', function(event){
			event.preventDefault();
			
			console.log(self.form);
			otherFormTextInputs = self.form.getElements("input[type='text']"); 
			otherFormHiddenInputs = self.form.getElements("input[type='hidden']");
			console.log(otherFormTextInputs);
			console.log(otherFormHiddenInputs);

			otherFormTextInputs.each(function(element){
				self.uploadReq.append(element.get('name'), element.get('value')); 
			});

			otherFormHiddenInputs.each(function(element){
				self.uploadReq.append(element.get('name'), element.get('value')); 
			});
			inputFilesArray = self.inputFiles.getFiles();
			if(inputFilesArray.length!=0 || self.options.imagesOptional){
				inputFilesArray.each(function(file){
					self.uploadReq.append(inputname , file);
				});
				self.uploadReq.send();
			} else {
				alert('please supplie at least one image');
			}
		});

	},

	legacyUpload: function(input){

		var row = input.getParent('.formRow');
			rowClone = row.clone(),
			add = function(event){
				event.preventDefault();
				var newRow = rowClone.clone();

				newRow.getElement('input').grab(new Element('a.delInputRow', {
					text: 'x',
					events: {click: function(event){
						event.preventDefault();
						newRow.destroy();
					}}
				}), 'after');

				newRow.inject(row, 'after');
			};

		new Element('a.addInputRow', {
			text: '+',
			events: {click: add}
		}).inject(input, 'after');

	},

	isModern: function(){
		return !!this.modern;
	}

});
