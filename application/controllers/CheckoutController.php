<?php

class CheckoutController extends Application_Controller
{
	
	public $cartInfoSession;
	
	public function init(){
		parent::init();
		$this->cartInfoSession = Application_Factory_Sessions::getShoppingCart();
	}
	public function indexAction(){
		//$this->view->cartItems = $cartItems;
		$this->cartInfoSession = Application_Factory_Sessions::getShoppingCart();
		//echo 'here at cart info session';
		Zend_Debug::dump($this->cartInfoSession);
	}	
	
	public function applyCodeAction(){
		$code = $this->_request->getParam('promotionCode');
		if(array_key_exists($code, Application_Constants_Promotions::$PROMOTIONS)){
			echo 'here at code applied';
			$this->cartInfoSession = Application_Factory_Sessions::getShoppingCart();
			$this->cartInfoSession->promotionCode = $code;
			$this->cartInfoSession->promotionOrganization = Application_Constants_Promotions::$PROMOTIONS[$code]['organizationName'];
			$this->cartInfoSession->percentageCategories = Application_Constants_Promotions::$PROMOTIONS[$code]['percentageCategories'];
			$this->cartInfoSession->numericCategories = Application_Constants_Promotions::$PROMOTIONS[$code]['numericCategories'];
			
			Application_Process_Checkout::calculateDiscount();
			
			//Zend_Debug::dump($this->cartInfoSession);
		}else{
			echo 'code does not exist';
			// nothing happens
			
		}
			$this->redirect('index', 'checkout');	
	}
	
	
	public function addAction(){
		//$item = $this->_reqest->getParam('');
		$sex = $this->_request->getParam('sex');
		$category = $this->_request->getParam('category');
		$item = $this->_request->getParam('item');
		$brand = $this->_request->getParam('brand');
		$this->cartInfoSession = Application_Factory_Sessions::getShoppingCart();
		Zend_Debug::dump($this->cartInfoSession);
		
		if($price = Application_Constants_Category::$CATEGORY[$sex][$category]['brands'][$brand][$item]){
			$itemAttr = $this->_request->getParam('attr');
			//such item exist
				$itemOne = new Application_Model_Item();
				$itemOne->name = $item;
				$itemOne->sex = $sex;
				$itemOne->category = $category;
				$itemOne->brand = $brand;
				if($itemAttr['price modifier'] == '0'){
					unset($itemAttr['price modifier']); // removing price modifier;
				 	$itemOne->priceModifier = 0;
				}else{
					$itemOne->priceModifier = $itemAttr['price modifier'];
				}
				$itemOne->attr = $itemAttr;
				$itemOne->price = $price+$itemOne->priceModifier;
				$itemOne->qty = 1;
				$itemOne->total = $itemOne->price*$itemOne->qty;
				
				$this->cartInfoSession->items[]=$itemOne;
				$this->cartInfoSession->quantity += $itemOne->qty ;
				$this->cartInfoSession->subTotal += $itemOne->total;
				$this->cartInfoSession->totalToBePaid += $itemOne->total;
				
				
				if(isset(Application_Constants_Promotions::$PROMOTIONS[$this->cartInfoSession->promotionCode]['categories'][$itemOne['category']]['percentageDeduction'])){
					// calculate percentage deduction
					$percentage = Application_Constants_Promotions::$PROMOTIONS[$this->cartInfoSession->promotionCode]['categories'][$itemOne['category']]['percentageDeduction'];
					$deduction = $itemOne['price']*$itemOne['qty']*$percentage/100;
					//echo "deduction is $deduction <br/>";
					$this->cartInfoSession->promotionCodeMoneyDeducted += $deduction;
					$this->cartInfoSession->totalToBePaid -= $deduction;
					
				}elseif(isset(Application_Constants_Promotions::$PROMOTIONS[$this->cartInfoSession->promotionCode]['categories'][$itemOne['category']]['numericDeduction'])){ // if there is a numberic, use numberic
					echo 'here at numeric deduction';
					$numbericDeduction = Application_Constants_Promotions::$PROMOTIONS[$this->cartInfoSession->promotionCode]['categories'][$itemOne['category']]['numericDeduction'];
					$deduction = ($numbericDeduction)*$itemOne['qty'];
					// calculate numeric deduction
					//echo "number deduction is $deduction <br/>";
					$this->cartInfoSession->promotionCodeMoneyDeducted += $deduction;
					$this->cartInfoSession->totalToBePaid -= $deduction;
				}
				echo Application_Constants_Promotions::$PROMOTIONS[$this->cartInfoSession->promotionCode]['categories'][$itemOne['category']]['numericDeduction'];
		}else{
			echo 'items cant be found';
		}
		$this->redirect('index', 'checkout');
	}
	
