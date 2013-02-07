<?php

class Application_Factory_Sessions
{

	static public function getShoppingCart() {
		$session = new Zend_Session_Namespace(Application_Constants_Sessions::$USER_APP); // get session
		if(!isset($session->shoppingCart)){
			$session->shoppingCart = new Application_Model_Cart();
		}
		$shoppingCart = &$session->shoppingCart;
		return $shoppingCart;
	}
	
}
