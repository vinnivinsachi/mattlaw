<?php
function smarty_function_rialtoPlugin($params, &$smarty)
{
	$pluginModel = $params['model']; // get plugin model from params
	unset($params['model']); // remove the model from the params array
	$view = ($pluginModel->view) ? $pluginModel->view : $pluginModel->_defaultView; // if a view was set, use it, else use the default view
	
	$params = array_merge($pluginModel->getValues(), $params); // merge plugin model options with passed options (passed option have priority)
	
	return $smarty->fetch($pluginModel->_dirPlugins.'/'.$pluginModel->_pluginName.'/views/'.$view.'.tpl', $params);
}
?>
