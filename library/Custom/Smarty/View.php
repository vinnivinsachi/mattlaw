<?php

// TODO MARK: Is this the best implementation?  Check Zend View Abstract
require_once 'Smarty/Smarty.class.php';
class Custom_Smarty_View extends Zend_View_Abstract
{

    protected $_smarty; // to hold the smarty instance

    public function __construct(array $config = array()) {
        $this->_smarty = new Smarty(); // create smarty
		$this->_smarty->error_reporting = E_ALL & ~E_NOTICE; // ignore warnings for template variables not being set

        if (!array_key_exists('compileDir', $config)) throw new Exception('compileDir must be set in $config for '.get_class($this)); /// make sure compileDir was passed
        else $this->_smarty->compile_dir = $config['compileDir']; // set compileDir

        //if (array_key_exists('configDir', $config)) $this->_smarty->config_dir = $config['configDir']; // optionally set configs directory

		if (array_key_exists('pluginsDir', $config)) $this->_smarty->addPluginsDir($config['pluginsDir']); // optionally set plugins directory

        parent::__construct($config); // call Zend View construct function
    }

    /**
     * Return the template engine object
     *
     * @return Smarty
     */
    public function getEngine() {
        return $this->_smarty;
    }

    /**
     * fetch a template, echos the result,
     * 
     * @see Zend_View_Abstract::render()
     * @param string $name the template
     * @return void
     */
    protected function _run() {
        $this->strictVars(true);

        $vars = get_object_vars($this);
        foreach ($vars as $key => $value) {
            if ('_' != substr($key, 0, 1)) {
                $this->_smarty->assign($key, $value);
            }
        }
        //assign variables to the template engine

		// TODO MARK: Assign $this to view view Smarty
		$this->_smarty->assign('this', $this);
        //$this->_smarty->assign_by_ref('this', $this);
        //why 'this'?
        //to emulate standard zend view functionality
        //doesn't mess up smarty in any way

        $path = $this->getScriptPaths();
        
        $file = substr(func_get_arg(0), strlen($path[0]));
        //smarty needs a template_dir, and can only use templates,
        //found in that directory, so we have to strip it from the filename

        $this->_smarty->template_dir = $path[0];
        //set the template diretory as the first directory from the path

        echo $this->_smarty->fetch($file);
        //process the template (and filter the output)
    }
}