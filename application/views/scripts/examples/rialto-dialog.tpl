{rialtoExample}

<a href='javascript:;' class='rialtoDialog rialtoDelete' rialtoEndingCallback='deleted' rialtoDialogTitle='Are You Sure?' rialtoCallback='deleted' rialtoDialogHTML='<b>Are you sure you want to do this!?</b>'>Delete Me!</a>

{literal}
<script>
	function deleted(elmt) {
		alert('I have been deleted...  :(');
	}
</script>
{/literal}

{/rialtoExample}