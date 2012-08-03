{nwExample}

<a href='javascript:;' class='NWDialog NWDelete' data-nwDialog-shouldShowCB='dialogShouldShow' data-nwDialog-title='Are You Sure?' data-nwDialog-html='<b>Are you sure you want to do this!?</b>' data-nwClosureCB='closure'>Delete Me!</a>

{literal}<script>
	function dialogShouldShow(elmt) {
		alert('check');
		return true;
	}
	
	function closure(elmt) {
		alert('I have been deleted...  :\'(');
		return true;
	}
</script>{/literal}

{/nwExample}