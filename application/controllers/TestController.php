<?php

class TestController extends Custom_Zend_Controller_Action
{

    public function indexAction() {
    	$mapper = new Application_Model_Mapper_Members();
    	$member = new Application_Model_Member();
    	$member->member_ID = 20;
    	$member->password = 'dogs';
    	$member->display_name = 'markmark';
    	Zend_Debug::dump($mapper->save($member));
    }

	public function javascriptAction() {}
	
}
