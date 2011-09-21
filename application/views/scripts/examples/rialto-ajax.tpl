{rialtoExample}

<a href='{$siteRoot}/examples/rialto-ajax' class='rialtoJsonLink' rialtoCallback='callback' rialtoAjaxPreDispatchCallback='preDispatch'>AJAX CALL</a>

{literal}
<script type='text/javascript'>
	function callback(elmt) {
		alert('callback');
	}
	
	function preDispatch(elmt) {
		alert('preDispatch');
	}
</script>
{/literal}

{/rialtoExample}