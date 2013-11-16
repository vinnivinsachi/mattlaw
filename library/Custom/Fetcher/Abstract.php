<?php

class Custom_Fetcher_Abstract
{
	/**
	 * @return Zend_Db_Adapter_Abstract
	 */
	protected function getDb() {
		return Zend_Db_Table::getDefaultAdapter(); // get db adapter
	}

	/**
	 * Fetch all results from DB for a custom query.
	 * 
	 * @param Zend_Db_Select $query
	 * @return Zend_Db_Table_Rowset
	 */
	protected function fetchAllByQuery(Zend_Db_Select $select) {
		$db = self::getDb(); // get db adapter
		$rowset = $db->query($select)->fetchAll(); // query db using provided query
		
		if(count($rowset) == 0) return null; // return null if nothing found
		
		return $rowset; // return array of arrays
	}
	
	/**
	 * Fetch all results from DB for a custom query, expecting at most one result.
	 * 
	 * @param Zend_Db_Select $query
	 * @throws Exception if more than one result is returned.
	 * @return Zend_Db_Table_Rowset
	 */
	protected function fetchOneByQuery(Zend_Db_Select $query) {
		$rowset = self::fetchAllByQuery($query); // delegate to other function (requesting raw data)
		
		if(!$rowset) return null; // return null if nothing found
		if(count($rowset) > 1) throw new Exception("More than one result found from query: $query"); // throw error if more than one found
				
		return $rowset[0]; // return array of arrays
	}
	
}