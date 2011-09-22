
	EXAMPLE PARTIAL!!!
	<span id='test-span'>TEST SPAN</span>
	<br /><br />
	{$example}
	
	<span class='rialtoClickOnLoad' rialtoInitCallback='autoClick'>AUTO CLICKED</span>
	
	{literal}
		<script type='text/javascript'>
			alert('partial loaded!');
			//console.log($('test-span'));
			
			function autoClick(elmt) {
				alert(elmt+'clicked!');
			}
		</script>
	{/literal}