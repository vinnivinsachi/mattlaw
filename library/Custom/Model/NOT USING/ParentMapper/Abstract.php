<?php

abstract class Custom_Model_ParentMapper_Abstract
{

	//abstract protected $_parentDbTableClass = (string); NEED TO DEFINE IN CHILD CLASS
	//abstract protected const $_parentModelClass = (string); NEED TO DEFINE IN CHILD CLASS
	
	//abstract protected $_childDbTableClasses = array(); NEED TO DEFINE IN CHILD CLASS
	//abstract protected const $_childModelClasses = array(); NEED TO DEFINE IN CHILD CLASS
	
	private $_dbTables = array(); 
	
	public function __construct() {
		if(!isset($this->_parentDbTableClass)) throw new Exception('You must set $_parentDbTableClass in your model: '.get_class($this)); // require _parentDbTableClass
		if(!isset($this->_parentModelClass)) throw new Exception('You must set $_parentModelClass in your model: '.get_class($this)); // require _parentModelClass
		if(!isset($this->_childDbTableClasses)) throw new Exception('You must set $_childDbTableClasses in your model: '.get_class($this)); // require _childDbTableClasses
		if(!isset($this->_childModelClasses)) throw new Exception('You must set $_childModelClasses in your model: '.get_class($this)); // require _childModelClasses
	}
	
	
	// ============================ SELECT FUNCTIONS ================================
	// fetch a single parent with a entries from a single child table
	public function fetchOneWithChild($child) {
		// THIS METHOD NOT COMPLETE!!!
		throw new Exception('This is method has not been implemented yet...');
	}
	
	
	// fetch all parents each with all children
	public function fetchAllWithChildren() {
		// THIS METHOD NOT COMPLETE!!!
		throw new Exception('This is method has not been implemented yet...');
		
		$parentDbTable = $this->getDbTable($this->_parentDbTableClass); // get parent table
		$name = $parentDbTable->info(); $name = $name['name']; // get parent table name
		
		$select = $this->getDb()->select(); // create select statement
		$select->from($name); // add parent table to select
		foreach($this->_childDbTableClasses as $tableClass) { // add each child table to select statement
			$childDbTable = $this->getDbTable($tableClass); // get child table
			$childName = $childDbTable->info(); $childName = $childName['name']; // get child table name
			$select->from($childName); // add child table to select
		}
		
		Zend_Debug::dump($select->assemble());
	}
	
	//public function fetchOneWithChildren() {}
	
	//public function fetchAllByColumnWithChildren() {}
	//public function fetchOneByColumnWithChildren() {}
	
	
	// ============================ PRIVATE FUNCTIONS ================================
	// setup Zend_Db_Table
	protected function setDbTable($dbTableClass) {
		if(is_string($dbTableClass)) $dbTable = new $dbTableClass(); // create the DbTable instance
		if(!$dbTable instanceof Zend_Db_Table_Abstract) throw new Exception('Invalid table data gateway provided'); // make sure it's correct type
		$this->_dbTables[$dbTableClass] = $dbTable; // set the DbTable
		return $this; // return the mapper
	}
	
	// get associated Zend_Db_Table
	protected function getDbTable($dbTableClass) {
		if(!isset($this->_dbTables[$dbTableClass])) $this->setDbTable($dbTableClass); // set DbTable if not yet set
		return $this->_dbTables[$dbTableClass]; // return DbTable
	}
	
	// get default adapter
	public function getDb() {
		return Zend_Db_Table::getDefaultAdapter(); // get db adapter
	}
	
}
