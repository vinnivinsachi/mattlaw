
<header>

<!-- =================================================== LOGO ================================================= -->
   	<div id='dr-logo'></div>

<!-- =================================================== NAV-MAIN ================================================= -->
       <nav id='nav-main'>
       	<ul>
           	<li><a href='{$siteRoot}/find/'>FIND A PRODUCT</a></li>
            <li><a href='{$siteRoot}/list'>LIST / SELL A PRODUCT</a></li>
        </ul>
       </nav>
       
<!-- =================================================== NAV-ACCOUNT ================================================= -->
<!-- TODO change account menu bar depending on if logged in user is user or store (have it load a partial upon login) -->
       <nav id='nav-account'>
			<ul>
				<!-- <li><a href='javascript:;'><span class='icon icon-invite-friend'></span></a></li> <li class='nav-spacer nav-logged-out'> | </li> -->
				<li class='nav-logged-out'><a class='rialtoPopup' href='{$siteRoot}/authentication/login'>Login / Join</a></li> <li class='nav-spacer nav-logged-out'> | </li>
				<li class='nav-logged-in nav-user'><a href='{$siteRoot}/my-stores'>My Stores</a></li> <li class='nav-spacer nav-logged-in nav-user'> | </li>
			   	<li class='nav-logged-in nav-user'><a href='{$siteRoot}/my-orders'>My Orders</a></li> <li class='nav-spacer nav-logged-in nav-user'> | </li>
			   	<li class='nav-logged-in nav-user'><a href='{$siteRoot}/my-listings'>My Listings</a></li> <li class='nav-spacer nav-logged-in nav-user'> | </li>
			   	<li class='nav-drop nav-logged-in nav-user'>
				<a href='{$siteRoot}/my-account'>Welcome <span id='logged-in-user-display-name' class='logged-in-user-display-name'>{$loggedInUser->display_name}</span><span class='icon icon-arrow-down'></span></a>
				<ul>
					<li><a href='{$siteRoot}/my-info'>My Info</a></li>
					<li><a href='{$siteRoot}/my-balance'>My Balance</a></li>
					<li><a href='{$siteRoot}/my-messages'>My Messages</a></li>
					<li><a href='{$siteRoot}/my-settings'>Settings</a></li>
					<li><a href='{$siteRoot}/authentication/logout'>Logout</a></li>
				</ul>
				</li class='nav-logged-in nav-user'> <li class='nav-spacer nav-logged-in nav-user'> | </li>
				
				<li id='quickcart'>
					<span class='rialtoTooltip rTooltipRight'>
						<a href='{$siteRoot}/shopping-cart' class='rialtoLink'>
							<span class='icon icon-cart' title='Quick cart, click to see your detailed shopping cart.'></span> Cart
						</a>
						<div class='rTooltipContent'>
							<div class='rTooltipTriggerOverlay'>			
								<a href='{$siteRoot}/shoppingCart' class='rialtoLink'>
									<span class='icon icon-cart 'title='Quick cart, click to see your detailed shopping cart.'></span> Cart
								</a>
							</div>
							<div class='rTooltipBody'>
								<!-- QUICK CART CONTENT -->
									<ul class='overflow-hidden'>
										<li>
											<div class='product-name'>Latin Pants</div>
											<div class='quantity'>1</div>
											<div class='price'>$99</div>
										</li>
										<li>
											<div class='product-name'>Closed Toe Shoes</div>
											<div class='quantity'>1</div>
											<div class='price'>$90</div>
										</li>
										<li>
											<div class='product-name'>Blue Ballroom Gown</div>
											<div class='quantity'>1</div>
											<div class='price'>$300</div>
										</li>
										<li class='summary'>
											<div class='total'>Total</div>
											<div class='price'>$489</div>
										</li>
									</ul>


									<div class='width-100 align-right padding-top-meidum'><a href='{$siteRoot}/index/checkout'><button>Checkout</button></a></div>
							</div>
						</div>
					</span>
				</li>
				
           </ul>
       </nav>

		{if $loggedInUser}
			{literal}
				<style type='text/css'>
					#nav-account .nav-logged-out { display: none; }
				</style>
			{/literal}
		{else}
			{literal}
				<style type='text/css'>
					#nav-account .nav-logged-in { display: none; }
				</style>
			{/literal}
		{/if}
		
<!-- TODO STOP USING JQUERY -->
		{literal}
			<script type='text/javascript'>
				function authLogin(user) {
					$('logged-in-user-display-name').set('text', user.display_name);
					$j('#nav-account').find('li.nav-logged-out').hide();
					if(user.role == 'store') $j('#nav-account').find('li.nav-logged-in.nav-store').fadeIn();
					else $j('#nav-account').find('li.nav-logged-in.nav-user').fadeIn();
					$('nav-account').highlight('#000000'); // draw attention to the change
					$Rialto.getPlugin('RialtoFlashMessage').show('You have successfully logged in!'); // flash a message
				}
				
				function flashSuccessMessage(message) {
					$Rialto.getPlugin('RialtoFlashMessage').show(message);	// flash error message
				}
				
				function flashErrorMessage(message) {
					$Rialto.getPlugin('RialtoFlashMessage').show(message);	// flash error message
				}
			</script>
		{/literal}


<!-- TESTING -->
	<a style='position:absolute;bottom:5px;right:100px;' href='{$siteRoot}'>INDEX</a>
	<a style='position:absolute;bottom:5px;right:50px;' href='{$siteRoot}/test'>TEST</a>
<!-- TESTING -->  	



<!-- =================================================== BOTTOM BAR ================================================= -->
       <div id='header-bottom-bar'></div>

</header>



		
<!-- =================================================== GLOBAL JS ================================================= -->
