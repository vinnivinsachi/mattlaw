<div class='section-header'>
        Contact us
</div>

<p class=' padding-top-medium' style='clear: left; margin-left: 78px;'>			
        <strong>Harry A. Dusenberry</strong><br/>
        333 5th Ave. 3rd Floor<br/>
           New York City, NY 10001<br/>

</p>

<p>

    <form id='form-contactUs' class='rialtoForm rialtoAjaxForm contact-us-form' action="{$siteRoot}/index/contactus" method='post'>
        <div class='form-main-error-message' {if $fp->formResult->errorFlashMessages ==''}style="display:none;"{/if}>
                {$fp->formResult->errorFlashMessages}
            </div>
        <div>    
            <label>Name:</label>
            <input type='text' name='contactUs[customer]' style='margin:0px;' id='form-contactUs-name' value='{$fp->getValue('customer')}'/><br/>
            {include file="partials/error.tpl" error=$fp->getElement('customer')->getMessages() errorElement='Customer'}
        </div>
                        <div class='spacer-small'></div>

        <div>
        <label>Phone:</label>
        <input type='text' name='contactUs[phone]' style='margin:0px;' id='form-contactUs-phone' value='{$fp->getValue('phone')}'/><br/>
            {include file="partials/error.tpl" error=$fp->getElement('phone')->getMessages() errorElement='Phone'}
        </div>
        <div class='spacer-small'></div>
        <div>
        <label>Email:</label>
        <input type='text' name='contactUs[email]' style='margin:0px;' value='{$fp->getValue('email')}'/><br/>
            {include file="partials/error.tpl" error=$fp->getElement('email')->getMessages() errorElement='Email'}

        </div>
        <div class='spacer-small'></div>
        <div>
        <label>Message:</label>
        <textarea placeholder='Briefly describe your message' name='contactUs[message]' style='width: 180px; vertical-align: top;'>{$fp->getValue('message')}</textarea><br/>
            {include file="partials/error.tpl" error=$fp->getElement('message')->getMessages() errorElement='Message'}

        </div>
        <label></label>
        <input class='positive' type='submit' value='Ask' />
    </form>
</p>


