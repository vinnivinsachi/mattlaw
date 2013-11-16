<?php
// TODO MARK: What is this???
class NovumWare_Zend_Session_Namespace extends Zend_Session_Namespace
{
	public function setRedirect($module, $action, $controller=null, $params=null) {
                $this->redirectModule = $module;
		$this->redirectAction = $action;
		$this->redirectController = $controller;
                
                if(isset($params['controller']))
                    unset($params['controller']);
                if(isset($params['action']))
                    unset($params['action']);
                if (isset($params['module']))
                    unset($params['module']);
                
                $this->redirectParams = $params;
        }

	
	public function getRedirect() {
		$redirectInfo = array();
		
		// get redirect info
                $redirectInfo['module'] = $this->redirectModule;
                $redirectInfo['action'] = $this->redirectAction;
                $redirectInfo['controller'] = $this->redirectController;
                $redirectInfo['params'] = $this->redirectParams;

		// erase redirect info
             
                
		return $redirectInfo;
	}
        
        /*
         * return null
         */
        public function resetRedirect(){
                unset($this->redirectModule);
                unset($this->redirectAction);
                unset($this->redirectController);
                unset($this->redirectParams);
        }
}
