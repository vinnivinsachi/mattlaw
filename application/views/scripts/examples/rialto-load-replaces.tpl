{rialtoExample}

<div id='loadReplacesParent'>
	<span rialtoLoadReplacesURL='{$siteRoot}/partials/example/layout/none' rialtoInitCallback='init' rialtoPreDispatchCallback='preDispatch' rialtoResponseCallback='response' rialtoClosureCallback='closure'>Should be replaced...</span>
</div>

<br />

<button onclick='loadReplaces()'>Load Replaces</button>

{literal}
<script type='text/javascript'>		
	function loadReplaces() {
		$Rialto.getPlugin('RialtoLoadReplaces').load($('loadReplacesParent'));
	}

	
	function init() {
		alert('init');
	}
	function preDispatch() {
		alert('preDispatch');
	}
	function response() {
		alert('response');
	}
	function closure() {
		alert('closure');
	}
</script>
{/literal}

{/rialtoExample}