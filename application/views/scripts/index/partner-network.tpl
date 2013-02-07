<style>
<!--
-->
a:visited{
	color:white;
}
a:hover{
	color: red;
}
a{
	color: white;
}
</style>

<div class='inline-block border-box bordered' style='float:left; font-family:Arial; font-size: 12px; font-weight: normal; width: {$width}; background-color: black; color: white; padding: 5px;'> 
	<div class='box-hor' style='float:left;'>
		
		<div class='' style='float:left; width: 33%;  {if $width<=200}min-width: 190px;{/if}'>
			<a href='{$siteRoot}/?promotionCode={$code}'><img src='{$siteRoot}/images/VELogo.png' style=' width: 100%; '/></a>
		</div>
		
		{if $code !='Error'}
		
		<a href='{$siteRoot}/?promotionCode={$code}' target='_blank' style='float:left; width: 63%;  {if $width<=200}min-width: 190px;{/if} padding-left: 5px; '>
			<div class='' style=''>
				
				<p style='font-weight:bold;'>{$partnerInfo.organizationName} exclusive discounts!</p>
				<ul style='padding: 0px; margin: 0px; list-style: none; font-size: 10px;'>
					{foreach from=$partnerInfo.categories item=category key=Key}
							{if $category.numericDeduction}
								${$category.numericDeduction} off {$Key}<br/>
							{elseif $category.percentageDeduction}
								{$category.percentageDeduction}% off {$Key}<br/>
							{/if}
					{/foreach}
				</ul><br/>
				{if $partnerInfo.partnerText}
				<div>
					
				</div>
				{/if}
				{if $partnerNetworkSystemMessage}
				<div style='font-size: 10px;'>
					{$partnerNetworkSystemMessage}
				</div>
				{/if}
			</div>
		</a>
		{else}
			Sorry the code is incorrect.
		{/if}
		
	</div>
</div>