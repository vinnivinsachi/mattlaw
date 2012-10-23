<!-- The data encoding type, enctype, MUST be specified as below -->
<form class='NWUpload' action='{$siteRoot}/examples/image-upload'>
	<div>
		<label>Files: </label>
		<input class='nwUpload-input' type='file' name='files[]' />
	</div>
	<div>
		<input type='submit' value='Upload!' />
	</div>
</form>



<div class='spacer-large'></div>


<form id='form-uploads' enctype='multipart/form-data' action='{$siteRoot}/examples/image-upload' method='POST'>
    <div>
    	<label for='formUploads-file'>File: </label>
    	<input type='file' id='formUploads-file' name='files[]' multiple />
    </div>
    <div>
    	<input type='submit' value='Upload!' />
    </div>
</form>

{literal}<script type='text/javascript'>
	new Form.Upload('formUploads-file', {
		onComplete: function() {
			alert('Upload Complete!');
		}
	});
</script>{/literal}