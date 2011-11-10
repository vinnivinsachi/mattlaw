{rialtoExample}

<a href='{$siteRoot}/examples/rialto-ajax' class='rialtoLink' rialtoInitCB='init'>RIALTO LINK</a>

{literal}
<script type='text/javascript'>
	function init() {
		alert('init');
	}
	
	function callback(elmt) {
		//alert('callback');
	}
	
	function preDispatch(elmt) {
		//alert('preDispatch');
	}
</script>
{/literal}

{/rialtoExample}