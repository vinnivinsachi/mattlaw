<?php
function smarty_modifier_formatDate($mysqlDate)
{
	$phpDate = Custom_Helpers::dateMysqlToPHP($mysqlDate);
	return Custom_Helpers::formatPHPDate($phpDate);
}
?>
