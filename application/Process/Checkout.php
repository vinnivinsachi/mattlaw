<?php

class Application_Process_Checkout
{
	/**
	 * Fetches the order from checkout, then copy it to orders table, and then remove the checkout table.
	 * @param string $invoiceID
	 */
	public static function creatCheckoutWithInvoice($cartInfoSession){
		
		
		return;
	}
	
	public static function calculateDiscount(){
		$cartInfoSession = Application_Factory_Sessions::getShoppingCart();
		if($cartInfoSession->promotionCode !=''){
			$cartInfoSession->promotionCodeMoneyDeducted = 0; // reset money deduction;
			$cartInfoSession->totalToBePaid = $cartInfoSession->subTotal; // reset totalToBePaid
			foreach($cartInfoSession->items as $k => $v){
					echo 'here foreach';
					//if there is a percentage, use percentage
					Zend_Debug::dump($v);
					Zend_Debug::dump($cartInfoSession->percentageCategories);
					Zend_Debug::dump($cartInfoSession->numericCategories);
					
					if(isset(Application_Constants_Promotions::$PROMOTIONS[$cartInfoSession->promotionCode]['categories'][$v['category']]['percentageDeduction'])){
						// calculate percentage deduction
						$percentage = Application_Constants_Promotions::$PROMOTIONS[$cartInfoSession->promotionCode]['categories'][$v['category']]['percentageDeduction'];
						$deduction = $v['price']*$v['qty']*$percentage/100;
						//echo "deduction is $deduction <br/>";
						$cartInfoSession->promotionCodeMoneyDeducted += $deduction;
					}elseif(isset(Application_Constants_Promotions::$PROMOTIONS[$cartInfoSession->promotionCode]['categories'][$v['category']]['numericDeduction'])){ // if there is a numberic, use numberic
						$numbericDeduction = Application_Constants_Promotions::$PROMOTIONS[$cartInfoSession->promotionCode]['categories'][$v['category']]['numericDeduction'];
						$deduction = ($numbericDeduction)*$v['qty'];
						// calculate numeric deduction
						//echo "number deduction is $deduction <br/>";
						$cartInfoSession->promotionCodeMoneyDeducted += $deduction;
					}
			}
			$cartInfoSession->totalToBePaid = $cartInfoSession->subTotal - $cartInfoSession->promotionCodeMoneyDeducted;
		}
	}	
}
