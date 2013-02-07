<strong>VEdance Order Confirmation</strong><br/><br/>

Buyer information ------------------------<br/><br/>

Invoice number: {$order.invoice}<br/>
{$order.buyer}<br/>
{$order.address_one}<br/>
{if $order.address_two}{$order.address_two}<br/>
{/if}
{$order.city}, {$order.state} {$order.zip}<br/>
{$order.phone}<br/>
{$order.email}<br/>
{$order.country}<br/><br/><br/>

Product information -----------------------<br/><br/>
{foreach from=$orderProfile item=profile}
<br/><br/>

{foreach from=$profile.item_details item=detail key=Key}
{$detail}<br/>
{/foreach}
quantity: {$profile.quantity}<br/>
price: {$profile.price}<br/>
{/foreach}
<br/><br/><br/>

Total quantity: {$order.quantity}<br/>
Subtotal: ${$order.subtotal}<br/><br/><br/>

{if $order.promotion_code!=''}
Promotion applied: {$order.promotion_code}<br/>
Promotion deducted: ${$order.promotion_deduction}<br/>
{/if}<br/><br/>

Order total -------------------------------<br/>
Total received: ${$order.total_to_be_paid}<br/><br/><br/>

Thank you very much for order.<br/><br/>

If you have any questions regarding this order,<br/> 
Please email us at vedance.info@gmail.com<br/><br/>

Order confirmation<br/>
VEdance LLC<br/>
