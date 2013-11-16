<?php

class Application_Controller extends Custom_Zend_Controller_Action
{
	public $cartInfoSession;
	
	public function init(){
		parent::init();
		
	//	Zend_Debug::dump($session);
	}
	public function postDispatch(){
		parent::postDispatch();
			
	}
}