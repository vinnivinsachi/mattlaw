<?php

class FabricController extends Application_Controller
{
	
	//public static $Server;
	
	public function init(){
		parent::init();  // Because this is a custom controller class

		$this->_ajaxContext->addActionContext('join-chat', 'json')
						   ->addActionContext('chat-with', 'json')
			 			   ->initContext();
		
	}
	
	public function indexAction(){
		// start the server
		$this->_logger->info('online chat stuff'); 
	}
	
}


