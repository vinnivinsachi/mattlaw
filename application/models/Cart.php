<?php

class Application_Model_Cart implements ArrayAccess
{
	// columns
	/**
	 * array of items in cart
	 */
	public $items;
	
	/**
	 * The number of quantity in shopping cart total
	 * @var int
	 */
	public $quantity;
	
	/**
	 * total cost of items in cart
	 */
	public $subTotal;
	
	/**
	 * total shipping cost in cart
	 */
	public $shippingTotal;
	
	/**
	 * total shipping cost in cart
	 */
	public $boolShippingTotalCalculated; 
	
	/**
	 * promotionCode specified for the cart
	 */
	public $promotionCode;
	
	/**
	 * promotion organization 
	 */
	public $promotionOrganization;
	
	/**
	 * promotion percentage categories
	 */
	public $percentageCategories;
		
	/**
	 * promotion numeric category applied;
	 */
	public $numericCategories;
	
	/**
	 * the amount promotion code is deducting
	 */
	public $promotionCodeMoneyDeducted;
	
	/**
	 * @var bool
	 */
	public $useRewardPoints;
	
	/**
	 * the amount of reward points deducted
	 */
	public $rewardPointsMoneyAllocated;
	
	/**
	 * @var bool
	 */
	public $useGiftCards;
	
	/**
	 * the amount of gift card value deducted
	 */
	public $giftCardMoneyAllocated;

	/**
	 * @var bool
	 */
	public $useDRC;
	
	/**
	 * The amount of dancerialtocredit deducted
	 */
	public $danceRialtoCreditAllocated;
	
	/**
	 * the shipping address 
	 */
	public $shippingAddress;
	
	/**
	 * total to be paid
	 */
	public $totalToBePaid;
	

	// associated models	
	
	public function __construct(){
		$this->subTotal = 0; // setting the default subTotal to 0 dollars.
		$this->totalToBePaid = 0;
		$this->promotionCodeMoneyDeducted = 0;
		$this->boolShippingTotalCalculated = false;
	}
	
// ============================ ARRAY ACCESS ================================
	public function offsetExists($offset) { return isset($this->$offset); }
	public function offsetGet($offset) { return isset($this->$offset) ? $this->$offset : null; }
	public function offsetUnset($offset) { unset($this->$offset); }
	public function offsetSet($offset, $value) { $this->$offset = $value; }
}
