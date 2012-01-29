{include file='layouts/all/html-top.tpl'}
	
	{include file='layouts/all/head.tpl'}
	{include file='layouts/all/body-top.tpl'}

		{include file='layouts/all/header.tpl'}
		{include file='layouts/all/content-top.tpl'}

			{$this->flashMessenger()}<!-- PHP FLASH MESSENGER -->
			{$layout->content}<!-- PAGE CONTENT -->
	
		{include file='layouts/all/content-bottom.tpl'}
		{include file='layouts/all/footer.tpl'}
		
	{include file='layouts/all/body-bottom.tpl'}

{include file='layouts/all/html-bottom.tpl'}
