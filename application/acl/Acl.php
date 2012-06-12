<?php
class Application_Acl_Acl extends Zend_Acl
{
	public function __construct() { 
		
		// rolls
//			$this->addRole('guest');
    	
    	// deny all
//    		$this->deny();
    	
    	// Controllers / Actions
//	    	$this->addResource('index');

			// index
//	    		$this->allow('guest', 'index');
	

	    		
	    	// ===============================>>>>>>>>>>>>>>> FOR TESTING, ALLOW EVERYTHING	!!!!!!!!!!!!!

			$this->allow();

	}
}
