<?php

class SiteMapController extends Application_Controller
{
	
	public function init(){
		parent::init();
		$contextSwitch = $this->_helper->getHelper('contextSwitch');
        $contextSwitch->addActionContext('index', 'xml')
                      ->initContext();
    }
	
	public function indexAction(){
		
	  $layout = $this->_request->getParam('layout');
	  if($layout!='xml'){
	  	$this->_redirect('site-map/index/?layout=xml');
	  }	else{
	  	$this->getResponse()->setheader('Content-Type', 'text/xml');
	  }
	}	
	
}