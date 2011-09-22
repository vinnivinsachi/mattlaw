{rialtoExample}

<a href='{$siteRoot}/partials/example/layout/none' class='rialtoAjaxLink' rialtoInitCallback='init' rialtoPreDispatchCallback='preDispatch' rialtoResponseCallback='response' rialtoClosureCallback='closure'>AJAX CALL</a>

{literal}
<script type='text/javascript'>	
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