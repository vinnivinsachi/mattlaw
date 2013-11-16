<?php
function smarty_modifier_formatTimestampHour($timestamp)
{
	return Custom_Helpers::formatPHPDate($timestamp, 'g');
}
