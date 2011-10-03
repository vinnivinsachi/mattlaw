<!DOCTYPE html>
<html lang='en'>

<head>
	<meta charset='utf-8' />
	
    {include file="$documentRoot/$siteRoot/js/header.html"}
    
	<title>DR - HTML SPEC</title>
</head>
<body id='body' onUnload=''>

<div id='rialto-loading-image-overlay' style='display:none; opacity:0'><img src='/Sites/zend_basic/public/images/loading.gif'></div>
	
{literal}
	<script type='text/javascript'>
		$j(document).ready(function(){      
			// palettes
				$j('.palette').livequery(function(){
			//		alert('above palette');
					$j(this).rialtoPalette();
			//		alert('below palette');
				});
				
				
				$j('.raty').livequery(function(){
					$j(this).raty({
						readOnly: true,
						start: 2,
						path: '{/literal}{$dirJS}/jquery/plugins/raty/img/{literal}',
					});
				});
		
		
		
				// Rialto utility functions
				$Rialto = new Rialto({
					RialtoLoadingImage: {
						url: '{/literal}{$dirImages}/loading.gif{literal}'
					},
				});

				// Rialto plugin wrapper and event delegator
				$RialtoPlugins = new RialtoPlugins({
					framework: 'zend',
				});
			
		});

	</script>
{/literal}