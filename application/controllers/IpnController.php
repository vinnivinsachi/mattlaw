<?php

class IpnController extends Application_Controller
{
	
		public function init(){
			parent::init();
			$this->getHelper('viewRenderer')->setNoRender();
			$this->_helper->layout->disableLayout();
		}	
		public function indexAction(){
		
		//$invoiceID = $this->_request->getParam('ipn');
		
		//Application_Process_Order::copyOrderFromCheckout($invoiceID);
		
			$this->_logger->info("0====here at received'\r'");
		
			$DB_Server = "localhost"; //your MySQL Server
			$DB_Username = "vincent"; //your MySQL User Name
			$DB_Password = "vincent"; //your MySQL Password
			$DB_DBName = "VEdance";
		
			//create MySQL connection
			$Connect = @mysql_connect($DB_Server, $DB_Username, $DB_Password)
			or die("Couldn't connect to MySQL:
			" . mysql_error() . "
			" . mysql_errno());

			//select database
			$Db = @mysql_select_db($DB_DBName, $Connect)
			or die("Couldn't select database:
			" . mysql_error(). "
			" . mysql_errno());
		
		
			$createOrder=false;
			
			$req = 'cmd=_notify-validate';
			
			foreach ($_POST as $key => $value) {
			$value = urlencode(stripslashes($value));
			$req .= "&$key=$value";
			
			////echo "<br/>post was: ".$value;
			}
			
			$header ='';
			
			// post back to PayPal system to validate
			
			$header .= "POST https://www.paypal.com/cgi-bin/webscr HTTP/1.0\r\n";//getrid of sandbox for real. 			
			//$header .= "POST https://www.sandbox.paypal.com/cgi-bin/webscr HTTP/1.0\r\n";
			$header .= "Content-Type: application/x-www-form-urlencoded\r\n";
			$header .= "Content-Length: " . strlen($req) . "\r\n\r\n";
			
			$fp = fsockopen ('ssl://www.paypal.com', 443, $errno, $errstr, 30);  //get rid of sandbox for real.			
			//$fp = fsockopen ('ssl://www.sandbox.paypal.com', 443, $errno, $errstr, 30);  //get rid of sandbox for real.

			/*$this->logger =Zend_Registry::get('orderLog');
			$this->logger->info("1====Here at IPN action'\r'");
			*/ 
			$this->_logger->info("1====fsockepen starting'\r'");
			if (!$fp) 
			{
			
				$this->_logger->info("2====fsockepen can not be done'\r'");
					
			} 
			else 
			{
				$this->_logger->info("3====fsockepen is open'\r'");

			
				fputs($fp, $header . $req);
				while (!feof($fp)) 
				{
					$this->_logger->info("====== here at !feof");
					$res = fgets ($fp, 1024);
					if (strcmp ($res, "VERIFIED") == 0) 
					{
					// check the payment_status is Compled
					
						$this->_logger->info("here at check verified");
						$this->_logger->info("invoice is: ".$_POST['invoice']);
						if($_POST['invoice']=='')
						{
							$this->_logger->info('you are missing invoice!');
						}
						/*elseif($_POST['payment_status']!='Completed')
						{
							$this->logger->info('payment not complete');
						}*/
						else
						{
							
							
							
							$invoiceID =  trim($_POST['invoice']);
							
							try
							{

									
								
								$this->_logger->info('here at before checkoutMapper');
								$checkoutMapper = new Application_Model_Mapper_Checkouts();
								$this->_logger->info('here at before fetch');
								$checkout = $checkoutMapper->fetchOneByColumn(array('invoice = ?'=> $invoiceID));
								$this->_logger->info('here at after fetch');
							
								$this->_logger->info(Zend_Debug::dump($checkout));	
							
								if($checkout){
									$createOrder = true;
								}else{
							
									$this->logger->info('shoppingCart->loadcart is not working');
								}
							}
							catch(Exception $ex)
							{
								$this->_logger->info($ex->getMessage());
							}
						}
				
					// //echo the response
						//echo "The response from IPN was: <b>" .$res ."</b><br><br>";
						
						$this->_logger->info("8888 == The response from IPN was: ".$res);
						//loop through the $_POST array and print all vars to the screen.
						
						foreach($_POST as $key => $value){
						
								//echo $key." = ". $value."<br>";
								
								if($key =='payment_status')
								{
									$this->_logger->info($key);
									$this->_logger->info($value);
								}
								
								if($key =='invoice')
								{
								$this->_logger->info($key);
								$this->_logger->info($value);
								}
						}
				
					}
					else if (strcmp ($res, "INVALID") == 0) 
					{
						// log for manual investigation
					
						// //echo the response
						//echo "The response from IPN was: <b>" .$res ."</b>";
						$this->_logger->info("8888 == The response from IPN was: ".$res);
					}
				}
					
				$this->_logger->info("at after fclose fp");
				if($createOrder==true)
				{
						$this->_logger->warn("starting to do stuff");
						
						Application_Process_Order::copyOrderFromCheckout($invoiceID); 
						
				}		
				else
				{

					$this->_logger->info("at createorder is false");		
				}
			}			

			fclose($fp);
			$this->_logger->info("at fclose");		
			
	}
		
}
	