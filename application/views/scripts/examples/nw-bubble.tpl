{nwExample}

<div class='NWLink:nothing' data-nwLink-preDCB='onParentClick'>
	<span><a href='javascript:;' class='NWLink:nothing NWBubble' data-nwLink-preDCB='onChildClick'>CLICK ME!</a></span>
</div>


{literal}<script type='text/javascript'>	
	function onChildClick() {
		alert('The child was clicked!');
		return true;
	}

	function onParentClick() {
		alert('The parent was clicked too!');
		return true;
	}
</script>{/literal}

{/nwExample}