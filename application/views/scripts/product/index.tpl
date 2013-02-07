


<div class='content' style='width: 810px;'>
	
	<div class='breadcrumbs'>
		{$sex} > <a href='{$siteRoot}/product/category?sex={$sex}&category={$category}'>{$category}</a> > <a>{$brand}</a> > <a>{$item}</a>
	</div>
	
	<div class='spacer-medium'></div>
	
		<div class='box-hor content-IE'>
		<div class='content-left' style=''>
			<div class='main-image'>
				<img src='{$dirImages}/Product/{$category}/{$brand}/{$item}/{$item}.jpg'>
			</div>
			<div class='thumb-images'>
				{foreach from=$itemImages item=image}
					<div class='thumb-wrapper'><a class='RialtoPopup' href='{$dirImages}/Product/{$category}/{$brand}/{$item}/{$image}.jpg'><img class='' src='{$dirImages}/Product/{$category}/{$brand}/{$item}/{$image}.jpg' ></a></div>
				{/foreach}
			</div>
			<div class='spacer-medium'></div>
			<div class='section-header'>
				Shipping Information
			</div>
			<p class='shipping-info'>
				<label >Domestic shipping (USA)</label><span>$6.95</span><br/>
				<label >Internationl shipping </label><span>$20.95</span><br/>
			</p>
			<div class='section-header'>
				Return Policies
			</div>
			{include file="product/partials/category-items/$category/$brand/$item/$item return policy.tpl"}
			<strong>General return</strong>
			<p>
				All returns must be in its original condition with all packaging included.
				All refunds are refunded through Paypal.<br/>
				All returns are 100% refunded and must be returned to<br/><br/>
				VEdance<br/>
				94-19 35th Ave, #D5<br/>
				Jackson Heights, NY 11372<br/>
				USA<br/><br/>
				All returns must be tracked and tracking ID sent to VEdance.info@gmail.com<br/>
			</p>
		</div>

		<div class='content-right'>

			<div class='section-header'>
				<strong>{$category}</strong> <br/>
				{$item}
			</div>
		
			{include file="product/partials/category-items/$category/$brand/$item/$item.tpl"}
			
			
			<div class='order-form'>
				<form id='product-order-form' class='' style='width: 400px;' action='{$siteRoot}/checkout/add' method='post'>
					<input type='hidden' name='name' value='{$item}' />
					<div>
						{foreach from=$itemAttributes item=attribute key=attributeName}
						<label>{$attributeName}:</label>
							<div class='attribute-info' style='display:inline-block'>
							{include file="forms/elements/$attribute"}
							</div>
							<div class='spacer-medium'></div>
						{/foreach}
					</div>

					<div class='spacer-medium'></div>
					<div>
						<label></label>
						<button class='large positive'>Add to cart</button>
					</div>
					<input name='sex' type='hidden' value='{$sex}'>
					<input name='category' type='hidden' value='{$category}'>
					<input name='brand' type='hidden' value='{$brand}'>
					<input name='item' type='hidden' value='{$item}'>
					<input name='itemOriginalPrice' type='hidden' value='{$itemPrice}'>
					<input name='attr[price modifier]' type='hidden' value='0'>
				</form>
				<div class='product-price'>
					$<span id='product_price_final'>{$itemPrice}</span>
				</div>
			</div>
			
			<div class='section-header'>
				Student Discounts
			</div>
			<div>
				Students from dance organzaitions that have an account with us can enjoy great discounts on these product. <br/><br/>
				To have an account with us is very easy. Simply send us an Email at VEdance.info@gmail.com with your organization's name, email, and website with the subject of 'Collegiate Promotion Code Inquiry' and we can set up a promotion code
				for your organization and your members. <br/>
			</div>
		</div>	
	</div>
</div>

{literal}
<script>
var priceContainer = $('product_price_final');
var modifierInput = $$('input[name=attr[price modifier]]')[0];
modifierInput.set('value', 0); // everytime this page loads refresh modifier;


function updateProductOrderFormPrice(value){
	priceContainer.set('text', Number.from(priceContainer.get('text'))+value);	
	modifierInput.set('value', Number.from(modifierInput.get('value'))+value);
}

</script>
{/literal}

