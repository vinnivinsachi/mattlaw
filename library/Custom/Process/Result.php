<?php

class Custom_Process_Result
{
	public $success; // true / false
	public $message;
	public $data;
	
	/**
	 * Constructs a process result object for json use.
	 * 
	 * @param bool $success
	 * @param array $data
	 * @param array $errorMessage
	 */
	public function __construct($success, $data=null, $message=null) {
		$this->success = $success;
		$this->message = $message;
		$this->data = $data;
	}
	
}
