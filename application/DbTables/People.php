<?php

class Application_DbTable_People extends NovumWare_Zend_Db_Table_Abstract
{
	protected $_modelClass = 'Application_Model_Person';
    protected $_name = 'people';
	protected $_primary = 'person_id';
}
