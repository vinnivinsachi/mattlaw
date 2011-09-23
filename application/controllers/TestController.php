<?php

class TestController extends Custom_Zend_Controller_Action
{

    public function indexAction() {
		$directory = '/Users/markswanson/Sites/dr/zend/public/images/categories/ladies-open-toe-shoes/23';
		echo $directory.'<Br />';
		echo file_exists($directory);
    	/*$mapper = new Application_Model_Mapper_Members();
    	$member = new Application_Model_Member();
    	$member->member_ID = 20;
    	$member->password = 'dogs';
    	$member->display_name = 'markmark';
    	Zend_Debug::dump($mapper->save($member));*/
    }

	public function javascriptAction() {}
	
}
