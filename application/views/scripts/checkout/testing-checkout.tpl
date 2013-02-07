<div class='content' >
	
	<div class='breadcrumbs'>
		Checkout
	</div>
	
	
	{if $cartInfoSession.items|@count>0}
	<table class='checkout'>
		<thead>
			<tr>
				<td style='width: 30%;'>Items</td>
				<td style='width: 45%;'><span style='width: 100px;' class='align-right inline-block'>Description</span></td>
				<td style='width: 10%'>Qty.</td>
				<td class='align-right' style='width: 15%;'>Price</td>
				<td class='actions'>Actions</td>
			</tr>
		</thead>
		<tr>
		</tr>
		{foreach from=$cartInfoSession.items item=item key=cartItemKey}
		<tr>
			<td>
				{include file='checkout/partials/_product_thumb.tpl'}				
			</td>
			<td>
				{foreach from=$item.attr item=attrValue key=attr}
				<label style='width: 100px;' class='align-right inline-block'>{$attr} : </label> <span>{$attrValue}</span><br/>
				{/foreach}
			</td>
			<td>{$item.qty}</td>
			<td class='align-right'>${$item.total}</td>
			<td><a href='{$siteRoot}/checkout/remove?cartItemID={$cartItemKey}'><span class='icon icon-x' style='width: 15px; background-position: -17px -48px;'></span></a></td>
			
		</tr>
		
		{/foreach}
		<tr class='total' >
			<td colspan=2>
			
				Sub Total
			</td>
			<td>
				{$cartInfoSession.quantity}
			</td>
			<td class='align-right'>
				${$cartInfoSession.subTotal}
			<td>
		</tr>
		
		{if $cartInfoSession.promotionCode!=''}
		<tr class='' >
			<td colspan=3>
				<div class='left'>
				
				Deduction
				</div>
				<div class='right'>
				<label style='display: inline-block; width: 150px; text-align:right;'>Code:</label><span id='promotion-applied'>{$cartInfoSession.promotionCode}</span><br/>
				<label style='display: inline-block; width: 150px; text-align:right;'>Organization:</label><span id='promotion-organization'>{$cartInfoSession.promotionOrganization}</span><br/>
				<label style='display: inline-block; width: 150px; text-align:right;'>Applied category:</label><ul style='display: inline-block; list-style: none; margin: 0px; padding: 0px;'>
						{foreach from=$cartInfoSession.promotionProductCategories item=category} 
							<li>{$category}</li>
						{/foreach}
						</ul>
				</div>
			</td>
			<td class='align-right'>
				{if $cartInfoSession.promotionCodeMoneyDeducted}
				(${$cartInfoSession.promotionCodeMoneyDeducted})
				{/if}
			<td>
		</tr>
		{/if}
		<tr class='' style='font-size: 16px;'>
			<td colspan=3>
				Total
			</td>
			<td class='align-right'>
				${$cartInfoSession.totalToBePaid}
			<td>
		</tr>
	</table>
	
	<form class='RialtoForm checkout-form right' method='post' action='{$siteRoot}/checkout/apply-code'>
	<div>
		<label style='width: 150px; font-size: 12px; text-align: left;'>Promotion code</label>
		<input class='required' style='vertical-align: middle; width: 200px;' type='text' name='promotionCode' style='width: 150px;' placeholder='Enter code'/>
	</div>
		<button class='positive small right'>
			Apply code
		</button>
		
	</form>
	
	
	<div class='align-right'>
		<div class='left'>
			<img src='https://www.paypal.com/en_US/i/bnr/horizontal_solution_PPeCheck.gif'>
		</div>
		
		
		<form class='RialtoForm' action='{$siteRoot}/checkout/payment' class='checkout-form' method='post'>
		
			<span >Please fill out your shipping information,<br/> you will have to enter this again during paypment. </span><br/>
			<div><label style='width: 80px;'>Name</label><input class='required' type='text' name='buyer[name]' style='width: 150px;' placeholder='Your name'/></div>
			<div><label style='width: 80px;'>Phone</label><input class='required' type='text' name='buyer[phone]' style='width: 150px;' placeholder='Phone number'/></div>
			<div><label style='width: 80px;'>Email</label><input class='required validate-email' type='text' name='buyer[email]' style='width: 150px;' placeholder='Email address'/></div>
			<label style='width: 80px;'>Address one</label><input class='required' type='text' name='buyer[address_one]' style='width: 150px;' placeholder='Address one'/><br/>
			<label style='width: 80px;'>Address two</label><input type='text' name='buyer[address_two]' style='width: 150px;'/><br/>
			<label style='width: 80px;'>City</label><input class='required' type='text' name='buyer[city]' style='width: 150px;' placeholder='City'/><br/>
			<label style='width: 80px;'>State</label><input class='required' type='text' name='buyer[state]' style='width: 150px;' placeholder='State or province'/><br/>
			<label style='width: 80px;'>Zip</label><input class='required' type='text' name='buyer[zip]' style='width: 150px;' placeholder='Postal code or zip'/><br/>
			<label style='width: 80px;'>Country</label><input class='required' type='text' name='buyer[country]' style='width: 150px;' placeholder='country'/><br/>
			<div class='spacer-medium'></div>
		
			<button class='positive large'>
				Pay with paypal
			</button>
		
		</form>
		
		
		
	</div>
	{else}
		There are currently no items in your shopping cart.
	{/if}
</div>