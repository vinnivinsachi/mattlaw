<body id='body' onUnload=''>
	
{literal}
	<script type='text/javascript'>
		$j(document).ready(function(){      
			// palettes
				$j('.palette').livequery(function(){
					$j(this).rialtoPalette();
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
					RialtoStars: {
						imgPath: '{/literal}{$dirImages}/RialtoStarsStars.gif{literal}'
					}
				});
				$Rialto.setup();			
		});

	</script>
{/literal}