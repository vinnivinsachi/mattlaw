{rialtoExample}

<table class='rTableAccordion'>
	<thead>
		<tr>
			<th scope='col'>Row<span class='icon icon-arrwo-up'></span></th>
			<th scope='col'>Info<span class='icon icon-arrwo-up'></span></th>
			<th scope='col'>More Info<span class='icon icon-arrwo-up'></span></th>
		</tr>
	</thead>
	<tbody>
		
		<tr class='rialtoTableAccordionRow'>
			<td>Loads a Load Replaces</td>
			<td>Some Info</td>
			<td>More Info</td>
		</tr>
		<tr class='rTableAccordionHidden'>
			<td colspan=3>
				<div class='rTableAccordionContent'>
					<span rialtoLoadReplacesURL='{$siteRoot}/partials/content'>SHOULD HAVE LOADED...</span>
				</div>
			</td>
		</tr>
		
		<tr class='rialtoTableAccordionRow'>
			<td>Loads a URL</td>
			<td>Some Info</td>
			<td>More Info</td>
		</tr>
		<tr class='rTableAccordionHidden' rTableURL='{$siteRoot}/partials/content'>
			<td colspan=3>
				<div class='rTableAccordionContent'>
					<div>CONTENT 2!</div>
				</div>
			</td>
		</tr>
		
		<tr class='rialtoTableAccordionRow'>
			<td>Loads example form</td>
			<td>Some Info</td>
			<td>More Info</td>
		</tr>
		<tr class='rTableAccordionHidden' rTableURL='{$siteRoot}/partials/content' rTableFormID='example-form'>
			<td colspan=3>
				<div class='rTableAccordionContent'></div>
			</td>
		</tr>
		
	</tbody>
</table>

<form id='example-form'>
	Example Text: <input type='text' name='exampleText' />
</form>

{/rialtoExample}