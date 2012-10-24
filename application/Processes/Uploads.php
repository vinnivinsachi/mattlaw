<?php

class Application_Process_Uploads extends NovumWare_Process_Abstract
{
    /**
     * Upload all images in $_FILES
     * 
     * @return NovumWare_Process_Result
     */
	static public function uploadAndThumbImages() {
	    $uploadResult = NovumWare_Process_Uploads_Images::uploadImagesToDir(SERVER_DIR_UPLOADS);
	    $adapter = $uploadResult->data;
	    foreach ($adapter->getFileInfo() as $fileInfo) static::createThumbsForImage($adapter->getFileName($fileInfo['name']));
	}
	
	/**
	 * Create a set of thumbnails for the provided image
	 * 
	 * @param string $image The path to the image
	 * @return void
	 */
	static public function createThumbsForImage($image) {
	    NovumWare_Process_Uploads_Images::createThumbs($image, Application_Constants_Uploads::getAllThumbsArray());
	}
}
