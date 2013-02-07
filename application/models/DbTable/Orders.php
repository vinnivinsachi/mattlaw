<?php
class Application_Model_DbTable_Orders extends Zend_Db_Table_Abstract
{
    protected $_name = 'orders';
	protected $_primary = 'order_ID';
}
