<?php

class IndexController extends Application_Controller
{
        public function preDispatch() {
            parent::preDispatch();
            $this->view->moduleAction = $this->getRequest()->getParam('action');
            //echo $this->getRequest()->getParam('action');
        }
    
	public function indexAction(){
	
		
		/*if($this->_request->getParam('layout') != 'tmp'){
			
			$this->_redirect('index/index/layout/tmp');
		}
		*/
	
		$code = $this->_request->getParam('promotionCode');
		if(array_key_exists($code, Application_Constants_Promotions::$PROMOTIONS)){
			//echo 'here at code applied';
			$this->cartInfoSession = Application_Factory_Sessions::getShoppingCart();
			$this->cartInfoSession->promotionCode = $code;
			$this->cartInfoSession->promotionOrganization = Application_Constants_Promotions::$PROMOTIONS[$code]['organizationName'];
			$this->cartInfoSession->promotionCategories = Application_Constants_Promotions::$PROMOTIONS[$code]['categories'];
			
			
			//$this->cartInfoSession->percentageCategories = Application_Constants_Promotions::$PROMOTIONS[$code]['percentageCategories'];
			//$this->cartInfoSession->numericCategories = Application_Constants_Promotions::$PROMOTIONS[$code]['numericCategories'];
			
			Application_Process_Checkout::calculateDiscount();
			
			$this->msg("Your organziations promotion code has been applied to this session. Please enjoy your purchase");
			//Zend_Debug::dump($this->cartInfoSession);
			
		}else{
			//echo 'code does not exist';
			// nothing happens
			
		}
	}	
        
        public function attorneyProfileAction(){
            
        }
	
	public function partnerNetworkAction(){
		$code = $this->_request->getParam('code');
		$codeInfo = Application_Constants_Promotions::$PROMOTIONS;
		
		//Zend_Debug::dump($codeInfo[$code]);
		if($codeInfo[$code]){
			
			$partnerInfo = $codeInfo[$code];
			$this->view->partnerInfo = $partnerInfo;
			$this->view->width = $partnerInfo['bannerInfo']['width'];
			$this->view->code = $code;
			//$this->view->height = '200px';		
		}else{
			$this->view->code = 'Error';
		}
		
		/*if($code){
			$this->msg($code.' has been applied to you cart');
		}*/
	}
	
	public function clubTeamAction(){
		
	}
	
	public function dnSizeChartAction(){
		
	}
	
	public function rayroseSizeChartAction(){
		
	}
	
	public function termsAction(){
		
	}
	
	public function faqAction(){
		
	}
	
	public function contactusAction(){
		
	}
	
	public function mapsAction(){

		/*
		define("MAPS_HOST", "maps.google.com");
		define("KEY", "AIzaSyBfSPv4fC0oZl03OxkawX7IsyIe0QlYEpw");
		
		$delay = 0;
		$base_url = "http://" . MAPS_HOST . "/maps/geo?output=xml" . "&key=" . KEY;
		
		$geocode_pending = true;
		
	
		 while ($geocode_pending) {
		    $address = "48105, USA";
		    $request_url = $base_url . "&q=" . urlencode($address);
		    $xml = simplexml_load_file($request_url) or die("url not loading");
		
		    $status = $xml->Response->Status->code;
		    if (strcmp($status, "200") == 0) {
		      // Successful geocode
		      $geocode_pending = false;
		      $coordinates = $xml->Response->Placemark->Point->coordinates;
		      $coordinatesSplit = explode(",", $coordinates);
		      // Format: Longitude, Latitude, Altitude
		      $lat = $coordinatesSplit[1];
		      $lng = $coordinatesSplit[0];
		
		      Zend_Debug::dump($coordinatesSplit);
		    echo $lat.' and '.$lng;
		    } else if (strcmp($status, "620") == 0) {
		      // sent geocodes too fast
		      $delay += 100000;
		    } else {
		      // failure to geocode
		      $geocode_pending = false;
		      echo "Address " . $address . " failed to geocoded. ";
		      echo "Received status " . $status . "
				\n";
		    }
		    usleep($delay);
		  }
		
		*/
	}
}