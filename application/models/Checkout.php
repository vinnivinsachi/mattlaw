<?php

class Application_Model_Checkout extends Custom_Model_Abstract
{
	// setup
	protected $_primaryKeyColumn = 'checkout_ID';
	protected $_mapperClass = 'Application_Model_Mapper_Checkouts';
	
	// columns
	public $checkout_ID;
	public $invoice;
	public $quantity;
	public $subtotal;
	public $total_to_be_paid;
	public $buyer;
	public $address_one;
	public $address_two;
	public $city;
	public $state;
	public $zip;
	public $country;
	public $email;
	public $phone;
	public $promotion_code;
	public $promotion_deduction;
	public $promotion_organization;
	
	public $time_created;
	public $time_updated;
	
	
	// associated models
	//private $otherModels;
}