	public function removeAction(){
		$cartItemID = $this->_request->getParam('cartItemID');
		if(isset($this->cartInfoSession->items[$cartItemID])){
			$this->cartInfoSession->quantity -= $this->cartInfoSession->items[$cartItemID]['qty'];
			$this->cartInfoSession->subTotal -= $this->cartInfoSession->items[$cartItemID]['total'];
			$this->cartInfoSession->totalToBePaid -= $this->cartInfoSession->items[$cartItemID]['total'];
			
			$itemOne = $this->cartInfoSession->items[$cartItemID];
			if(isset(Application_Constants_Promotions::$PROMOTIONS[$this->cartInfoSession->promotionCode]['categories'][$itemOne['category']]['percentageDeduction'])){
					// calculate percentage deduction
					$percentage = Application_Constants_Promotions::$PROMOTIONS[$this->cartInfoSession->promotionCode]['categories'][$itemOne['category']]['percentageDeduction'];
					$deduction = $itemOne['price']*$itemOne['qty']*$percentage/100;
					//echo "deduction is $deduction <br/>";
					$this->cartInfoSession->promotionCodeMoneyDeducted -= $deduction;
					$this->cartInfoSession->totalToBePaid += $deduction;
					
			}elseif(isset(Application_Constants_Promotions::$PROMOTIONS[$this->cartInfoSession->promotionCode]['categories'][$itemOne['category']]['numericDeduction'])){ // if there is a numberic, use numberic
					$numbericDeduction = Application_Constants_Promotions::$PROMOTIONS[$this->cartInfoSession->promotionCode]['categories'][$itemOne['category']]['numericDeduction'];
					$deduction = ($numbericDeduction)*$itemOne['qty'];
					// calculate numeric deduction
					//echo "number deduction is $deduction <br/>";
					$this->cartInfoSession->promotionCodeMoneyDeducted -= $deduction;
					$this->cartInfoSession->totalToBePaid += $deduction;
			}
			
			unset($this->cartInfoSession->items[$cartItemID]);
		}
		$this->redirect('index', 'checkout');	
		
	}
	
	public function resetAction(){
		unset($this->cartInfoSession->items);
		$this->cartInfoSession->quantity = 0;
		$this->cartInfoSession->subTotal = 0;
		$this->redirect('index', 'checkout');	
		
	}
	
