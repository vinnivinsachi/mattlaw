<?php

class Application_Model_CheckoutProfile extends Custom_Model_Abstract
{
	// setup
	protected $_primaryKeyColumn = 'checkout_profile_ID';
	protected $_mapperClass = 'Application_Model_Mapper_CheckoutProfiles';
	
	// columns
	
	public $checkout_profile_ID;
	public $invoice;
	public $item_name;
	public $quantity;
	public $price;
	
	public $time_created;
	public $time_updated;
	
	
	// associated models
	//private $otherModels;
}
