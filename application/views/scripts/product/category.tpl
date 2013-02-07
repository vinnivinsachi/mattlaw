<div class='content' style='width: 810px;'>
	
	<div class='breadcrumbs'>
		{$sex} > <a href='{$siteRoot}/product/category?sex={$sex}&category={$category}'>{$category}</a>
	</div>
	<div class='spacer-medium'></div>
	
	{if $categoryItems.banner_image}
	<div class='banner-image' style='height: 250px;'>
		<img src='{$dirImages}/{$categoryItems.banner_image}' height='250'>
	</div>
	{/if}
	
	<div class='padding-top-medium'>
		{foreach from=$categoryItems.brands item=brandItems key=brand}
			<div class='section-header'>{$brand}</div>
				<div class='spacer-medium'></div>
				{foreach from=$brandItems item=item key=itemName}
					{include file='product/partials/_product-thumb.tpl'}
				{/foreach}
			<div class='spacer-large'></div>
		{/foreach}
	</div>
</div>