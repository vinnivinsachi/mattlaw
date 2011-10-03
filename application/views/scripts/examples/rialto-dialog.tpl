{rialtoExample}

<a href='javascript:;' class='rialtoDialog rialtoDelete' rialtoDialogPreDispatchCallback='dialogPreDispatch' rialtoClosureCallback='deleted' rialtoDialogTitle='Are You Sure?' rialtoDialogHTML='<b>Are you sure you want to do this!?</b>'>Delete Me!</a>

{literal}
<script>
	function dialogPreDispatch(elmt) {
		return true;
	}
	
	function deleted(elmt) {
		alert('I have been deleted...  :(');
	}
</script>
{/literal}

{/rialtoExample}