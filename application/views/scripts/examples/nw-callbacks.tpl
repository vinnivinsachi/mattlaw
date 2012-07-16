{nwExample}

<a href='javascript:;' class='NWLink:nothing' data-nwInitCB='init' data-nwClosureCB='closure'>CLICK ME!</a>

{literal}<script type='text/javascript'>	
	function init(elmt) {
		alert('init');
		return true;
	}

	function closure() {
		alert('closure');
		return false;
	}
</script>{/literal}

{/nwExample}