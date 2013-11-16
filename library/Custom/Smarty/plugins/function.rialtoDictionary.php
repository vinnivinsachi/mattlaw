<?php
function smarty_function_rialtoDictionary($params, &$smarty)
{
	return Application_Constants_Dictionary::$VALUES[$params['key']];
}
?>
