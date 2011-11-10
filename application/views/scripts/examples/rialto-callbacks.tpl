{rialtoExample}

<a href='{$siteRoot}/examples/rialto-ajax/layout/none' class='RialtoLink' rialtoInitCB='init'  rialtoClosureCB='closure' >AJAX LINK</a>

{literal}
<script type='text/javascript'>	
	function init() {
		alert('init');
		return true;
	}
	function closure() {
		alert('closure');
		return false;
	}
</script>
{/literal}

{/rialtoExample}