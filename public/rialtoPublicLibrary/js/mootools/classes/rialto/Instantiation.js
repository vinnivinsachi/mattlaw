window.addEvent('domready', function(event){
	
	// Rialto utility functions
	$Rialto = new Rialto({
		RialtoLoadingImage: {
			url: '{/literal}{$dirImages}/loading.gif{literal}'
		},
	});
	$Rialto.setup();
	
});
