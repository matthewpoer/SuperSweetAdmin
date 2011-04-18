<?php
/*********************************************************************************
Copyright (c) 2010, OneLogin, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the <organization> nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL ONELOGIN, INC. BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 ********************************************************************************/
  // these are account wide configuration settings

  // the URL where to the SAML Response/SAML Assertion will be posted
  define('const_assertion_consumer_service_url', $GLOBALS['sugar_config']['site_url']. "/index.php?module=Users&action=Authenticate");
  // name of this application
  define('const_issuer', "php-saml");
  // tells the IdP to return the email address of the current user
   define('const_name_identifier_format', "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress");

  function get_user_settings() {
    // this function should be modified to return the SAML settings for the current user

    $settings                           = new Settings();
    // when using Service Provider Initiated SSO (starting at index.php), this URL asks the IdP to authenticate the user. 
    $settings->idp_sso_target_url       = $GLOBALS['sugar_config']['SAML_loginurl'];
    
    // the certificate for the users account in the IdP
    $settings->x509certificate          = $GLOBALS['sugar_config']['SAML_X509Cert'];

    return $settings;
  }
  
?>
