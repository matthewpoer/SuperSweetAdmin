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

r11652 - 2006-02-21 18:24:06 -0800 (Tue, 21 Feb 2006) - chris - Bug 4719: updating PHPMailer classes for security (DDoS)
Touched:
include/phpmailer (everything)
include/SugarPHPMailer.php (adding our constructor)
modules/Email/Email.php (to use the new constructor)


*/


/**
 * PHPMailer language file.
 * Romanian Version
 * @package PHPMailer
 * @author Catalin Constantin <catalin@dazoot.ro> */

$PHPMAILER_LANG = array();

$PHPMAILER_LANG["provide_address"]      = 'Trebuie sa adaugati cel putin un recipient (adresa de mail).';
$PHPMAILER_LANG["mailer_not_supported"] = ' mailer nu este suportat.';
$PHPMAILER_LANG["execute"]              = 'Nu pot executa:  ';
$PHPMAILER_LANG["instantiate"]          = 'Nu am putut instantia functia mail.';
$PHPMAILER_LANG["authenticate"]         = 'Eroare SMTP: Nu a functionat autentificarea.';
$PHPMAILER_LANG["from_failed"]          = 'Urmatoarele adrese From au dat eroare: ';
$PHPMAILER_LANG["recipients_failed"]    = 'Eroare SMTP: Urmatoarele adrese de mail au dat eroare: ';
$PHPMAILER_LANG["data_not_accepted"]    = 'Eroare SMTP: Continutul mailului nu a fost acceptat.';
$PHPMAILER_LANG["connect_host"]         = 'Eroare SMTP: Nu m-am putut conecta la adresa SMTP.';
$PHPMAILER_LANG["file_access"]          = 'Nu pot accesa fisierul: ';
$PHPMAILER_LANG["file_open"]            = 'Eroare de fisier: Nu pot deschide fisierul: ';
$PHPMAILER_LANG["encoding"]             = 'Encodare necunoscuta: ';
$PHPMAILER_LANG["signing"]              = 'Signing Error: ';

?>