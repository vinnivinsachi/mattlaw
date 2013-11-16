<?php
function smarty_modifier_formatTimestampDay($timestamp)
{
	return Custom_Helpers::formatPHPDate($timestamp, 'l');
}
