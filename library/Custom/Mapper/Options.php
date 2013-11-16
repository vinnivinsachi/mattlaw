<?php

class Custom_Mapper_Options
{
	/** (array) Columns to include in the DB query */
	public $columnsInclude;
	
	/** (array) Columns to exclude from the DB query.  (Can be stacked with $columnsInclude). */
	public $columnsExclude;
	
	/** (array|string) additional custom defined SQL columns */
	public $columnsCustom;
	
	/** (string) The type of object to return from a query ('raw' / 'array' / 'model') */
	public $format;
	static public $FORMAT_RAW = 'raw';
	static public $FORMAT_ARRAY = 'array';
	static public $FORMAT_MODEL = 'model'; 
	
	/** (array) SQL WHERE clause ('column = ?'=>'value') */
	public $where;
	
	/** (array) SQL orWHERE clause ('column = ?' => 'value') */
	public $orWhere;
	
	/** (array|string) SQL ORDER BY clause (array('column') defaults to ASC / set array('column'=>false) for DESC) (string defaults to ASC) */
	public $orderBy;
	
	/** (array|int) SQL LIMIT clause (array(count, offset)) (int is just count) */
	public $limit;
	
	/** (array) SQL LIMIT clause (array(page, pageLength)) (doesn't work if $limit is set) */
	public $limitPage;
	
	/** (bool) Print the select statement for debugging purposes */
	//public $printSelect=false;

	
	/**
	 * @param array $options An array of options to be set automatically.
	 */
	public function __construct(array $options=null){
		if(is_array($options)) $this->setOptions($options); // set passed values
	}
	
	/**
	 * Set multiple options at once.
	 * @param array $options An array of options to set if they exist.
	 */
	public function setOptions(array $options) {
		foreach($options as $option => $value) { if(property_exists($this, $option)) $this->$option = $value; } // set values if options exist
		return $this; // return the object for chaining
	}
	
	/**
	* Append some options to a select statement.
	*
	* Only works for WHERE, ORDER BY and LIMIT.
	*
	* @param Zend_Db_Table_Select $select
	* return Zend_Db_Table_Select
	*/
	public function appendToSelect($select) {
		if(is_array($this->where)) foreach($this->where as $col => $val) { // WHERE
			if(is_int($col)) $select->where($val); // IF no value to quote in
			else $select->where($col, $val); // if quoting in a value
			//if(is_array($val)) $select->where("$col IN (?)", $val); // IF searching for multiple values in the column
			//else $select->where("$col = ?", $val); // IF searching for only one value for the column
		}
		
		if(is_array($this->orWhere)) foreach($this->orWhere as $col => $val) { // WHERE
			if(is_int($col)) $select->orWhere($val); // IF no value to quote in
			else $select->orWhere($col, $val); // if quoting in a value
			//if(is_array($val)) $select->where("$col IN (?)", $val); // IF searching for multiple values in the column
			//else $select->where("$col = ?", $val); // IF searching for only one value for the column
		}
		
		if(isset($this->orderBy)) {
			$orderBy = array(); // create empty orderBy array
			if(is_array($this->orderBy)) foreach($this->orderBy as $col => $val) { // ORDER BY
				if(is_bool($val)) { // IF $val is a BOOL
					if($val) $orderBy[] = "$col ASC"; // add ASC column
					else $orderBy[] = "$col DESC"; // add DESC column
				} else $orderBy[] = "$val ASC"; // ELSE ($val not a BOOL) add ASC column
			} else $orderBy[] = "$this->orderBy ASC"; // add ASC column
			$select->order($orderBy); // add orderBy to select
		}
		
		if(isset($this->limit)) { // LIMIT
			if(is_array($this->limit)) $select->limit($this->limit[0], $this->limit[1]); // add limit
			else $select->limit($this->limit, 0); // add limit
		} else if(is_array($this->limitPage)) $select->limitPage($this->limitPage[0], $this->limitPage[1]); // add limit
		
		//if($this->printSelect) exit($select);

		return $select; // return select
	}
}
