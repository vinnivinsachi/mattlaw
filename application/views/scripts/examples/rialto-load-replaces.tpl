{rialtoExample}

<div id='loadReplacesParent'>
	<span rialtoLoadReplacesURL='{$siteRoot}/partials/example/layout/none'>Should be replaced...</span>
</div>

<br />

<button onclick='loadReplaces()'>Load Replaces</button>

{literal}
<script type='text/javascript'>		
	function loadReplaces() {
		$Rialto.getPlugin('RialtoLoadReplaces').load($('loadReplacesParent'));
	}
</script>
{/literal}

{/rialtoExample}