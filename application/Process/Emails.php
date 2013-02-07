<?php

class Application_Process_Emails extends Custom_Process_Emails
{
		
	/**
	 * Send an email generated from an email template.
	 * 
	 * @param array $templateInfo array(path/to/template/view/script, subject).
	 * @param string|array $recipient Recipient email adress.
	 * @param array $params Params to pass to the template.
	 * @param string $sender Sender email address.
	 * @return void
	 */
	static public function emailTemplate(array $templateInfo, $recipient, array $params=null, $sender=null) {
		$sender = self::checkSenderEmail($sender); // check the sender email address
		parent::emailTemplate($templateInfo, $recipient, $sender, $params); // delegate to parent method
	}
	
	/**
	 * Save an email generated from a template in the DB, to be send later.
	 * 
	 * @param array $templateInfo array(path/to/template/view/script, subject).
	 * @param string|array $recipient Recipient email adress.
	 * @param array $params Params to pass to the template.
	 * @param string $sender Sender email address.
	 * @return void
	 */
	static public function saveTemplate(array $templateInfo, $recipient, array $params=null, $sender=null) {
		$sender = self::checkSenderEmail($sender); // check the sender email address
		$html = Custom_Process_Partials::evalPartial('emails/'.$templateInfo[0], $params); // generate email html
		self::save($recipient, $templateInfo[1], $html, $sender); // send email
	}
	
	/**
	 * Save an email in the DB, to be sent later.
	 * 
	 * @param string|array $recipient Recipient email adress.
	 * @param unknown_type $subject The Subject of the email.
	 * @param unknown_type $html The HTML content of the email.
	 * @param string $sender Sender email address.
	 * @return void
	 */
	static private function save($recipients, $subject, $html, $senders) {
		$recipients = self::implodeEmailAddresses($recipients); // turn recipients into a string for DB
		$senders = self::implodeEmailAddresses($senders); // turn senders into a string for DB
				
		$emailsMapper = new Application_Model_Mapper_Emails(); // create emails mapper
		$emailModel = new Application_Model_Email(); // create email model
		$emailModel->recipients_string = $recipients; // set email recipient string
		$emailModel->subject = $subject; // set email subject
		$emailModel->html = $html; // set email html
		$emailModel->sender_string = $senders; // set email sender string

		$emailsMapper->save($emailModel); // save the email in the DB
	}
	
	/**
	 * Convert array of emails addresses to a string to be stored in the DB.
	 * 
	 * @param string|array $addresses
	 * @return string String of emails addressesin the format 'name:address, name:address'
	 */
	static protected function implodeEmailAddresses($addresses) {
		$addressesString = ''; // create empty string to hold addresses
		if(is_array($addresses)) { // IF addresses is an array
			foreach ($addresses as $name => $address) { // FOREACH address
				if(!is_int($name)) { $addressesString .= "$name:"; } // IF name is not an int, append '$name:' to addresses string
				$addressesString .= "$address, "; // append '$address, ' to addresses string
       		}
			$addressesString = trim($addressesString, ', '); // trim trailing ', ' from addresses string
			return $addressesString; // return the addresses string
		} else { return $addresses; } // ELSE return addresses string as is
	}
	
	/**
	 * Convert string of email addresses from DB to an array (to be used with Zend_Mail).
	 * 
	 * @param string $addressesString
	 * @return array Array of addresses for Zend_Mail.
	 */
	static protected function explodeEmailAddressesString($addressesString) {
		$addressesArray = array(); // cereate empty array to hold addresses
		$addresses = explode(',', $addressesString); // convert addresses string to an array
		foreach($addresses as $address) { // FOREACH address in addresses
			$subArray = explode(':', $address); // explode the address to separate name and email
			if(count($subArray) > 1) { $addressesArray[$subArray[0]] = $subArray[1]; } // IF there is a name and an address save them in the addresses array
			else { $addressesArray[] = $subArray[0]; } // ELSE (there is only an address) save it in the addresses array
		}
		return $addressesArray; // return array of addresses
	}
	
	/**
	 * Get the default sender email address if none provided.
	 * 
	 * @param string $sender The sender's email address.
	 * @return string The provided (or default) sender's email address.
	 */
	static private function checkSenderEmail($sender) {
		if(!$sender) { $sender = Application_Constants_Emails::$SENDER_NOTIFICATIONS; } // default sender email address
		return $sender; // return sender email address
	}
	
	/**
	 * Send all emails that are waiting to be sent in the DB.
	 * 
	 * @return void
	 */
	static public function sendAllSavedEmails() {		
		$emailsMapper = new Application_Model_Mapper_Emails(); // create emails mapper
		$emails = $emailsMapper->fetchAllByColumn(array('sent = ?' => false)); // fetch all unsent emails from the DB
		
		if(!$emails) { return; } // IF there are no emails to send, RETURN
		
		$sentEmailIDs = array(); // create empty array to hold email ID's (for recording as 'sent' in the DB)
		
		foreach($emails as $email) { // FROEACH email in emails
			$email['sender'] = self::explodeEmailAddressesString($email['sender_string']); // convert sender string to array
			$email['recipients'] = self::explodeEmailAddressesString($email['recipients_string']); // convert recipients string to array
			self::send($email['recipients'], $email['subject'], $email['html'], $email['sender']); // send the email
			$sentEmailIDs[] = $email['email_ID']; // record sent email ID
		}

		$emailsMapper->updateColumnsWhere(array('email_ID IN (?)'=>$sentEmailIDs), array('sent'=>true)); // update DB to show that emails were sent
	}
	
	
	static public function emailRegistrationVerifyEmail($recipient, $name, $save=false) {
		$params = array( // set template params
			'name'	=> $name
		);
		if($save) { self::saveTemplate(Application_Constants_Emails::$REGISTRATION_VERIFY_EMAIL, $recipient, $params); } // IF saving (not sending now) delegate
		else { Application_Process_Emails::emailTemplate(Application_Constants_Emails::$REGISTRATION_VERIFY_EMAIL, $recipient, $params); } // ELSE delegate
	}
	
}
