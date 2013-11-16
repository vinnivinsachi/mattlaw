<?php

abstract class Custom_Mapper_Abstract
{
	//protected $_dbTableClass; NEED TO DEFINE IN CHILD CLASS
	//protected const $_modelClass; NEED TO DEFINE IN CHILD CLASS
	//protected const $_ownerIDColumn; POSSIBLY DEFINED IN CHILD CLASS
	
	protected $_dbTable;
	protected $_columns;
	
	/** @var bool Print the query instead of executing it. */
	public $printQuery = false;
	
	public function __construct() {
		if(!isset($this->_dbTableClass)) throw new Exception('Must set $_dbTableClass in model: '.get_class($this)); // require _dbTableClass
		if(!isset($this->_modelClass)) throw new Exception('Must set $_modelClass in model: '.get_class($this)); // require _modelClass
		$this->_columns = get_class_vars($this->_modelClass); // get all public properties as database columns from model
	}

	
	// ================================================== QUERY METHODS =============================================================
	/**
	 * Query the database
	 * 
	 * @param Custom_Mapper_Options $options Options that affect how the query is built.
	 * @return array|null Returns null if nothing found, or an array of type specified in $options
	 */
	public function fetchAll(Custom_Mapper_Options $options=null) {
		$select = $this->createSelect($options); // create select statement
		$rowset = $this->query($select); // fetch data
		$format = ($options) ? $options->format : null; // get format of result from options
		return $this->formatResult($rowset, $format); // format and return the result
	}
	
	/**
	 * Query the database expecting one or no results.
	 * 
	 * @param Custom_Mapper_Options $options
	 * @throws Exception When more than one entry is found
	 * @return array|Custom_Model_Abstract|Zend_Db_Table_Row
	 */
	public function fetchOne(Custom_Mapper_Options $options=null) {		
		$select = $this->createSelect($options); // create select statement		
		$rowset = $this->query($select); // fetch data
		
		if(count($rowset) > 1) throw new Exception('More than result found in table: '.$this->getDbTable()->info('name')); // throw error if more than one found
		
		$resultsArray = $this->formatResult($rowset, $options->format); // format results
		return $resultsArray[0]; // return a single result
	}
	
	private function query($query) {		
		if($this->printQuery) { exit($query); } // IF option set to print the query, then print instead of executing
		return $this->getDbTable()->fetchAll($query); // run the query on the DB
	}
	
	/**
	 * Generates a select statement based on the passed options.
	 * 
	 * @param Custom_Mapper_Options $options Options that affect how the query is built.
	 * @return Zend_Db_Table_Select
	 */
	protected function createSelect(Custom_Mapper_Options $options=null) {
		$columns = $this->getColumns($options); // get columns to fetch
		
		$select = $this->getDbTable()->select(); // get select object
		
		$select->from($this->getDbTable(), $columns); // TABLE and COLUMNS
		
		if($options) { $options->appendToSelect($select); } // append options to select
		
		return $select; // return select
	}
	
	/**
	 * Prints out the select statement from $options, but doesn't query the DB.
	 * 
	 * @param Custom_Mapper_Options $options
	 */
	/*public function printSelect(Custom_Mapper_Options $options) {
		echo $this->createSelect($options); // create select statement
	}*/
	
	/**
	 * Formats the result rowset.
	 * 
	 * @param Zend_Db_Table_Rowset $rowset
	 * @param string $format (raw | array | model)
	 */
	protected function formatResult(Zend_Db_Table_Rowset $rowset, $format=null) {
		if(count($rowset) == 0) return null; // return null for no results
		if($format == 'raw') return $rowset; // return raw data (rowset)
		if($format == 'array') return $this->convertToArray($rowset); // optionally return array of arrays
		if($format == 'model') return $this->convertToModels($this->convertToArray($rowset)); // return associated models
		return $this->convertToArray($rowset); // return array by default
	}
	
	/**
	 * Convert Zend Rowset to an array of arrays.
	 * 
	 * @param Zend_Db_Table_Rowset $rowset
	 * @return array of arrays
	 */
	private function convertToArray(Zend_Db_Table_Rowset $rowset) {
		$results = array();
		foreach($rowset as $row) { $results[] = $row->toArray(); } // convert each $rowset to array
		return $results; // return results array
	}
	
