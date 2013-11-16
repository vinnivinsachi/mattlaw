<?php

class Custom_Zend_Session_Namespace extends Zend_Session_Namespace
{
	public function setRedirect($action, $controller=null, $params=null) {
		$this->redirectAction = $action;
		$this->redirectController = $controller;
		$this->redirectParams = $params;
	}
	
	public function getRedirect() {
		$redirectInfo = array();
		
		// get redirect info
			$redirectInfo['action'] = $this->redirectAction;
			$redirectInfo['controller'] = $this->redirectController;
			$redirectInfo['params'] = $this->redirectParams;
		
		// erase redirect info
			unset($this->redirectAction);
			unset($this->redirectController);
			unset($this->redirectParams);
			
		return $redirectInfo;
	}
}
