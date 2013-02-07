	<div class='product-thumb small'>
		<div class='product-image'>
			<a  href='{$siteRoot}/product/index/?sex={$item.sex}&category={$item.category}&brand={$item.brand}&item={$item.name}'><img src='{$dirImages}/Product/{$item.category}/{$item.brand}/{$item.name}/{$item.name}.jpg'></a>
		</div>

		<div class='product-price-container'>
			{$item.name}
			<div class='spacer-medium'></div>
			<a class='inline-block align-middle' href='{$siteRoot}/product/index/?sex={$item.sex}&category={$item.category}&brand={$item.brand}&item={$item.name}'>View Details</a>
			<div class='product-price' style=''>${$item.price}</div>
		</div>
	</div>