	/**
	 * Convert array of arrays to associated models.
	 * 
	 * @param array $resultsArray
	 * @return array of models
	 */
	private function convertToModels(array $resultsArray) {
		$models = array(); // create array to hold models
		foreach($resultsArray as $result) { $models[] = new $this->_modelClass($result); } // convert each array to associated model
		return $models; // return array of models
	}
	
	
	// ================================================== QUICK QUERY METHODS =============================================================
	/**
	 * Quick way to specify a search by column.
	 * 
	 * @param array $where The where property of $options (does not require $options to be passed).
	 * @param Custom_Mapper_Options $options Options that affect how the query is built.
	 */
	public function fetchAllByColumn(array $where, Custom_Mapper_Options $options=null) {
		if(!$options) $options = new Custom_Mapper_Options(); // create $options IF it doesn't exist
		
		$options->where = $where; // add WHERE to $options
		
		return $this->fetchAll($options); // delegate to fetchAll()
	}
	
	/**
	 * Quick way to specify a search by column expecting at most one result.
	 * 
	 * @param array $where The where property of $options (does not require $options to be passed).
	 * @param Custom_Mapper_Options $options Options that affect how the query is built.
	 * @return array|Custom_Model_Abstract
	 */
	public function fetchOneByColumn($where, Custom_Mapper_Options $options=null) {
		if(!$options) $options = new Custom_Mapper_Options(); // create $options IF it doesn't exist
		
		$options->where = $where; // add WHERE to $options
		
		return $this->fetchOne($options); // delegate to fetchOne()
	}
	
	/**
	* Quick way to fetch a row by the primary key.
	*
	* @param unkown_type $id The value of the primary key column to search for.
	* @param Custom_Mapper_Options $options Additional options to be passed in.
	* @return unkown_type
	*/
	public function fetchOneByID($id, Custom_Mapper_Options $options=null) {		
		$where = array($this->getPrimaryKeyColumn().' = ?' => $id); // create WHERE
		return $this->fetchOneByColumn($where, $options); // delegate to fetchOneByColumn()
	}
	
	/**
	 * This returns all variation sets for its respective owning entity with an ownerID.
	 * 
	 * @param $ownerID
	 * @param Custom_Mapper_Options $options Additional options to be passed in.
	 * @return unknown_type
	 */
	public function fetchAllForOwnerID($ownerID, Custom_Mapper_Options $options=null) {
		$where = array($this->getOwnerIDColumn().' = ?' => $ownerID); // create WHERE
		return $this->fetchAllByColumn($where, $options); // delegate to fetchAllByColumn()
	}
	

	// ================================================== SAVE METHODS =============================================================
	/**
	 * Save a single model or an array of models to the DB.
	 * 
	 * @param Custom_Model_Abstract|array $models
	 * @return int Last insert ID.
	 */
	public function save(&$models) {		
		if(!is_array($models)) { $modelsArray = array($models); } // make sure we are dealing with an array
		else { $modelsArray = $models; }
		
		$query = ''; // start with an empty string to hold the query
		foreach($modelsArray as $model) { // FOREACH model to save
			$query .= $this->generateSaveQuery($model); // generate the save query for the model
		}
		
		$db = $this->getDbTable(); // get DB Table
		
		//echo $query;
		$db->getAdapter()->query($query); // run the query
		
		$numModels = count($modelsArray); // how many models were passed in?
		$lastInsertedModel = $modelsArray[$numModels-1]; // get the last inserted model
		
		if(!$lastInsertedModel->_primaryKey){ // IF primary key is not set
			$lastInsertedModel->_primaryKey = $db->getAdapter()->lastInsertId(); // get the ID of the last model that was inserted
		}
		
		return $lastInsertedModel->_primaryKey;
	}
		
	/**
	 * Generate the save query for a single model.
	 * 
	 * @param Custom_Model_Abstract $model
	 * @return string The query.
	 */
	protected function generateSaveQuery(Custom_Model_Abstract &$model) {
		$this->checkModelClass($model); // make sure model is correct class
		
		$model->time_updated = Custom_Helpers::datePHPToMysql(); // set new time_updated
		if(!$model->getID()) $model->time_created = Custom_Helpers::datePHPToMysql(); // set time_created if model doesn't have a primary ID
		
		$db = $this->getDbTable(); // get DB Table
		$colNames = $this->getColumns(); // get possible columns from model
		$cols = '('; // create columns string
		$vals = '('; // create values string
		$updateCols = ''; // create update string

		foreach($colNames as $colName) {
			if(isset($model->$colName)) {
				$cols .= "$colName, "; // add column to cols
				if($model->$colName === '') $newVal = 'null'; // add null if empty string
				else $newVal = '"'.$model->$colName.'"'; // or add value
				$vals .= $newVal.', '; // add value to vals
				$updateCols .= $colName.'='.$newVal.', '; // create ON DUPLICATE string
			}
		}
		
		$cols = trim($cols, ', ').')'; // remove ending , and close
		$vals = trim($vals, ', ').')'; // remove ending , and close
		$updateCols = trim($updateCols, ', '); // remove ending ,
		
		$query = 'INSERT INTO '.$this->getDbTable()->info('name')." $cols VALUES $vals ON DUPLICATE KEY UPDATE $updateCols ; "; // create query
		
		return $query;
	}
	
