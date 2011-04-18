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
 * Polish Version, encoding: windows-1250
 * translated from english lang file ver. 1.72
 */

$PHPMAILER_LANG = array();

$PHPMAILER_LANG["provide_address"]      = 'Nale¿y podaæ prawid³owy adres email Odbiorcy.';
$PHPMAILER_LANG["mailer_not_supported"] = 'Wybrana metoda wysy³ki wiadomoœci nie jest obs³ugiwana.';
$PHPMAILER_LANG["execute"]              = 'Nie mo¿na uruchomiæ: ';
$PHPMAILER_LANG["instantiate"]          = 'Nie mo¿na wywo³aæ funkcji mail(). SprawdŸ konfiguracjê serwera.';
$PHPMAILER_LANG["authenticate"]         = 'B³¹d SMTP: Nie mo¿na przeprowadziæ autentykacji.';
$PHPMAILER_LANG["from_failed"]          = 'Nastêpuj¹cy adres Nadawcy jest jest nieprawid³owy: ';
$PHPMAILER_LANG["recipients_failed"]    = 'B³¹d SMTP: Nastêpuj¹cy ' .
                                          'odbiorcy s¹ nieprawid³owi: ';
$PHPMAILER_LANG["data_not_accepted"]    = 'B³¹d SMTP: Dane nie zosta³y przyjête.';
$PHPMAILER_LANG["connect_host"]         = 'B³¹d SMTP: Nie mo¿na po³¹czyæ siê z wybranym hostem.';
$PHPMAILER_LANG["file_access"]          = 'Brak dostêpu do pliku: ';
$PHPMAILER_LANG["file_open"]            = 'Nie mo¿na otworzyæ pliku: ';
$PHPMAILER_LANG["encoding"]             = 'Nieznany sposób kodowania znaków: ';
$PHPMAILER_LANG["signing"]              = 'Signing Error: ';

?>