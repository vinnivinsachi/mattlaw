<?php

abstract class Custom_Model_MtmMapper_Abstract
{
	//abstract protected $_dbTableClasses = array(); NEED TO DEFINE IN CHILD CLASS
	//abstract protected const $_mdelClasses = array(); NEED TO DEFINE IN CHILD CLASS
	
	//private $_dbTables = array(); 
	
	public function __construct() {
		if(!isset($this->_dbTableClasses)) throw new Exception('You must set $_dbTableClasses in your model: '.get_class($this)); // require _dbTableClasses
		if(!isset($this->_modelClasses)) throw new Exception('You must set $_modelClasses in your model: '.get_class($this)); // require _modelClasses
	}
	
}
