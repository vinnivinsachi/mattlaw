<?php

class Custom_Zend_Application_Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
	
	// let Zend handle the sessions for all requests
	public function _initSession() {
		// TODO figure out sessions
		Zend_Session::start();
	}
	
	/**
	 * Set Autoloading paths.
	 * 
	 * @return Zend_Loader_Autoloader_Resource
	 */
	public function _initAutoload() {
		$autoloader = Zend_Loader_Autoloader::getInstance();
		$autoloader->setFallbackAutoloader(false);
		$autoloader->registerNamespace('Custom_');
                //$autoloader->registerNamespace('NovumWare_');

		
		// TODO MARK: make sure this is efficient implementation
		$resourceLoader = new Zend_Loader_Autoloader_Resource(array( // Custom folder structure
		    'basePath'      => APPLICATION_PATH,
		    'namespace'     => 'Application',
		    'resourceTypes' => array(
				'Acl' => array(
					'path'		=> 'Acl/',
					'namespace'	=> 'Acl'
				),
				'Constants' => array(
					'path'		=> 'Constants/',
					'namespace'	=> 'Constants'
				),
				'DbTable' => array(
					'path'		=> 'DbTable/',
					'namespace' => 'DbTable'
				),
				'Factory' => array(
		            'path'      => 'Factory/',
		            'namespace' => 'Factory'
		        ),
		        'Fetcher' => array(
		        	'path'		=> 'Fetcher/',
		        	'namespace' => 'Fetcher'
		        ),
		        'Mapper' => array(
		        	'path'		=> 'Mapper/',
		        	'namespace' => 'Mapper'
		        ),
		        'Process' => array(
		            'path'      => 'Process/',
		            'namespace' => 'Process'
		        ),
		    ),
		));

		// TODO: MARK: Is this optimal?
		set_include_path(get_include_path() . PATH_SEPARATOR . APPLICATION_PATH.'/../libraryApp'); // add an additional include path
		
		require_once APPLICATION_PATH.'/Controller.php'; // also include base Controller
		
		return $resourceLoader; // return the Application resource
	}
	
	// global paths
	protected function _initPaths()
	{	
		// get stuff from .ini files
			$config = new Zend_Config($this->getOptions());
			
		// define global constants
			define('SITE_ROOT', substr($_SERVER['PHP_SELF'], 0, strrpos($_SERVER['PHP_SELF'], '/index.php')));
			//define('APPLICATION_PATH', '/Users/markswanson/Sites/svitlana/application/views/layouts');
			
			define('DOCUMENT_ROOT', rtrim($_SERVER['DOCUMENT_ROOT'] , '/'));
			define('SITE_URL', $config->paths->siteURL);
			define('DIR_TREES', APPLICATION_PATH.'/'.$config->paths->dirTrees);
			define('DIR_PARTIALS', $config->paths->dirPartials);
			define('DIR_CSS', SITE_ROOT.$config->paths->public->dirCSS);
			define('DIR_IMAGES', SITE_ROOT.$config->paths->public->dirImages);
			define('DIR_JS', SITE_ROOT.$config->paths->public->dirJS);
			define('DIR_UPLOADS', SITE_ROOT.$config->paths->public->uploads);
			define('DIR_RIALTO_PUBLIC_LIBRARY', SITE_ROOT.$config->paths->public->dirRialtoPublicLibrary);
			define('DIR_RIALTO_JS_LIBRARY', DIR_RIALTO_PUBLIC_LIBRARY.$config->paths->public->dirRialtoJsLibrary);
			define('DIR_RIALTO_SCRIPT_LIBRARY', SITE_ROOT.$config->paths->public->dirScript);
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
	
	// Use smarty for templating views
	public function _initSmarty() {		
		$viewRenderer = new Zend_Controller_Action_Helper_ViewRenderer(); // get view renderer
		$viewRenderer->setView(new Custom_Smarty_View(array( // set view renderer to smarty
			'compileDir' => APPLICATION_PATH.'/../tmp/templates_c', // set template path
			'pluginsDir' => array( // set plugins paths
				realpath(APPLICATION_PATH.'/../library/Custom/Smarty/plugins'),
				realpath(APPLICATION_PATH.'/../libraryApp/Smarty/plugins'))
		)));
		$viewRenderer->setViewSuffix('tpl'); // make it search for .tpl files 
		Zend_Controller_Action_HelperBroker::addHelper($viewRenderer); // add it to the action helper broker	
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

}
