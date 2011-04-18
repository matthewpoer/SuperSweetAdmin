<?php
/*********************************************************************************
 * SugarCRM is a customer relationship management program developed by
 * SugarCRM, Inc. Copyright (C) 2004-2011 SugarCRM Inc.
 * 
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY SUGARCRM, SUGARCRM DISCLAIMS THE WARRANTY
 * OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU Affero General Public License along with
 * this program; if not, see http://www.gnu.org/licenses or write to the Free
 * Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 * 02110-1301 USA.
 * 
 * You can contact SugarCRM, Inc. headquarters at 10050 North Wolfe Road,
 * SW2-130, Cupertino, CA 95014, USA. or at email address contact@sugarcrm.com.
 * 
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU Affero General Public License version 3.
 * 
 * In accordance with Section 7(b) of the GNU Affero General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "Powered by
 * SugarCRM" logo. If the display of the logo is not reasonably feasible for
 * technical reasons, the Appropriate Legal Notices must display the words
 * "Powered by SugarCRM".
 ********************************************************************************/




if(!defined('sugarEntry') || !sugarEntry) die('Not A Valid Entry Point'); 
$timezones = array (
  'Africa/Algiers' => 
  array (
    'gmtOffset' => 60,
  ),
  'Africa/Luanda' => 
  array (
    'gmtOffset' => 60,
  ),
  'Africa/Porto-Novo' => 
  array (
    'gmtOffset' => 60,
  ),
  'Africa/Gaborone' => 
  array (
    'gmtOffset' => 120,
  ),
  'Africa/Ouagadougou' => 
  array (
    'gmtOffset' => 0,
  ),
  'Africa/Bujumbura' => 
  array (
    'gmtOffset' => 120,
  ),
  'Africa/Douala' => 
  array (
    'gmtOffset' => 60,
  ),
  'Atlantic/Cape_Verde' => 
  array (
    'gmtOffset' => -60,
  ),
  'Africa/Bangui' => 
  array (
    'gmtOffset' => 60,
  ),
  'Africa/Ndjamena' => 
  array (
    'gmtOffset' => 60,
  ),
  'Indian/Comoro' => 
  array (
    'gmtOffset' => 180,
  ),
  'Africa/Kinshasa' => 
  array (
    'gmtOffset' => 60,
  ),
  'Africa/Lubumbashi' => 
  array (
    'gmtOffset' => 120,
  ),
  'Africa/Brazzaville' => 
  array (
    'gmtOffset' => 60,
  ),
  'Africa/Abidjan' => 
  array (
    'gmtOffset' => 0,
  ),
  'Africa/Djibouti' => 
  array (
    'gmtOffset' => 180,
  ),
  'Africa/Cairo' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 4,
    'dstStartday' => -1,
    'dstWeekday' => 5,
    'stdMonth' => 9,
    'stdStartday' => -1,
    'stdWeekday' => 4,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 82800,
  ),
  'Africa/Malabo' => 
  array (
    'gmtOffset' => 60,
  ),
  'Africa/Asmera' => 
  array (
    'gmtOffset' => 180,
  ),
  'Africa/Addis_Ababa' => 
  array (
    'gmtOffset' => 180,
  ),
  'Africa/Libreville' => 
  array (
    'gmtOffset' => 60,
  ),
  'Africa/Banjul' => 
  array (
    'gmtOffset' => 0,
  ),
  'Africa/Accra' => 
  array (
    'gmtOffset' => 0,
  ),
  'Africa/Conakry' => 
  array (
    'gmtOffset' => 0,
  ),
  'Africa/Bissau' => 
  array (
    'gmtOffset' => 0,
  ),
  'Africa/Nairobi' => 
  array (
    'gmtOffset' => 180,
  ),
  'Africa/Maseru' => 
  array (
    'gmtOffset' => 120,
  ),
  'Africa/Monrovia' => 
  array (
    'gmtOffset' => 0,
  ),
  'Africa/Tripoli' => 
  array (
    'gmtOffset' => 120,
  ),
  'Indian/Antananarivo' => 
  array (
    'gmtOffset' => 180,
  ),
  'Africa/Blantyre' => 
  array (
    'gmtOffset' => 120,
  ),
  'Africa/Bamako' => 
  array (
    'gmtOffset' => 0,
  ),
  'Africa/Nouakchott' => 
  array (
    'gmtOffset' => 0,
  ),
  'Indian/Mauritius' => 
  array (
    'gmtOffset' => 240,
  ),
  'Indian/Mayotte' => 
  array (
    'gmtOffset' => 180,
  ),
  'Africa/Casablanca' => 
  array (
    'gmtOffset' => 0,
  ),
  'Africa/El_Aaiun' => 
  array (
    'gmtOffset' => 0,
  ),
  'Africa/Maputo' => 
  array (
    'gmtOffset' => 120,
  ),
  'Africa/Windhoek' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 9,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 4,
    'stdStartday' => 1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'Africa/Niamey' => 
  array (
    'gmtOffset' => 60,
  ),
  'Africa/Lagos' => 
  array (
    'gmtOffset' => 60,
  ),
  'Indian/Reunion' => 
  array (
    'gmtOffset' => 240,
  ),
  'Africa/Kigali' => 
  array (
    'gmtOffset' => 120,
  ),
  'Atlantic/St_Helena' => 
  array (
    'gmtOffset' => 0,
  ),
  'Africa/Sao_Tome' => 
  array (
    'gmtOffset' => 0,
  ),
  'Africa/Dakar' => 
  array (
    'gmtOffset' => 0,
  ),
  'Indian/Mahe' => 
  array (
    'gmtOffset' => 240,
  ),
  'Africa/Freetown' => 
  array (
    'gmtOffset' => 0,
  ),
  'Africa/Mogadishu' => 
  array (
    'gmtOffset' => 180,
  ),
  'Africa/Johannesburg' => 
  array (
    'gmtOffset' => 120,
  ),
  'Africa/Khartoum' => 
  array (
    'gmtOffset' => 180,
  ),
  'Africa/Mbabane' => 
  array (
    'gmtOffset' => 120,
  ),
  'Africa/Dar_es_Salaam' => 
  array (
    'gmtOffset' => 180,
  ),
  'Africa/Lome' => 
  array (
    'gmtOffset' => 0,
  ),
  'Africa/Tunis' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 5,
    'dstStartday' => 1,
    'dstWeekday' => -1,
    'stdMonth' => 9,
    'stdStartday' => 30,
    'stdWeekday' => -1,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 3600,
  ),
  'Africa/Kampala' => 
  array (
    'gmtOffset' => 180,
  ),
  'Africa/Lusaka' => 
  array (
    'gmtOffset' => 120,
  ),
  'Africa/Harare' => 
  array (
    'gmtOffset' => 120,
  ),
  'Antarctica/Casey' => 
  array (
    'gmtOffset' => 480,
  ),
  'Antarctica/Davis' => 
  array (
    'gmtOffset' => 420,
  ),
  'Antarctica/Mawson' => 
  array (
    'gmtOffset' => 360,
  ),
  'Indian/Kerguelen' => 
  array (
    'gmtOffset' => 300,
  ),
  'Antarctica/DumontDUrville' => 
  array (
    'gmtOffset' => 600,
  ),
  'Antarctica/Syowa' => 
  array (
    'gmtOffset' => 180,
  ),
  'Antarctica/Vostok' => 
  array (
    'gmtOffset' => 360,
  ),
  'Antarctica/Rothera' => 
  array (
    'gmtOffset' => -180,
  ),
  'Antarctica/Palmer' => 
  array (
    'gmtOffset' => -240,
    'dstOffset' => 60,
    'dstMonth' => 10,
    'dstStartday' => 9,
    'dstWeekday' => 0,
    'stdMonth' => 3,
    'stdStartday' => 9,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => -3600,
  ),
  'Antarctica/McMurdo' => 
  array (
    'gmtOffset' => 720,
    'dstOffset' => 60,
    'dstMonth' => 10,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 3,
    'stdStartday' => 15,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Asia/Kabul' => 
  array (
    'gmtOffset' => 270,
  ),
  'Asia/Yerevan' => 
  array (
    'gmtOffset' => 240,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Asia/Baku' => 
  array (
    'gmtOffset' => 240,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 3600,
    'stdStartTimeSec' => 0,
  ),
  'Asia/Bahrain' => 
  array (
    'gmtOffset' => 180,
  ),
  'Asia/Dhaka' => 
  array (
    'gmtOffset' => 360,
  ),
  'Asia/Thimphu' => 
  array (
    'gmtOffset' => 360,
  ),
  'Indian/Chagos' => 
  array (
    'gmtOffset' => 360,
  ),
  'Asia/Brunei' => 
  array (
    'gmtOffset' => 480,
  ),
  'Asia/Rangoon' => 
  array (
    'gmtOffset' => 390,
  ),
  'Asia/Phnom_Penh' => 
  array (
    'gmtOffset' => 420,
  ),
  'Asia/Beijing' => 
  array (
    'gmtOffset' => 480,
  ),
  'Asia/Harbin' => 
  array (
    'gmtOffset' => 480,
  ),
  'Asia/Shanghai' => 
  array (
    'gmtOffset' => 480,
  ),
  'Asia/Chongqing' => 
  array (
    'gmtOffset' => 480,
  ),
  'Asia/Urumqi' => 
  array (
    'gmtOffset' => 480,
  ),
  'Asia/Kashgar' => 
  array (
    'gmtOffset' => 480,
  ),
  'Asia/Hong_Kong' => 
  array (
    'gmtOffset' => 480,
  ),
  'Asia/Taipei' => 
  array (
    'gmtOffset' => 480,
  ),
  'Asia/Macau' => 
  array (
    'gmtOffset' => 480,
  ),
  'Asia/Nicosia' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => -3600,
    'stdStartTimeSec' => -3600,
  ),
  'Asia/Tbilisi' => 
  array (
    'gmtOffset' => 180,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Asia/Dili' => 
  array (
    'gmtOffset' => 540,
  ),
  'Asia/Calcutta' => 
  array (
    'gmtOffset' => 330,
  ),
  'Asia/Jakarta' => 
  array (
    'gmtOffset' => 420,
  ),
  'Asia/Pontianak' => 
  array (
    'gmtOffset' => 420,
  ),
  'Asia/Makassar' => 
  array (
    'gmtOffset' => 480,
  ),
  'Asia/Jayapura' => 
  array (
    'gmtOffset' => 540,
  ),
  'Asia/Tehran' => 
  array (
    'gmtOffset' => 210,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 22,
    'dstWeekday' => -1,
    'stdMonth' => 9,
    'stdStartday' => 22,
    'stdWeekday' => -1,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => -3600,
  ),
  'Asia/Baghdad' => 
  array (
    'gmtOffset' => 180,
    'dstOffset' => 60,
    'dstMonth' => 4,
    'dstStartday' => 1,
    'dstWeekday' => -1,
    'stdMonth' => 10,
    'stdStartday' => 1,
    'stdWeekday' => -1,
    'dstStartTimeSec' => 10800,
    'stdStartTimeSec' => 10800,
  ),
  'Asia/Jerusalem' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 24,
    'dstWeekday' => 5,
    'stdMonth' => 9,
    'stdStartday' => 12,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'Asia/Tokyo' => 
  array (
    'gmtOffset' => 540,
  ),
  'Asia/Amman' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 4,
    'stdMonth' => 9,
    'stdStartday' => -1,
    'stdWeekday' => 4,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Asia/Almaty' => 
  array (
    'gmtOffset' => 360,
  ),
  'Asia/Qyzylorda' => 
  array (
    'gmtOffset' => 360,
  ),
  'Asia/Aqtobe' => 
  array (
    'gmtOffset' => 300,
  ),
  'Asia/Aqtau' => 
  array (
    'gmtOffset' => 300,
  ),
  'Asia/Oral' => 
  array (
    'gmtOffset' => 300,
  ),
  'Asia/Bishkek' => 
  array (
    'gmtOffset' => 360,
  ),
  'Asia/Seoul' => 
  array (
    'gmtOffset' => 540,
  ),
  'Asia/Pyongyang' => 
  array (
    'gmtOffset' => 540,
  ),
  'Asia/Kuwait' => 
  array (
    'gmtOffset' => 180,
  ),
  'Asia/Vientiane' => 
  array (
    'gmtOffset' => 420,
  ),
  'Asia/Beirut' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => -3600,
  ),
  'Asia/Kuala_Lumpur' => 
  array (
    'gmtOffset' => 480,
  ),
  'Asia/Kuching' => 
  array (
    'gmtOffset' => 480,
  ),
  'Indian/Maldives' => 
  array (
    'gmtOffset' => 300,
  ),
  'Asia/Hovd' => 
  array (
    'gmtOffset' => 420,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 6,
    'stdMonth' => 9,
    'stdStartday' => -1,
    'stdWeekday' => 6,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'Asia/Ulaanbaatar' => 
  array (
    'gmtOffset' => 480,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 6,
    'stdMonth' => 9,
    'stdStartday' => -1,
    'stdWeekday' => 6,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'Asia/Choibalsan' => 
  array (
    'gmtOffset' => 540,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 6,
    'stdMonth' => 9,
    'stdStartday' => -1,
    'stdWeekday' => 6,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'Asia/Katmandu' => 
  array (
    'gmtOffset' => 345,
  ),
  'Asia/Muscat' => 
  array (
    'gmtOffset' => 240,
  ),
  'Asia/Karachi' => 
  array (
    'gmtOffset' => 300,
  ),
  'Asia/Gaza' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 4,
    'dstStartday' => 15,
    'dstWeekday' => 5,
    'stdMonth' => 10,
    'stdStartday' => 15,
    'stdWeekday' => 5,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => -3600,
  ),
  'Asia/Manila' => 
  array (
    'gmtOffset' => 480,
  ),
  'Asia/Qatar' => 
  array (
    'gmtOffset' => 180,
  ),
  'Asia/Riyadh' => 
  array (
    'gmtOffset' => 180,
  ),
  'Asia/Singapore' => 
  array (
    'gmtOffset' => 480,
  ),
  'Asia/Colombo' => 
  array (
    'gmtOffset' => 360,
  ),
  'Asia/Damascus' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 4,
    'dstStartday' => 1,
    'dstWeekday' => -1,
    'stdMonth' => 10,
    'stdStartday' => 1,
    'stdWeekday' => -1,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => -3600,
  ),
  'Asia/Dushanbe' => 
  array (
    'gmtOffset' => 300,
  ),
  'Asia/Bangkok' => 
  array (
    'gmtOffset' => 420,
  ),
  'Asia/Ashgabat' => 
  array (
    'gmtOffset' => 300,
  ),
  'Asia/Dubai' => 
  array (
    'gmtOffset' => 240,
  ),
  'Asia/Samarkand' => 
  array (
    'gmtOffset' => 300,
  ),
  'Asia/Tashkent' => 
  array (
    'gmtOffset' => 300,
  ),
  'Asia/Saigon' => 
  array (
    'gmtOffset' => 420,
  ),
  'Asia/Aden' => 
  array (
    'gmtOffset' => 180,
  ),
  'Australia/Darwin' => 
  array (
    'gmtOffset' => 570,
  ),
  'Australia/Perth' => 
  array (
    'gmtOffset' => 480,
  ),
  'Australia/Brisbane' => 
  array (
    'gmtOffset' => 600,
  ),
  'Australia/Lindeman' => 
  array (
    'gmtOffset' => 600,
  ),
  'Australia/Adelaide' => 
  array (
    'gmtOffset' => 570,
    'dstOffset' => 60,
    'dstMonth' => 10,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 4,
    'stdStartday' => 1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Australia/Hobart' => 
  array (
    'gmtOffset' => 600,
    'dstOffset' => 60,
    'dstMonth' => 10,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 4,
    'stdStartday' => 1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Australia/Currie' => 
  array (
    'gmtOffset' => 600,
    'dstOffset' => 60,
    'dstMonth' => 10,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 4,
    'stdStartday' => 1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Australia/Melbourne' => 
  array (
    'gmtOffset' => 600,
    'dstOffset' => 60,
    'dstMonth' => 10,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 4,
    'stdStartday' => 1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Australia/Sydney' => 
  array (
    'gmtOffset' => 600,
    'dstOffset' => 60,
    'dstMonth' => 10,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 4,
    'stdStartday' => 1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Australia/Broken_Hill' => 
  array (
    'gmtOffset' => 570,
    'dstOffset' => 60,
    'dstMonth' => 10,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 4,
    'stdStartday' => 1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Indian/Christmas' => 
  array (
    'gmtOffset' => 420,
  ),
  'Pacific/Rarotonga' => 
  array (
    'gmtOffset' => -600,
  ),
  'Indian/Cocos' => 
  array (
    'gmtOffset' => 390,
  ),
  'Pacific/Fiji' => 
  array (
    'gmtOffset' => 720,
  ),
  'Pacific/Gambier' => 
  array (
    'gmtOffset' => -540,
  ),
  'Pacific/Marquesas' => 
  array (
    'gmtOffset' => -570,
  ),
  'Pacific/Tahiti' => 
  array (
    'gmtOffset' => -600,
  ),
  'Pacific/Guam' => 
  array (
    'gmtOffset' => 600,
  ),
  'Pacific/Tarawa' => 
  array (
    'gmtOffset' => 720,
  ),
  'Pacific/Enderbury' => 
  array (
    'gmtOffset' => 780,
  ),
  'Pacific/Kiritimati' => 
  array (
    'gmtOffset' => 840,
  ),
  'Pacific/Saipan' => 
  array (
    'gmtOffset' => 600,
  ),
  'Pacific/Majuro' => 
  array (
    'gmtOffset' => 720,
  ),
  'Pacific/Kwajalein' => 
  array (
    'gmtOffset' => 720,
  ),
  'Pacific/Truk' => 
  array (
    'gmtOffset' => 600,
  ),
  'Pacific/Ponape' => 
  array (
    'gmtOffset' => 660,
  ),
  'Pacific/Kosrae' => 
  array (
    'gmtOffset' => 660,
  ),
  'Pacific/Nauru' => 
  array (
    'gmtOffset' => 720,
  ),
  'Pacific/Noumea' => 
  array (
    'gmtOffset' => 660,
  ),
  'Pacific/Auckland' => 
  array (
    'gmtOffset' => 720,
    'dstOffset' => 60,
    'dstMonth' => 10,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 3,
    'stdStartday' => 15,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Pacific/Chatham' => 
  array (
    'gmtOffset' => 765,
    'dstOffset' => 60,
    'dstMonth' => 10,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 3,
    'stdStartday' => 15,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 9900,
    'stdStartTimeSec' => 9900,
  ),
  'Pacific/Niue' => 
  array (
    'gmtOffset' => -660,
  ),
  'Pacific/Norfolk' => 
  array (
    'gmtOffset' => 690,
  ),
  'Pacific/Palau' => 
  array (
    'gmtOffset' => 540,
  ),
  'Pacific/Port_Moresby' => 
  array (
    'gmtOffset' => 600,
  ),
  'Pacific/Pitcairn' => 
  array (
    'gmtOffset' => -480,
  ),
  'Pacific/Pago_Pago' => 
  array (
    'gmtOffset' => -660,
  ),
  'Pacific/Apia' => 
  array (
    'gmtOffset' => -660,
  ),
  'Pacific/Guadalcanal' => 
  array (
    'gmtOffset' => 660,
  ),
  'Pacific/Fakaofo' => 
  array (
    'gmtOffset' => -600,
  ),
  'Pacific/Tongatapu' => 
  array (
    'gmtOffset' => 780,
  ),
  'Pacific/Funafuti' => 
  array (
    'gmtOffset' => 720,
  ),
  'Pacific/Johnston' => 
  array (
    'gmtOffset' => -600,
  ),
  'Pacific/Midway' => 
  array (
    'gmtOffset' => -660,
  ),
  'Pacific/Wake' => 
  array (
    'gmtOffset' => 720,
  ),
  'Pacific/Efate' => 
  array (
    'gmtOffset' => 660,
  ),
  'Pacific/Wallis' => 
  array (
    'gmtOffset' => 720,
  ),
  'Europe/London' => 
  array (
    'gmtOffset' => 0,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 3600,
    'stdStartTimeSec' => 3600,
  ),
  'Europe/Dublin' => 
  array (
    'gmtOffset' => 0,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 3600,
    'stdStartTimeSec' => 3600,
  ),
  'WET' => 
  array (
    'gmtOffset' => 0,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 3600,
    'stdStartTimeSec' => 3600,
  ),
  'CET' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'MET' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'EET' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => -3600,
    'stdStartTimeSec' => -3600,
  ),
  'Europe/Tirane' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Europe/Andorra' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Europe/Vienna' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Europe/Minsk' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Europe/Brussels' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Europe/Sofia' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => -3600,
    'stdStartTimeSec' => -3600,
  ),
  'Europe/Prague' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Europe/Copenhagen' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Atlantic/Faeroe' => 
  array (
    'gmtOffset' => 0,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 3600,
    'stdStartTimeSec' => 3600,
  ),
  'America/Danmarkshavn' => 
  array (
    'gmtOffset' => 0,
  ),
  'America/Scoresbysund' => 
  array (
    'gmtOffset' => -60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'America/Godthab' => 
  array (
    'gmtOffset' => -180,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 14400,
    'stdStartTimeSec' => 14400,
  ),
  'America/Thule' => 
  array (
    'gmtOffset' => -240,
    'dstOffset' => 60,
    'dstMonth' => 4,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'Europe/Tallinn' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => -3600,
    'stdStartTimeSec' => -3600,
  ),
  'Europe/Helsinki' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => -3600,
    'stdStartTimeSec' => -3600,
  ),
  'Europe/Paris' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Europe/Berlin' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Europe/Gibraltar' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Europe/Athens' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => -3600,
    'stdStartTimeSec' => -3600,
  ),
  'Europe/Budapest' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Atlantic/Reykjavik' => 
  array (
    'gmtOffset' => 0,
  ),
  'Europe/Rome' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Europe/Riga' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => -3600,
    'stdStartTimeSec' => -3600,
  ),
  'Europe/Vaduz' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Europe/Vilnius' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => -3600,
    'stdStartTimeSec' => -3600,
  ),
  'Europe/Luxembourg' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Europe/Malta' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Europe/Chisinau' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => -3600,
    'stdStartTimeSec' => -3600,
  ),
  'Europe/Monaco' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Europe/Amsterdam' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Europe/Oslo' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Europe/Warsaw' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Europe/Lisbon' => 
  array (
    'gmtOffset' => 0,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 3600,
    'stdStartTimeSec' => 3600,
  ),
  'Atlantic/Azores' => 
  array (
    'gmtOffset' => -60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Atlantic/Madeira' => 
  array (
    'gmtOffset' => 0,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 3600,
    'stdStartTimeSec' => 3600,
  ),
  'Europe/Bucharest' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => -3600,
    'stdStartTimeSec' => -3600,
  ),
  'Europe/Kaliningrad' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Europe/Moscow' => 
  array (
    'gmtOffset' => 180,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Europe/Samara' => 
  array (
    'gmtOffset' => 240,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Asia/Yekaterinburg' => 
  array (
    'gmtOffset' => 300,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Asia/Omsk' => 
  array (
    'gmtOffset' => 360,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Asia/Novosibirsk' => 
  array (
    'gmtOffset' => 360,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Asia/Krasnoyarsk' => 
  array (
    'gmtOffset' => 420,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Asia/Irkutsk' => 
  array (
    'gmtOffset' => 480,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Asia/Yakutsk' => 
  array (
    'gmtOffset' => 540,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Asia/Vladivostok' => 
  array (
    'gmtOffset' => 600,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Asia/Sakhalin' => 
  array (
    'gmtOffset' => 600,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Asia/Magadan' => 
  array (
    'gmtOffset' => 660,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Asia/Kamchatka' => 
  array (
    'gmtOffset' => 720,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Asia/Anadyr' => 
  array (
    'gmtOffset' => 720,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'Europe/Belgrade' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Europe/Madrid' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Africa/Ceuta' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Atlantic/Canary' => 
  array (
    'gmtOffset' => 0,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 3600,
    'stdStartTimeSec' => 3600,
  ),
  'Europe/Stockholm' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Europe/Zurich' => 
  array (
    'gmtOffset' => 60,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'Europe/Istanbul' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => -3600,
    'stdStartTimeSec' => -3600,
  ),
  'Europe/Kiev' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => -3600,
    'stdStartTimeSec' => -3600,
  ),
  'Europe/Uzhgorod' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => -3600,
    'stdStartTimeSec' => -3600,
  ),
  'Europe/Zaporozhye' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => -3600,
    'stdStartTimeSec' => -3600,
  ),
  'Europe/Simferopol' => 
  array (
    'gmtOffset' => 120,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => -1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => -3600,
    'stdStartTimeSec' => -3600,
  ),
  'America/New_York' => 
  array (
    'gmtOffset' => -300,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Chicago' => 
  array (
    'gmtOffset' => -360,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/North_Dakota/Center' => 
  array (
    'gmtOffset' => -360,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Denver' => 
  array (
    'gmtOffset' => -420,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Los_Angeles' => 
  array (
    'gmtOffset' => -480,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Juneau' => 
  array (
    'gmtOffset' => -540,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Yakutat' => 
  array (
    'gmtOffset' => -540,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Anchorage' => 
  array (
    'gmtOffset' => -540,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Nome' => 
  array (
    'gmtOffset' => -540,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Adak' => 
  array (
    'gmtOffset' => -600,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'Pacific/Honolulu' => 
  array (
    'gmtOffset' => -600,
  ),
  'America/Phoenix' => 
  array (
    'gmtOffset' => -420,
  ),
  'America/Boise' => 
  array (
    'gmtOffset' => -420,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Indiana/Indianapolis' => 
  array (
    'gmtOffset' => -300,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Indiana/Marengo' => 
  array (
    'gmtOffset' => -300,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Indiana/Knox' => 
  array (
    'gmtOffset' => -300,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Indiana/Vevay' => 
  array (
    'gmtOffset' => -300,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Kentucky/Louisville' => 
  array (
    'gmtOffset' => -300,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Kentucky/Monticello' => 
  array (
    'gmtOffset' => -300,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Detroit' => 
  array (
    'gmtOffset' => -300,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Menominee' => 
  array (
    'gmtOffset' => -360,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/St_Johns' => 
  array (
    'gmtOffset' => -210,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 60,
    'stdStartTimeSec' => -3540,
  ),
  'America/Goose_Bay' => 
  array (
    'gmtOffset' => -240,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 60,
    'stdStartTimeSec' => -3540,
  ),
  'America/Halifax' => 
  array (
    'gmtOffset' => -240,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Glace_Bay' => 
  array (
    'gmtOffset' => -240,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Montreal' => 
  array (
    'gmtOffset' => -300,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Toronto' => 
  array (
    'gmtOffset' => -300,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Thunder_Bay' => 
  array (
    'gmtOffset' => -300,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Nipigon' => 
  array (
    'gmtOffset' => -300,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Rainy_River' => 
  array (
    'gmtOffset' => -360,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Winnipeg' => 
  array (
    'gmtOffset' => -360,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 7200,
  ),
  'America/Regina' => 
  array (
    'gmtOffset' => -360,
  ),
  'America/Swift_Current' => 
  array (
    'gmtOffset' => -360,
  ),
  'America/Edmonton' => 
  array (
    'gmtOffset' => -420,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Vancouver' => 
  array (
    'gmtOffset' => -480,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Dawson_Creek' => 
  array (
    'gmtOffset' => -420,
  ),
  'America/Pangnirtung' => 
  array (
    'gmtOffset' => -300,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Iqaluit' => 
  array (
    'gmtOffset' => -300,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Coral_Harbour' => 
  array (
    'gmtOffset' => -300,
  ),
  'America/Rankin_Inlet' => 
  array (
    'gmtOffset' => -360,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Cambridge_Bay' => 
  array (
    'gmtOffset' => -420,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Yellowknife' => 
  array (
    'gmtOffset' => -420,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Inuvik' => 
  array (
    'gmtOffset' => -420,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Whitehorse' => 
  array (
    'gmtOffset' => -480,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Dawson' => 
  array (
    'gmtOffset' => -480,
    'dstOffset' => 60,
    'dstMonth' => 3,
    'dstStartday' => 7,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => 0,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Cancun' => 
  array (
    'gmtOffset' => -360,
    'dstOffset' => 60,
    'dstMonth' => 4,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Merida' => 
  array (
    'gmtOffset' => -360,
    'dstOffset' => 60,
    'dstMonth' => 4,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Monterrey' => 
  array (
    'gmtOffset' => -360,
    'dstOffset' => 60,
    'dstMonth' => 4,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Mexico_City' => 
  array (
    'gmtOffset' => -360,
    'dstOffset' => 60,
    'dstMonth' => 4,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Chihuahua' => 
  array (
    'gmtOffset' => -420,
    'dstOffset' => 60,
    'dstMonth' => 4,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Hermosillo' => 
  array (
    'gmtOffset' => -420,
  ),
  'America/Mazatlan' => 
  array (
    'gmtOffset' => -420,
    'dstOffset' => 60,
    'dstMonth' => 4,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Tijuana' => 
  array (
    'gmtOffset' => -480,
    'dstOffset' => 60,
    'dstMonth' => 4,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Anguilla' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/Antigua' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/Nassau' => 
  array (
    'gmtOffset' => -300,
    'dstOffset' => 60,
    'dstMonth' => 4,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Barbados' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/Belize' => 
  array (
    'gmtOffset' => -360,
  ),
  'Atlantic/Bermuda' => 
  array (
    'gmtOffset' => -240,
    'dstOffset' => 60,
    'dstMonth' => 4,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Cayman' => 
  array (
    'gmtOffset' => -300,
  ),
  'America/Costa_Rica' => 
  array (
    'gmtOffset' => -360,
  ),
  'America/Havana' => 
  array (
    'gmtOffset' => -300,
    'dstOffset' => 60,
    'dstMonth' => 4,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => 0,
  ),
  'America/Dominica' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/Santo_Domingo' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/El_Salvador' => 
  array (
    'gmtOffset' => -360,
  ),
  'America/Grenada' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/Guadeloupe' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/Guatemala' => 
  array (
    'gmtOffset' => -360,
  ),
  'America/Port-au-Prince' => 
  array (
    'gmtOffset' => -300,
    'dstOffset' => 60,
    'dstMonth' => 4,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => -3600,
  ),
  'America/Tegucigalpa' => 
  array (
    'gmtOffset' => -360,
  ),
  'America/Jamaica' => 
  array (
    'gmtOffset' => -300,
  ),
  'America/Martinique' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/Montserrat' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/Managua' => 
  array (
    'gmtOffset' => -360,
    'dstOffset' => 60,
    'dstMonth' => 4,
    'dstStartday' => 10,
    'dstWeekday' => -1,
    'stdMonth' => 9,
    'stdStartday' => 18,
    'stdWeekday' => -1,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => -3600,
  ),
  'America/Panama' => 
  array (
    'gmtOffset' => -300,
  ),
  'America/Puerto_Rico' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/St_Kitts' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/St_Lucia' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/Miquelon' => 
  array (
    'gmtOffset' => -180,
    'dstOffset' => 60,
    'dstMonth' => 4,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/St_Vincent' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/Grand_Turk' => 
  array (
    'gmtOffset' => -300,
    'dstOffset' => 60,
    'dstMonth' => 4,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 10,
    'stdStartday' => -1,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => -3600,
  ),
  'America/Tortola' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/St_Thomas' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/Argentina/Buenos_Aires' => 
  array (
    'gmtOffset' => -180,
  ),
  'America/Argentina/Cordoba' => 
  array (
    'gmtOffset' => -180,
  ),
  'America/Argentina/Tucuman' => 
  array (
    'gmtOffset' => -180,
  ),
  'America/Argentina/La_Rioja' => 
  array (
    'gmtOffset' => -180,
  ),
  'America/Argentina/San_Juan' => 
  array (
    'gmtOffset' => -180,
  ),
  'America/Argentina/Jujuy' => 
  array (
    'gmtOffset' => -180,
  ),
  'America/Argentina/Catamarca' => 
  array (
    'gmtOffset' => -180,
  ),
  'America/Argentina/Mendoza' => 
  array (
    'gmtOffset' => -180,
  ),
  'America/Argentina/Rio_Gallegos' => 
  array (
    'gmtOffset' => -180,
  ),
  'America/Argentina/Ushuaia' => 
  array (
    'gmtOffset' => -180,
  ),
  'America/Aruba' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/La_Paz' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/Noronha' => 
  array (
    'gmtOffset' => -120,
  ),
  'America/Belem' => 
  array (
    'gmtOffset' => -180,
  ),
  'America/Fortaleza' => 
  array (
    'gmtOffset' => -180,
  ),
  'America/Recife' => 
  array (
    'gmtOffset' => -180,
  ),
  'America/Araguaina' => 
  array (
    'gmtOffset' => -180,
  ),
  'America/Maceio' => 
  array (
    'gmtOffset' => -180,
  ),
  'America/Bahia' => 
  array (
    'gmtOffset' => -180,
  ),
  'America/Sao_Paulo' => 
  array (
    'gmtOffset' => -180,
    'dstOffset' => 60,
    'dstMonth' => 10,
    'dstStartday' => 15,
    'dstWeekday' => 0,
    'stdMonth' => 2,
    'stdStartday' => 15,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => -3600,
  ),
  'America/Campo_Grande' => 
  array (
    'gmtOffset' => -240,
    'dstOffset' => 60,
    'dstMonth' => 10,
    'dstStartday' => 15,
    'dstWeekday' => 0,
    'stdMonth' => 2,
    'stdStartday' => 15,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => -3600,
  ),
  'America/Cuiaba' => 
  array (
    'gmtOffset' => -240,
    'dstOffset' => 60,
    'dstMonth' => 10,
    'dstStartday' => 15,
    'dstWeekday' => 0,
    'stdMonth' => 2,
    'stdStartday' => 15,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => -3600,
  ),
  'America/Porto_Velho' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/Boa_Vista' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/Manaus' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/Eirunepe' => 
  array (
    'gmtOffset' => -300,
  ),
  'America/Rio_Branco' => 
  array (
    'gmtOffset' => -300,
  ),
  'America/Santiago' => 
  array (
    'gmtOffset' => -240,
    'dstOffset' => 60,
    'dstMonth' => 10,
    'dstStartday' => 9,
    'dstWeekday' => 0,
    'stdMonth' => 3,
    'stdStartday' => 9,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 28800,
    'stdStartTimeSec' => 25200,
  ),
  'Pacific/Easter' => 
  array (
    'gmtOffset' => -360,
    'dstOffset' => 60,
    'dstMonth' => 10,
    'dstStartday' => 9,
    'dstWeekday' => 0,
    'stdMonth' => 3,
    'stdStartday' => 9,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 36000,
    'stdStartTimeSec' => 32400,
  ),
  'America/Bogota' => 
  array (
    'gmtOffset' => -300,
  ),
  'America/Curacao' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/Guayaquil' => 
  array (
    'gmtOffset' => -300,
  ),
  'Pacific/Galapagos' => 
  array (
    'gmtOffset' => -360,
  ),
  'Atlantic/Stanley' => 
  array (
    'gmtOffset' => -240,
    'dstOffset' => 60,
    'dstMonth' => 9,
    'dstStartday' => 1,
    'dstWeekday' => 0,
    'stdMonth' => 4,
    'stdStartday' => 15,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Cayenne' => 
  array (
    'gmtOffset' => -180,
  ),
  'America/Guyana' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/Asuncion' => 
  array (
    'gmtOffset' => -240,
    'dstOffset' => 60,
    'dstMonth' => 10,
    'dstStartday' => 15,
    'dstWeekday' => 0,
    'stdMonth' => 3,
    'stdStartday' => 8,
    'stdWeekday' => 0,
    'dstStartTimeSec' => 0,
    'stdStartTimeSec' => -3600,
  ),
  'America/Lima' => 
  array (
    'gmtOffset' => -300,
  ),
  'Atlantic/South_Georgia' => 
  array (
    'gmtOffset' => -120,
  ),
  'America/Paramaribo' => 
  array (
    'gmtOffset' => -180,
  ),
  'America/Port_of_Spain' => 
  array (
    'gmtOffset' => -240,
  ),
  'America/Montevideo' => 
  array (
    'gmtOffset' => -180,
    'dstOffset' => 60,
    'dstMonth' => 10,
    'dstStartday' => 9,
    'dstWeekday' => -1,
    'stdMonth' => 3,
    'stdStartday' => 27,
    'stdWeekday' => -1,
    'dstStartTimeSec' => 7200,
    'stdStartTimeSec' => 3600,
  ),
  'America/Caracas' => 
  array (
    'gmtOffset' => -270,
  ),
)
?>