	public function paymentAction(){
		
		
		$invoiceNumber=Custom_Helpers::generateKey(10);
		$this->cartInfoSession->invoiceNumber = $invoiceNumber;
		
		
		// Saving checkout item to checkout tables
		$checkout = new Application_Model_Checkout();
		$checkoutMapper = new Application_Model_Mapper_Checkouts();
		
		
		$checkout->invoice = $this->cartInfoSession->invoiceNumber;
		$checkout->quantity = $this->cartInfoSession->quantity;
		$checkout->subtotal = $this->cartInfoSession->subTotal;
		$checkout->total_to_be_paid = $this->cartInfoSession->totalToBePaid;
		$checkout->promotion_code = $this->cartInfoSession->promotionCode;
		$checkout->promotion_organization = $this->cartInfoSession->promotionOrganization;
		$checkout->promotion_deduction = $this->cartInfoSession->promotionCodeMoneyDeducted;
		
		if($buyer = $this->_request->getParam('buyer')){
			$checkout->buyer = $buyer['name'];
			$checkout->address_one = $buyer['address_one'];
			$checkout->address_two = $buyer['address_two'];
			$checkout->city = $buyer['city'];
			$checkout->state = $buyer['state'];
			$checkout->zip = $buyer['zip'];
			$checkout->country = $buyer['country'];
			$checkout->email = $buyer['email'];
			$checkout->phone = $buyer['phone'];
		}
		
		$checkoutMapper->save($checkout);
		
		$checkoutProfileMapper = new Application_Model_Mapper_CheckoutProfiles();
		
		$checkoutProfileArray = array();
		foreach($this->cartInfoSession->items as $k => $item){
			Zend_Debug::dump($this->cartInfoSession->items);
			
			$this->cartInfoSession->items[$k]['finalProductName'] = $item->name;
			//$this->cartInfoSession->items[$k]['finalProductName'] = '';
			foreach($item['attr'] as $key => $vavlue){
				$this->cartInfoSession->items[$k]['finalProductName'] .= '-'.$key.':'.$vavlue;
			}

			$tempCheckoutProfile = new Application_Model_CheckoutProfile();

			$tempCheckoutProfile->item_name = $this->cartInfoSession->items[$k]['finalProductName'];
			$tempCheckoutProfile->quantity = $item->qty;
			$tempCheckoutProfile->price = $item->price;
			$tempCheckoutProfile->invoice = $checkout->invoice;
			
			$checkoutProfileArray[]= $tempCheckoutProfile;
		}
		
		Zend_Debug::dump($this->cartInfoSession->items);
		
		Zend_Debug::dump($checkoutProfileArray);
		$checkoutProfileMapper->save($checkoutProfileArray);
		
		
		//$query = "https://www.sandbox.paypal.com/cgi-bin/websrc?cmd=_cart&upload=1&business=vedance.info@gmail.com&invoice=".$this->cartInfoSession->invoiceNumber;
		$query = "https://www.paypal.com/cgi-bin/websrc?cmd=_cart&upload=1&business=vedance.info@gmail.com&invoice=".$this->cartInfoSession->invoiceNumber;
		
		//"https://www.paypal.com/cgi-bin/websrc?cmd=_cart&upload=1&business=vedance.info@gmail.com&invoice=".$invoiceNumber;

		//$query = "https://www.sandbox.paypal.com/cgi-bin/websrc?cmd=_cart&upload=1&business=vedance.info@gmail.com&invoice=".$this->cartInfoSession->cartInfo->invoiceNumber;

		//"&upload=1" must be put above if i decide to use shopping cart;

		
		if(count($this->cartInfoSession->items)==1)
		{
			
			$query .= "&item_name_1=".$this->cartInfoSession->items[$k]['finalProductName'];

			$query .="&amount_1=0";//.$this->shoppingCartItem[0]['unit_cost'];
			$query .="&quantity_1=1";
			
			echo $query;
			
		}
		elseif(count($this->cartInfoSession->items)>1)
		{
			
			$count = 0;
			foreach($this->cartInfoSession->items as $k =>$v)
			{
				
				$query .="&item_name_".($count+1)."=".$this->cartInfoSession->items[$k]['finalProductName'];
				$query .="&amount_".($count+1)."=0";//.$this->shoppingCartItem[$k]['unit_cost'];
				$query .="&quantity_".($count+1)."=1";
				$count ++;
			}
		}
		
		if($this->cartInfoSession->promotionCode != ''){
			$query .="&item_name_".($this->cartInfoSession->quantity+1)."=Promotion code applied: ".$this->cartInfoSession->promotionCode;
			$query .="&amount_".($this->cartInfoSession->quantity+1)."=0";//.$this->shoppingCartItem[$k]['unit_cost'];
			$query .="&quantity_".($this->cartInfoSession->quantity+1)."=1";
			
			$query.="&item_name_".($this->cartInfoSession->quantity+2)."=Total Amount";
			$query.="&amount_".($this->cartInfoSession->quantity+2)."=".$this->cartInfoSession->totalToBePaid;
			$query.="&quantity_".($this->cartInfoSession->quantity+2)."=1";
		}else{
		
			$query.="&item_name_".($this->cartInfoSession->quantity+1)."=Total Amount";
			$query.="&amount_".($this->cartInfoSession->quantity+1)."=".$this->cartInfoSession->totalToBePaid;
			$query.="&quantity_".($this->cartInfoSession->quantity+1)."=1";
		}
		
		
		//$query.="&shipping = 8";

		$query .= "&return=http://www.vedance.com/"."&cancel_return=http://www.vedance.com/checkout".
"&notify_url=http://www.vedance.com/ipn/index"; 


		//echo $query;
		$this->_redirect($query);
				
	}
	
	
	public function emailAction(){
		
		$invoice = $this->_request->getParam('invoice');
		
		$orderMapper = new Application_Model_Mapper_Orders();
		$order = $orderMapper->fetchOneByColumn(array('invoice = ?'=> $invoice));
		$orderProfileMapper = new Application_Model_Mapper_OrderProfiles(); 
		$orderProfile = $orderProfileMapper->fetchAllByColumn(array('invoice = ?' => $invoice));
		
		
		
		Zend_Debug::dump($order);
		Zend_Debug::dump($orderProfile);
		
		foreach($orderProfile as $k => $profile){
			echo $profile['item_name'];
			$itemDetails = explode('-', $profile['item_name']);
			$orderProfile[$k]['item_details']= $itemDetails;
			Zend_Debug::dump($profile);
		}
		
		Application_Process_Emails::emailTemplate(Application_Constants_Emails::$ORDER_CONFIRMATION, 'vedance.info@gmail.com', array('order'=>$order, 'orderProfile'=>$orderProfile));
	}
	
	/*public function testingCheckoutAction(){
		$invoiceID = $this->_request->getParam('invoice');
		Application_Process_Order::copyOrderFromCheckout($invoiceID);
	}*/
}