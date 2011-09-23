{rialtoExample}

<div id='elements-list'>
{foreach from=$elmts item=page}
	<div class='sample' style='background-color:#{$color}'>PAGE: {$page}</div>
{/foreach}
</div>

<div class='rialtoPagination'>
	<ul>
		<li>1</li>
		<li><a class='rialtoAjaxLink' rialtoAppendTargetID='elements-list' href='{$siteRoot}/examples/rialto-pagination-load/page/2'>2</a></li>
		<li>3</li>		
	</ul>
</div>

{literal}
<style>
	.sample {
		height: 60px;
		margin: 20px 0px;
	}
</style>
{/literal}

{/rialtoExample}