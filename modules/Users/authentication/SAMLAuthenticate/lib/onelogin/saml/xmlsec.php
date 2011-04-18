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
  require(dirname(__FILE__) . '/../../xmlseclibs/xmlseclibs.php');

  class XmlSec {
    public $x509certificate;
    private $doc;
    
    function __construct($val) {
      $this->doc = $val;
    }
    
    function is_valid() {
    	$objXMLSecDSig = new XMLSecurityDSig();

    	$objDSig = $objXMLSecDSig->locateSignature($this->doc);
    	if (! $objDSig) {
    		throw new Exception("Cannot locate Signature Node");
    	}
    	$objXMLSecDSig->canonicalizeSignedInfo();
    	$objXMLSecDSig->idKeys = array('ID');

    	$retVal = $objXMLSecDSig->validateReference();

    	if (! $retVal) {
    		throw new Exception("Reference Validation Failed");
    	}

    	$objKey = $objXMLSecDSig->locateKey();
    	if (! $objKey ) {
    		throw new Exception("We have no idea about the key");
    	}
    	$key = NULL;

    	$objKeyInfo = XMLSecEnc::staticLocateKeyInfo($objKey, $objDSig);

      $objKey->loadKey($this->x509certificate, FALSE, true);
      
    	$result = $objXMLSecDSig->verify($objKey);
    	return $result;
    }
  }

?>