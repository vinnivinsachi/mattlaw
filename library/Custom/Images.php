<?php

class Custom_Images
{
	/**
	 * Create any number of thumbnails of an image (creates jpegs).
	 * !IMPORTANT: This method can only accept jpegs right now.
	 * 
	 * @param string $imagePath The path to the original image (including the extension).
	 * @param array $dimensions array(array('_small', array(width, height))).
	 * @return bool true if success, false otherwise.
	 */
	static public function createThumbnails($imagePath, array $dimensions) {		
		$newImagePath = self::removeExt($imagePath); // get the name of the original image without the extension
		//echo '<br/> original image'.$imagePath;	
		list($width, $height) = getimagesize($imagePath); // get the original image dimensions append the original
		
		foreach($dimensions as $key => $dim) {
			$maxWidth = $dim[1][0]; // get the max width of thumb
			$maxHeight = $dim[1][1]; // get the max height of thumb
			$sizeRatio = min($maxWidth/$width, $maxHeight/$height); // the smaller of the two ratios to make sure the new image fits in the provided dimensions
			$newImage = imagecreatetruecolor($width*$sizeRatio, $height*$sizeRatio); // create a new blank image
			if(!$origImage = imagecreatefromjpeg($imagePath)) return false; // get the original image with appended .jpg
			if(!imagecopyresampled($newImage, $origImage, 0, 0, 0, 0, $width*$sizeRatio, $height*$sizeRatio, $width, $height)) return false; // copy the image
			if(!imagejpeg($newImage, $newImagePath."$dim[0].jpg", 100)) return false; // save the new image
		}
	}
	
	/**
	 * Remove the extensions from an image path.
	 * 
	 * @param string $imagePath
	 * @return string
	 */
	static public function removeExt($imagePath) {
		return substr($imagePath, 0, strrpos($imagePath, '.'));
	}
}
