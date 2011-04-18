<?php

/*

Modification information for LGPL compliance

r56990 - 2010-06-16 13:05:36 -0700 (Wed, 16 Jun 2010) - kjing - snapshot "Mango" svn branch to a new one for GitHub sync

r56989 - 2010-06-16 13:01:33 -0700 (Wed, 16 Jun 2010) - kjing - defunt "Mango" svn dev branch before github cutover

r55980 - 2010-04-19 13:31:28 -0700 (Mon, 19 Apr 2010) - kjing - create Mango (6.1) based on windex

r51719 - 2009-10-22 10:18:00 -0700 (Thu, 22 Oct 2009) - mitani - Converted to Build 3  tags and updated the build system 

r51634 - 2009-10-19 13:32:22 -0700 (Mon, 19 Oct 2009) - mitani - Windex is the branch for Sugar Sales 1.0 development

r50375 - 2009-08-24 18:07:43 -0700 (Mon, 24 Aug 2009) - dwong - branch kobe2 from tokyo r50372

r43691 - 2009-01-29 15:25:53 -0800 (Thu, 29 Jan 2009) - faissah - 27521  : Update to phpmailer version 2.3.

r42807 - 2008-12-29 11:16:59 -0800 (Mon, 29 Dec 2008) - dwong - Branch from trunk/sugarcrm r42806 to branches/tokyo/sugarcrm

r13627 - 2006-05-31 11:01:53 -0700 (Wed, 31 May 2006) - majed - name change

r11652 - 2006-02-21 18:24:06 -0800 (Tue, 21 Feb 2006) - chris - Bug 4719: updating PHPMailer classes for security (DDoS)
Touched:
include/phpmailer (everything)
include/SugarPHPMailer.php (adding our constructor)
modules/Email/Email.php (to use the new constructor)

r915 - 2004-10-08 15:31:10 -0700 (Fri, 08 Oct 2004) - julian - E-mail notification feature + new admin console


*/


/**
* PHPMailer language file.
* Italian version
* @package PHPMailer
* @author Ilias Bartolini <brain79@inwind.it>*/

$PHPMAILER_LANG = array();

$PHPMAILER_LANG["provide_address"]      = 'Deve essere fornito almeno un'.
                                          ' indirizzo ricevente';
$PHPMAILER_LANG["mailer_not_supported"] = 'Mailer non supportato';
$PHPMAILER_LANG["execute"]              = "Impossibile eseguire l'operazione: ";
$PHPMAILER_LANG["instantiate"]          = 'Impossibile istanziare la funzione mail';
$PHPMAILER_LANG["authenticate"]         = 'SMTP Error: Impossibile autenticarsi.';
$PHPMAILER_LANG["from_failed"]          = 'I seguenti indirizzi mittenti hanno'.
                                          ' generato errore: ';
$PHPMAILER_LANG["recipients_failed"]    = 'SMTP Error: I seguenti indirizzi'.
                                          'destinatari hanno generato errore: ';
$PHPMAILER_LANG["data_not_accepted"]    = 'SMTP Error: Data non accettati dal'.
                                          'server.';
$PHPMAILER_LANG["connect_host"]         = 'SMTP Error: Impossibile connettersi'.
                                          ' all\'host SMTP.';
$PHPMAILER_LANG["file_access"]          = 'Impossibile accedere al file: ';
$PHPMAILER_LANG["file_open"]            = 'File Error: Impossibile aprire il file: ';
$PHPMAILER_LANG["encoding"]             = 'Encoding set dei caratteri sconosciuto: ';
$PHPMAILER_LANG["signing"]              = 'Signing Error: ';

?>