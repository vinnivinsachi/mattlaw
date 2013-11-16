<?php

abstract class Custom_Model_DB_Abstract extends Custom_Model_Abstract
{
	// protected $_mapperClass = '[Path_To_Mapper]'; // must be set in the child model
	// protected $_primaryIDColumn = 'primaryID'; // must be set in the child model

	protected $_primaryKey; // generic primary key property (stores value NOT calumn name)

	public function __construct($passedValues = null) {
		if(!isset($this->_mapperClass)) throw new Exception('The model must have an associated mapper class: '.get_class($this)); // require mapperClass
		if(!isset($this->_primaryKeyColumn)) throw new Exception('The model must have a _primaryKeyColumn: '.get_class($this)); // require primaryKeyColumn
		// set generic primaryKey
			$primaryKey = $this->_primaryKeyColumn;
			$this->_primaryKey =& $this->$primaryKey;
		parent::__construct($passedValues); // call the parent class method
	}

	// set a property to a value if it exists
	public function __set($property, $value) {
		if(!property_exists($this, $property)) throw new Exception('Trying to set invalid '.get_class($this).' property: '.$property); // make sure property exists
		$this->$property = $value; // set property value
	}

	// get the value of a property if it exists
	public function &__get($property) {
		if(!property_exists($this, $property)) throw new Exception('Trying to get invalid '.get_class($this).' property: '.$property); // make sure property exists
		return $this->$property; // return value
	}

	/**
	 * Get the value of the primary key of this model.  (For getting the ID when you don't know the column name).
	 * 
	 * @return unknown_type the value of the primary key of this model.
	 */
	public function getID() {
		return $this->_primaryKey;
	}


	// ============================ INSTANCE METHODS ================================
	/**
	 * Get an instance of the mapper associated with this class.
	 * 
	 * @return Custom_Model_Mapper_Abstract
	 */
	public function getMapperInstance() {
		return new $this->_mapperClass(); // return an instance of the mapper
	}
	
}