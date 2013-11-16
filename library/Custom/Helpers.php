<?php

class Custom_Helpers
{
	/**
	 * Removes any folder and all of it content.
	 * @param string $dir Absolute path
	 */
	static public function rrmdir($dir) { 
	   if (is_dir($dir)) { 
	     $objects = scandir($dir); 
	     foreach ($objects as $object) { 
	       if ($object != "." && $object != "..") { 
	         if (filetype($dir."/".$object) == "dir") rrmdir($dir."/".$object); else unlink($dir."/".$object); 
	       } 
	     } 
	     reset($objects); 
	     rmdir($dir); 
	   } 
	 }
	 
	 /**
	  * Creates a random string of the provided length.
	  * 
	  * @param int $length
	  * @return string
	  */
	static public function generateKey($length=16) {
	    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    $key = '';    
	    for($i = 0; $i < $length; $i++) $key .= $characters[mt_rand(0, strlen($characters)-1)];
	    return $key;
	}
	
	/**
	 * Create a PHP timestamp from a MySql DATETIME.
	 * 
	 * @param sting $mysqlDate The MySQL DATETIME to convert.
	 * @return int A PHP timestamp.
	 */
	static public function dateMysqlToPHP($mysqlDate) {
		return strtotime($mysqlDate);
	}
	
	/**
	 * Create a MySql DATETIME from a PHP time.
	 * 
	 * @param int $phpDate The PHP date to convert (current time if null).
	 * @return string A MySql DATETIME stamp.
	 */
	static public function datePHPToMysql($phpDate=null) {
		if(!$phpDate) $phpDate = time();
		return date('Y-m-d H:i:s', $phpDate);
	}
	
	/**
	 * Create a PHP timestamp from a Google date.
	 * 
	 * @param string $googleDate
	 * @return int PHP timestamp.
	 */
	static public function dateGoogleToPHP($googleDate) {
		// PHP 5.3
		//if(strlen($googleDate) > 10) { $datetime = DateTime::createFromFormat(Custom_Constants::$GOOGLE_DATETIME_FORMAT, $googleDate); } // create datetime object from date with a time
		//else { $datetime = DateTime::createFromFormat(Custom_Constants::$GOOGLE_DATETIME_FORMAT_NOTIME, $googleDate); } // create datetime object from date with only a day
		//if($datetime) return $datetime->getTimestamp(); // return the timestamp
		
		// PHP 5.2
		$datetime = strtotime($googleDate); // get date from google
		if($datetime) return $datetime;
		else return null;
	}
	
	/**
	 * Nicely formats a php date for printing to the screen.
	 * 
	 * @param int $phpDate
	 * @return string
	 */
	static public function formatPHPDate($phpDate, $format=null) {
		if(!$format) { $format = 'M j, Y'; }
		return date($format, $phpDate);
	}
	
	static public function filterString($string) {
		$unicodeEnabled = (@preg_match('/\pL/u', 'a')) ? true : false; // is Unicode enabled?
        if (!$unicodeEnabled) { // POSIX named classes are not supported, use alternative a-zA-Z match
            $pattern = '/[^a-zA-Z\s]/';
        } else $pattern = '/[^a-zA-Z\s]/u';

        $filteredString = preg_replace($pattern, '', (string) $string); // replace stuff
		$filteredString = trim($string); // remove white spaces from beginning and end
		$filteredString = str_replace(' ', '_', $filteredString); // replace white spaces
		$filteredString = strtolower($filteredString);
		
		return $filteredString;
	}
	
	/**
	 * Construct the array into a format that can be used by the category filter tpl.
	 * @param unknown_type $listingCategories
	 * @return $menuCategory
	 */
	static public function generateListingCategoriesFromDB($listingCategories){
			$menuCategories;
			foreach($listingCategories as $k=>$v) {
				$category = $v['design_category_ID'];
				$categoryHierarchy = Application_Constants_Categories::$HIERARCHY[$category];
				$link = SITE_ROOT.'/dra-barcodes/index/categoryID/'.$category;
				
				if(count($categoryHierarchy['hierarchy'])==2) {
					$menuCategories[$categoryHierarchy['hierarchy'][0]]['secondCategory'][$categoryHierarchy['hierarchy'][1]][] = array(
						'category_ID' => $category, 
						'displayed_as' => $categoryHierarchy['displayed_as'], 
						'quantity' => $v['item_count'],
						'link' => $link
						);
				} else {
					$menuCategories[$categoryHierarchy['hierarchy'][0]]['baseCategory'][] = array(
						'category_ID' => $category, 
						'displayed_as' => $categoryHierarchy['displayed_as'], 
						'quantity' => $v['item_count'],
						'link' => $link
						);
				}
			}
			return $menuCategories;
	}
}
