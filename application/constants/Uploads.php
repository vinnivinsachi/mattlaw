<?php

class Application_Constants_Uploads implements NovumWare_Constants_Uploads_Interface
{
	
	// IMAGES
	static public $IMAGE_MAX_SIZE = 3000000; // 3 MB
	static public $IMAGE_ACCEPTED_TYPES = array('png', 'jpeg', 'jpg');
	
	
	static public $THUMB_SMALL = array('suffix'     => '_small',
	                                   'dimensions' => array(50, 50));
	static public $THUMB_MEDIUM = array('suffix'	 => '_medium',
	                                    'dimensions' => array(100, 100));
	static public $THUMB_LARGE = array('suffix'      => '_large',
	                                   'dimensions' => array(150, 150));
	
	
	static public function getAllThumbsArray() {
	    return array(
	        static::$THUMB_SMALL,
	        static::$THUMB_MEDIUM,
	        static::$THUMB_LARGE
	    );
	}
} 
