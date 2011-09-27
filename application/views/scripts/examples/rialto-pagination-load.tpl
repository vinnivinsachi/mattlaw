{foreach from=$elmts item=elmt}
	<div class='sample {$elmt.class}' {if $elmt.class}rialtoPaginationPage='{$elmt.page}'{/if} style='background-color:#{$elmt.color}'>PAGE: {$elmt.page}</div>
{/foreach}