	/**
	 * Update a single row in DB with the given data.
	 * 
	 * @param int|string $id The primary key of the row to be updated.
	 * @param array $data The data to update the row with array(key => val).
	 */
	public function updateColumnsForID($id, array $data) {
		$primaryKey = $this->getPrimaryKeyColumn(); // get primary key column name
		$this->getDbTable()->update($data, array("$primaryKey = ?" => $id)); // update a row in DB
		return $id; // return the primary key
	}
	
	/**
	 * Update a single row in DB with the given data.
	 * 
	 * @param array $where The where property of Custom_Mapper_Options.
	 * @param array $data The data to update the row with array(key => val).
	 */
	public function updateColumnsWhere(array $where, array $data) {
		if(!count($where)) throw new Exception('no where provided in '.__FILE__);
		
		$wheres = array(); // create array for holding WHERE caluses
		foreach($where as $col => $val) {
			if($val instanceof Zend_Db_Expr) $wheres[] = $col.' = '.$val->__toString();
			else $wheres[] = $this->getDbTable()->getAdapter()->quoteInto($col, $val); // create WHERE clauses and add to array
		}

		$whereString = array_pop($wheres);
		while(count($wheres)) $whereString .= ' AND '.array_pop($wheres);
		
		$this->getDbTable()->update($data, $whereString); // update rows in DB
	}
	
	
	// ================================================== HELPER METHODS =============================================================
	/**
	 * Get an array of column names based on the associated Model's public properties.
	 * Doesn't check to make sure that columns names are correct, so be careful!.
	 * 
	 * @param Custom_Mapper_Options $options
	 * @return array Column names.
	 */
	public function getColumns(Custom_Mapper_Options $options=null) {		
		$columns = array(); // empty array for collecting columns
		
		if(isset($options->columnsInclude)) { // IF columns specified for include
			if(!is_array($options->columnsInclude)) $options->columnsInclude = array($options->columnsInclude); // wrap includes in array IF NOT already done so
			foreach($options->columnsInclude as $col) $columns[] = $col; // add name to array of columns
		} else { // IF NO columns to include
			foreach($this->_columns as $col => $val) $columns[] = $col; // start with all columns
		}
		
		$primaryKeyCol = $this->getPrimaryKeyColumn(); // get primary key column name
		if(array_search($primaryKeyCol, $columns) === false) $columns[] = $primaryKeyCol; // make sure primary key column is included for saving
		
		if(isset($options->columnsExclude)) { // IF columns to exclude
			if(!is_array($options->columnsExclude)) $options->columnsExclude = array($options->columnsExclude); // wrap excludes in array IF NOT already done so
			foreach($options->columnsExclude as $col) { // FOR EACH column to be excluded
				if(($index = array_search($col, $columns)) !== false) unset($columns[$index]); // remove name from array of columns
			}
		}
		
		if(isset($options->columnsCustom)) { // IF custom columns specified
			if(is_array($options->columnsCustom)) foreach($options->columnsCustom as $alias => $col) { // IF customColumns is array
				if(is_string($alias)) $columns[$alias] = $col; // IF an alias is provided add it with the custom column to $columns
				else $columns[] = $col; // ELSE (no alias) add custom column to $columns
			}
			else $columns[] = $options->columnsCustom; // ELSE (not array) add custom column to $columns
		}
		
		return $columns; // return array of column names
	}
	
	/**
	 * @param array $values Values to be passed to the model constructor.
	 * 
	 * @return Custom_Model_Abstract An instance of the associated model.
	 */
	public function getModelInstance(array $values=null) {
		return new $this->_modelClass($values); // return an instance of the model
	}
	
	/**
	 * Make sure that $model is the mapper's associated model class.
	 * 
	 * @param Custom_Model_Abstract $model
	 * @throws Exception if $model is incorrect class.
	 */
	public function checkModelClass(Custom_Model_Abstract $model) {
		if(!(get_class($model) == $this->_modelClass)) throw new Exception('Incorrect type of model provided');
	}
	
