<?php

class Custom_Model_Rialto_Abstract extends Custom_Model_Abstract
{
	//public $pluginName; // the name of the plugin (ie. RialtoLink)
	public $_defaultView = 'default'; // name of the default view
	public $view; // the view to use instead of the default
	
	public $_dirPlugins; // the path to the plugins directory
	
	public function __construct() {
		$this->_dirPlugins = DOCUMENT_ROOT.DIR_RIALTO_JS_LIBRARY; // set the path to the plugins directory
		if(!isset($this->_pluginName)) throw new Exception('Must set $_pluginName in model: '.get_class($this)); // make sure the plugin name is set
	}
}
