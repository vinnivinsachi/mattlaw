{nwExample}

<div id='loadReplacesParent'>
	<span class='NWLoadReplaces' data-nwLoadReplaces-url='{$siteRoot}/partials/content'>Should be replaced...</span>
	
	<br />
	
	<button onclick='loadReplaces()'>Load Replaces</button>
</div>


{literal}<script type='text/javascript'>		
	function loadReplaces() {
		$NW.getPlugin('NWLoadReplaces').load($('loadReplacesParent'));
	}
</script>{/literal}

{/nwExample}