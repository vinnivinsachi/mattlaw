<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
	
	// initialize autoloading
	public function _initAutoload() {
		$autoloader = Zend_Loader_Autoloader::getInstance();
		$autoloader->setFallbackAutoloader(false);
		$autoloader->registerNamespace('Custom_');
		// custom paths
		// TODO MARK: make sure this is efficient implementation
			$resourceLoader = new Zend_Loader_Autoloader_Resource(array(
			    'basePath'      => APPLICATION_PATH,
			    'namespace'     => 'Application',
			    'resourceTypes' => array(
			        'Process' => array(
			            'path'      => 'Process/',
			            'namespace' => 'Process'
			        ),
					'ParentController' => array(
						'path'		=> 'ParentController/',
						'namespace'	=> 'ParentController'
					),
					'Constants' => array(
						'path'		=> 'constants/',
						'namespace'	=> 'Constants'
					),
					'Acl' => array(
						'path'		=> 'acl/',
						'namespace'	=> 'Acl'
					),
			    ),
			));
	}
	
	// let Zend handle the sessions for all requests
	public function _initSession() {
		Zend_Session::start();
	}
	
	// global paths
	protected function _initPaths()
	{	
		// get stuff from .ini files
			$config = new Zend_Config($this->getOptions());
			
		// define global constants
			define('SITE_ROOT', substr($_SERVER['PHP_SELF'], 0, strrpos($_SERVER['PHP_SELF'], '/index.php')));
			//define('APPLICATION_PATH', '/Users/markswanson/Sites/svitlana/application/views/layouts');
			
			define('DOCUMENT_ROOT', $_SERVER['DOCUMENT_ROOT']);
			define('SITE_URL', $config->paths->siteURL);
			define('DIR_PARTIALS', $config->paths->dirPartials);
			define('DIR_CSS', SITE_ROOT.$config->paths->public->dirCSS);
			define('DIR_IMAGES', SITE_ROOT.$config->paths->public->dirImages);
			define('DIR_IMAGE_UPLOADS', DIR_IMAGES.$config->paths->public->dirImageUploads);
			define('DIR_JS', SITE_ROOT.$config->paths->public->dirJS);
	}
	
	// set up Zend_Layout
	public function _initZendLayout() {
		// set layout options
			$options = array(
				'inflectorTarget'	=>	'layouts/:script/layout.:suffix',
				'layout'		=>	'default',
				'viewSuffix'	=>	'tpl'
			);
		// initialize Zend_Layout
			Zend_Layout::startMvc($options);
		// get a variable for reference in the View
			$layout = Zend_Layout::getMvcInstance();
	}
	
	// set up error logging
	public function _initLog() {
		// create a writer to pass to the logger
			$writer = new Zend_Log_Writer_Stream(APPLICATION_PATH.'/../logs/log.txt');
		// create the logger
			$logger = new Zend_Log($writer);
		// send the logger to the registry
			Zend_Registry::set('logger', $logger);
		// Test message
			//$logger->info('Informational message');
	}
	
	// An external library for connecting Smarty to Zend
	public function _initNaneau() {
		/** Naneau_View_Smarty */
		require_once 'Naneau/View/Smarty.php';
		
		$viewRenderer = new Zend_Controller_Action_Helper_ViewRenderer();
		$viewRenderer->setView(new Naneau_View_Smarty(array(
			'compileDir' => APPLICATION_PATH.'/../tmp/templates_c',
			'pluginsDir' => APPLICATION_PATH.'/../library/Custom/Smarty/plugins'
		)));
		
		$viewRenderer->setViewSuffix('tpl'); //make it search for .tpl files 

		Zend_Controller_Action_HelperBroker::addHelper($viewRenderer); //add it to the action helper broker	
	}
	
	// set up routes for pretty urls
	public function _initRoutes(){
		$front = Zend_Controller_Front::getInstance();
		
		//$front = addControllerDirectory(APPLICATION_PATH.'/controllers')
		
		// example route
			//$route = new Zend_Controller_Router_Route('partials/:partialName/layout/none/*', array('controller'=>'partials', 'action'=>'index'));
			$storeAccountRoute = new Zend_Controller_Router_Route('store-account/:action/:storeDisplayName/*', array('controller'=>'store-account'));
			$storeVariationsRoute = new Zend_Controller_Router_Route('store-variations/:action/:storeDisplayName/*', array('controller'=>'store-variations'));
			
		// add routes
			$front->getRouter()->addRoute('storeVariations', $storeVariationsRoute)
							   ->addRoute('storeAccount', $storeAccountRoute);
	}

}

