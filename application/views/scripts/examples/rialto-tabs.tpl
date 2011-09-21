{rialtoExample}

<!-- TABS -->
<ul>
	<li>
		<a href='#details' class='rialtoTabs rTabsCurrent' rialtoTabsGroup='example-tabs'>Details</a>
	</li>
	<li>
		<a href='#attributes' class='rialtoTabs' rialtoTabsActivateCallback='tabsCallback' rialtoTabsGroup='example-tabs'>Attributes</a>
	</li>
	<li>
		<a href='#image' class='rialtoTabs' rialtoTabsGroup='example-tabs'>Image </a>
	</li>
</ul>


<!-- contents -->
<div>
	<div id='details' rialtoTabsGroup='example-tabs'>
		Details Content
		<span rialtoLoadReplacesUrl='{$siteRoot}/examples/partial/layout/none'></span>
	</div>						
	<div id='attributes' rialtoTabsGroup='example-tabs'>Attributes Content</div>						
	<div id='image' rialtoTabsGroup='example-tabs'>
		Image Content<br />
		<span rialtoLoadReplacesUrl='{$siteRoot}/examples/partial/layout/none'></span>
	</div>					
</div>

{literal}
<script type='text/javascript'>
	function tabsCallback(elmt, containers) {
		alert(elmt+' was clicked and these containers were displayed: '+containers);
	}
</script>
{/literal}

{/rialtoExample}