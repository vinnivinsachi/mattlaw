{nwExample}

<form id='form-example' class='NWForm:json' data-nwForm-postDCB='response' action='{$siteRoot}/partials/content'>
	<div>
		<label for='formExample-testField'>Test Field</label>
		<input type='text' id='formExample-testField' name='formExample[testField]' data-validators='required' />
	</div>
	<div>
		<input type='submit' value='Submit' />
	</div>
</form>

{literal}<script>
	function response(data) {
		alert(data.exampleText);
		return true;
	}
</script>{/literal}

{/nwExample}