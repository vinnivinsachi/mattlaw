<?php

class Application_Controller extends Custom_Zend_Controller_Action
{
	public $cartInfoSession;
	
	public function init(){
		parent::init();
		$session = new Zend_Session_Namespace(Application_Constants_Sessions::$USER_APP); // get session
		$this->view->partnerNetworkSystemMessage = 'VEdance will be visiting Mid West Collegiates in Oct!';
	//	Zend_Debug::dump($session);
	}
	public function postDispatch(){
		parent::postDispatch();
		$this->cartInfoSession = Application_Factory_Sessions::getShoppingCart();
		$this->view->cartInfoSession = $this->cartInfoSession;		
	}
}
