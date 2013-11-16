<?php
function smarty_modifier_formatTimestampHourM($timestamp)
{
	return Custom_Helpers::formatPHPDate($timestamp, 'ga');
}
