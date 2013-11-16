<?php

abstract class Custom_Model_Abstract implements ArrayAccess
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
		$this->setValues($passedValues); // set passed values
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

	// set values of properties from an array of properties, if they exist
	/**
	 * Set model properties from array of values (only if they exist in the model).
	 * 
	 * @param array|stdClass $passedValues An associative array of values to set.
	 * @return Custom_Model_Abstract This model.
	 */
	public function setValues($passedValues) {
		if(is_array($passedValues)) foreach($passedValues as $property => $value) { if(property_exists($this, $property)) $this->$property = $value; } // set values if properties exist
		elseif(get_class($passedValues) == 'stdClass') foreach(get_object_vars($passedValues) as $property => $value) { if(property_exists($this, $property)) $this->$property = $value; } // set values if properties exist
		return $this; // return the object for chaining
	}

	// returns an array of all the values of the object, private or public (for JSON)
	/**
	 * Get all the properties of this model in an associative array.
	 * 
	 * @return array of model values.
	 */
	public function getValues() {
		$object = array();
		foreach($this as $k=>$v) {
			if(is_object($v) && get_parent_class($v) == 'Custom_Model_Abstract') $object[$k] = $v->getProperties();
			else if(is_array($v)) $object[$k] = $this->getArrayProperties($v);
			else $object[$k] = $v;
		}
		return $object;
	}

	// traverse an array to see if any values are objects that have the method getProperties() (for JSON)
	private function getArrayProperties($array) {
		$newArray = array();
		foreach($array as $k=>$v) {
			if(is_object($v) && get_parent_class($v) == 'Custom_Model_Abstract') $newArray[$k] = $v->getProperties();
			else if(is_array($v)) $newArray[$k] = $this->getArrayProperties($v);
			else $newArray[$k] = $v;
		}
		return $newArray;
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
	
	// ============================ ARRAY ACCESS ================================
	public function offsetExists($offset) { return isset($this->$offset); }
	public function offsetGet($offset) { return isset($this->$offset) ? $this->$offset : null; }
	public function offsetUnset($offset) { unset($this->$offset); }
	public function offsetSet($offset, $value) { $this->$offset = $value; }
	
}