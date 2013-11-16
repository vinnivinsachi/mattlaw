<?php

class Custom_Zend_Acl_Assert
{
	// returns a single result from a custom query or throws an exception
	protected function queryReturnsOne($query) {
		// TODO make sure Exception goes to error controller
		
		$db = Zend_Db_Table::getDefaultAdapter(); // get default adapter
		$rowset = $db->query($query)->fetchAll(); // query db using provided query
		
		if(count($rowset) == 0) return false; // return false if nothing found
		else if(count($rowset) == 1) return $rowset[0]; // return the row if one found
		else if(count($rowset) > 1) throw new Exception("More than one result found from query: $query"); // throw error if more than one found				
	}
}
