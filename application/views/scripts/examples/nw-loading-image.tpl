{nwExample}

<div id='loadingImageParent' style='height:200px;'></div>

<button onclick='showLoading()'>Show the loading image</button>
&nbsp;&nbsp;&nbsp;
<button onclick='hideLoading()'>Hide the loading image</button>

{literal}<script type='text/javascript'>	
	window.addEvent('domready', function(){
		nwLoadingImage = $NW.getPlugin('NWLoadingImage');
		parent = $('loadingImageParent');
	});
	
	function showLoading() {
		nwLoadingImage.show(parent);
	}
	
	function hideLoading() {
		nwLoadingImage.hide(parent);
	}
</script>{/literal}

{/nwExample}