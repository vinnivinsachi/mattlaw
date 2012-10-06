{nwExample}

<form class='NWForm:json' rialtoFormPostDCB='response' action='{$siteRoot}/partials/content'>
	<input type='text' class='required' /><br />
	<input type='submit' value='Submit' />
</form>

{literal}<script>
	function response(data) {
		alert(data.exampleText);
		return true;
	}
</script>{/literal}

{/nwExample}