	/**
	 * Setup the Db Table.
	 * 
	 * @param string $dbTableClass
	 * @throws Exception if the type of $dbTableClass is incorrect.
	 * @return The DbTable that was setup.
	 */
	protected function setDbTable(&$dbTableClass) {
		if(is_string($dbTableClass)) $dbTable = new $dbTableClass(); // create the DbTable instance
		if(!$dbTable instanceof Zend_Db_Table_Abstract) throw new Exception('Invalid table data gateway provided'); // make sure it's correct type
		$this->_dbTable = $dbTable; // set the DbTable
		return $this->_dbTable; // return the mapper
	}
	
	/**
	 * @return The DbTable instance associated with this class.
	 */
	public function getDbTable() {
		if($this->_dbTable === null) $this->setDbTable($this->_dbTableClass); // set DbTable if not yet set
		return $this->_dbTable; // return DbTable
	}
	
	/**
	 * @return The name of the primary key column of the associated DbTable.
	 */
	public function getPrimaryKeyColumn() {
		$primaryKeyColumn = $this->getDbTable()->info('primary'); // get primary key column name from associated Zend_Db_Table
		return $primaryKeyColumn[1]; // return the column name
	}
	
	/**
	 * @return The name of the owner ID column.
	 */
	public function getOwnerIDColumn() {
		if(!isset($this->_ownerIDColumn)) throw new Exception('Must set $_ownerIDColumn in model: '.get_class($this)); // require _ownerIDColumn
		return $this->_ownerIDColumn; // get owner key column
	}
	
	
	// ================================================== DELETE METHODS =============================================================
	/**
	 * Deletes rows in the database.
	 * 
	 * @param array $where The where property of Custom_Mapper_Options.
	 * @return int Number of rows deleted.
	 */
	public function deleteWhere(array $where) {
		$wheres = array(); // create array for holding WHERE caluses
		foreach($where as $col => $val) {
			if($val instanceof Zend_Db_Expr) $wheres[] = $col.' = '.$val->__toString();
			else $wheres[] = $this->getDbTable()->getAdapter()->quoteInto($col, $val); // create WHERE clauses and add to array
		}
		return $this->getDbTable()->delete($wheres); // delete rows from the DB and return number of rows deleted
	}
	
	
	// ================================================== QUICK DELETE METHODS =============================================================
	/**
	 * Quick method to delete a row in DB where primary key = $id.
	 * 
	 * @param unknown_type $id The primary key value of the row to delete.
	 * @return int Number of rows deleted.
	 */
	public function deleteID($id) {
		$primaryKey = $this->getPrimaryKeyColumn(); // get primary key column name
		$where = array("$primaryKey = ?" => $id); // create WHERE clause
		return $this->deleteWhere($where); // delegate to deleteWhere() method
	}

	/**
	 * Delete a particular model from DB (uses the model's primary key).
	 * 
	 * @param Application_Model_Abstract $model
	 * @return int Number of rows deleted.
	 */
	public function deleteModel(Custom_Model_Abstract $model) {
		$this->checkModelClass($model); // make sure model is correct class
		$primaryKey = $this->getPrimaryKeyColumn(); // get primary key column name
		$where = array("$primaryKey = ?" => $model->$primaryKey); // create WHERE clause
		return $this->deleteWhere($where); // delegate to deleteWhere() method
	}
			
	
	// ============================ PUBLIC ID FUNCTIONS ================================
	// dynamically create a publicID for this entry (unique only to other entries in the same table)
	/*public function createPublicID() {
		// make sure the associated model and dbtable have a uniqueID property
			$model = new $this->_modelClass;
			if(!property_exists($this->getDbTable(), 'uniqueIDColumn')) throw new Exception('The DbTable '.get_class($this->getDbTable()).' must have a uniqueIDColumn to create a uniqueID');
			if(!property_exists($model, $this->getDbTable()->uniqueIDColumn)) throw new Exception('The model '.$this->_modelClass.' must have the property: '.$this->getDbTable()->uniqueIDColumn.' to create a uniqueID');
		
		do {
			$uniqueID = Text_Password::create(10, 'unpronounceable');
		} while($this->findByUniqueID($uniqueID));
		return $uniqueID;
	}

	public function findByPublicID($uniqueID, array $options = null) {
		$object = $this->findByColumn($this->getDbTable()->uniqueIDColumn, $uniqueID, $options);
		return $object;
	}*/
	
	
	
	
	
	/**
	 * TODO this is for testing only!
	 * remove when lunch
	 */
	/*public function getModelClass(){
		return $this->_modelClass;
	}*/
	
	// set default properties that require a function
		//if(property_exists($this, 'dateCreated')) $this->dateCreated = date('Y-m-d H:i:s');

}
