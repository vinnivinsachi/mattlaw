<span class="form-error" {if $error|@count == 0} style="display:none;" {/if}>
    
        <span>{$errorElement} error: </span>
	{if $error|@is_array}

		<ul>
			{foreach from=$error item=str}
                                    <li>{errorMessageTranslate key=$str|escape}</li>
			{/foreach}
		</ul>
	{else}
		{$error|escape}
	{/if}
</span>