<?php

class Application_Model_OrderProfile extends Custom_Model_Abstract
{
	// setup
	protected $_primaryKeyColumn = 'order_profile_ID';
	protected $_mapperClass = 'Application_Model_Mapper_OrderProfiles';
	
	// columns
	
	public $order_profile_ID;
	public $invoice;
	public $item_name;
	public $quantity;
	public $price;
	
	public $time_created;
	public $time_updated;
	
	
	// associated models
	//private $otherModels;
}
