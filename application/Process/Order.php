<?php

class Application_Process_Order
{
	/**
	 * Fetches the order from checkout, then copy it to orders table, and then remove the checkout table.
	 * @param string $invoiceID
	 */
	public static function copyOrderFromCheckout($invoiceID){
		$logger = Zend_Registry::get('logger');
		
		
		$checkoutMapper = new Application_Model_Mapper_Checkouts();
		$options = new Custom_Mapper_Options();
		$options->columnsExclude = ('checkout_ID');
		$checkout = $checkoutMapper->fetchOneByColumn(array('invoice = ?' => $invoiceID), $options);
		
		$checkoutProfileMapper = new Application_Model_Mapper_CheckoutProfiles();
		$options->columnsExclude = ('checkout_profile_ID');
		$checkoutProfiles = $checkoutProfileMapper->fetchAllByColumn(array('invoice =?' => $invoiceID),$options);
		
		$logger->info(Zend_Debug::dump($checkoutProfiles));
		$logger->info(Zend_Debug::dump($checkout));
		
		
		$orderMapper = new Application_Model_Mapper_Orders();
		$order = new Application_Model_Order($checkout);
		
		$logger->info(Zend_Debug::dump($order));
		$orderMapper->save($order);
		$orderProfileArray = array();
		
		foreach($checkoutProfiles as $k => $v){
			$tempOrderProfile = new Application_Model_OrderProfile($v);
			$orderProfileArray[] = $tempOrderProfile;
			
			$itemDetails = explode('-', $v['item_name']);
			$checkoutProfiles[$k]['item_details']= $itemDetails;
		}
		
		
		$orderProfileMapper = new Application_Model_Mapper_OrderProfiles();
		$orderProfileMapper->save($orderProfileArray);
		
		
		
		//$checkoutMapper->deleteWhere(array('invoice = ?' => $invoiceID));
		$logger->info(Zend_Debug::dump($checkoutProfiles));
		self::sendEmails($order, $checkoutProfiles);
	}
	
	
	public static function sendEmails($order, $orderProfiles){
		
		// send one to the server
		Application_Process_Emails::emailTemplate(Application_Constants_Emails::$ORDER_CONFIRMATION, array('VEdance.info@gmail.com', $order['email']), array('order'=>$order, 'orderProfile'=>$orderProfiles));
		
	}
	
}
