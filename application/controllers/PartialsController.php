<?php

class PartialsController extends Custom_Zend_Controller_Action
{

    public function init() {
    	parent::init();  // Because this is a custom controller class

		$this->_ajaxContext->addActionContext('empty', 'json')
			 			   ->initContext();

		// get a requested variable
			$var = $this->_request->getParam('paramName');
    }

    public function indexAction() {
		$this->view->partial = $this->_request->getParam('partial');
	}
	
	public function exampleAction() {}
	public function contentAction() {
		$this->view->exampleText = $this->_request->getParam('exampleText');
	}
	public function emptyAction() {}

}

