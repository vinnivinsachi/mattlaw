{rialtoExample}

<div id='loadReplacesParent'>
	<span class='RialtoLoadReplaces' rialtoLoadReplacesURL='{$siteRoot}/partials/example' rialtoInitCallback='init' rialtoPreDispatchCallback='preDispatch' rialtoResponseCallback='response' rialtoClosureCallback='closure' rialtoLoadReplacesPostDCB='postD'>Should be replaced...</span>
	
	<br />
	
	<button onclick='loadReplaces()'>Load Replaces</button>
</div>


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
	function postD() {
		alert('postD');
		return true;
	}
	function closure() {
		alert('closure');
	}
</script>
{/literal}

{/rialtoExample}