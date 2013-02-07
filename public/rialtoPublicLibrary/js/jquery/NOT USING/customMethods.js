// ----------------------------------------- CONFIGURE AJAX -------------------------------------------	
	function ajaxStart() {
		//alert('ajax start...');
		//showLoadingImage();
	}

	function ajaxSuccess(evt, request, options) {
		//alert('ajax success...');
		//eval(data.scripts);
		//alert(e);
		//alert(request.responseText);
	}

	function ajaxComplete(request, status) {
		//alert('ajax complete...');
		//hideLoadingImage();
	}
	
	function ajaxFormCallback(response, status) {
		if(response.flashMessage) flashMessage(response.flashMessage);
		if(response.javascript) try{ eval(response.javascript); }catch(err){ $Rialto.throwCatchError(err); }
		//alert(response);
		//alert(status);
	}
	
	function ajaxLinkCallback(response, status){
		if(response.flashMessage) flashMessage(response.flashMessage);
		if(response.javascript) try{ eval(response.javascript); }catch(err){ $Rialto.throwCatchError(err); }
		//alert(response);
		//alert(status);
	}

// ----------------------------------------- LOADING IMAGES -------------------------------------------			
	// show the global loading image
		function showGlobalLoadingImage() {
			$j('#rialto-loading-image').fadeIn(400);
			//alert('showing');
		}
	// hide the global loading image
		function hideGlobalLoadingImage() {
			$j('#rialto-loading-image').fadeOut(400);
			//alert('fading');
		}

	// show the global loading image, disable the button, submit the form
		function showLoadingAndSubmit(form, ajaxSubmit) {
			submitBtn = $j(form).find('input:submit');
			submitBtn.button('disable').attr('value', submitBtn.attr('loading-text'));
			//showLoadingImage();
			// IF ajax submit
				if(ajaxSubmit) $j(form).ajaxSubmit(ajaxComplete);
			// ELSE (a regular submit)
				else form.submit();
		}



// ----------------------------------------- FLASH MESSAGE -------------------------------------------
	// flash a message to the screen
		function flashMessage(message) {
			$j('#js-flash-message').html(message).delay(500).fadeIn(400).delay(1500).fadeOut(400);
		}
		
	// flash something with a color
	// element is a jQuery element
	function attention(element, passedColor) {
		// cancel any current animation on this item
			element.stop(true, true);//clearQueue();
		var color = '#d5edf8';
		if(passedColor) color = passedColor;
		element.effect('highlight', {color: color}, 1000);
	}
