<div class='product-thumb {if $brandItems|@count<=3}large{elseif $brandItems|@count>=5}small{else}medium{/if}'>
	<div class='product-image'>
		<a  href='{$siteRoot}/product/index/?sex={$sex}&category={$category}&brand={$brand}&item={$itemName}'><img src='{$dirImages}/Product/{$category}/{$brand}/{$itemName}/{$itemName}.jpg'></a>
	</div>

	<div class='product-price-container'>
		{$itemName}
		<div class='spacer-medium'></div>
		<a class='inline-block align-middle' href='{$siteRoot}/product/index/?sex={$sex}&category={$category}&brand={$brand}&item={$itemName}'>View Details</a>
		<div class='product-price' style=''>${$item}</div>
	</div>
</div>
