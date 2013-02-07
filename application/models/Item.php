<?php

class Application_Model_Item implements ArrayAccess
{

	// columns
	public $name;
	public $sex;
	public $category;
	public $price;
	public $finalProductName;
	public $priceModifier;
	
// ============================ ARRAY ACCESS ================================
	public function offsetExists($offset) { return isset($this->$offset); }
	public function offsetGet($offset) { return isset($this->$offset) ? $this->$offset : null; }
	public function offsetUnset($offset) { unset($this->$offset); }
	public function offsetSet($offset, $value) { $this->$offset = $value; }
	
}
