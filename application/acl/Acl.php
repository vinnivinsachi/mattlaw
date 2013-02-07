<?php
class Application_Acl_Acl extends Zend_Acl
{
	public function __construct() { 
		
		// rolls
			$this->addRole('guest');
			$this->addRole('member', 'guest');
			$this->addRole('admin');
    	
    	// deny all
    		$this->deny();
    	
    	// Controllers / Actions
	    	$this->addResource('authentication');
	    	$this->addResource('index');
			$this->addResource('my-account');
			$this->addResource('my-info');
			$this->addResource('registration');
			$this->addResource('store-account');
			$this->addResource('store-variations');
			$this->addResource('site-map');
			
			$this->addResource('error');
			$this->addResource('examples');
			$this->addResource('partials');
	    	$this->addResource('test');
	   		$this->addResource('product');
			$this->addResource('brands');
			$this->addResource('checkout');
			$this->addResource('ipn');
	
			// authentication
				$this->allow('guest', 'authentication', 'authenticate');
				$this->allow('guest', 'authentication', 'login');
				$this->allow('member', 'authentication', 'logout');
	    	
	    	// index
	    		$this->allow('guest', 'index');
	    		$this->allow('guest', 'site-map');
	
			// registration
				$this->allow('guest', 'registration');
				
	
	
	
	
			// error
				$this->allow('guest', 'error');
				
			// examples
				$this->allow('guest', 'examples');
				$this->allow('guest', 'product');
				$this->allow('guest', 'brands');
				$this->allow('guest', 'checkout');
				$this->allow('guest', 'ipn');
			
				$this->deny('guest', 'examples', 'no-access');
				$this->allow('member', 'examples', 'no-access');
				
			// partials
				$this->allow('guest', 'partials');
				
			// test
				$this->allow('guest', 'test');


		$this->allow('admin'); // allow admin to all

	    	
	    	// ===============================>>>>>>>>>>>>>>> FOR TESTING, ALLOW EVERYTHING	!!!!!!!!!!!!!

			//$this->allow();

	}
}
