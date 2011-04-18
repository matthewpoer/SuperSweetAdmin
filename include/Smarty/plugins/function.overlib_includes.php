<?php

/*

Modification information for LGPL compliance

r56990 - 2010-06-16 13:05:36 -0700 (Wed, 16 Jun 2010) - kjing - snapshot "Mango" svn branch to a new one for GitHub sync

r56989 - 2010-06-16 13:01:33 -0700 (Wed, 16 Jun 2010) - kjing - defunt "Mango" svn dev branch before github cutover

r55980 - 2010-04-19 13:31:28 -0700 (Mon, 19 Apr 2010) - kjing - create Mango (6.1) based on windex

r53253 - 2009-12-16 10:19:07 -0800 (Wed, 16 Dec 2009) - jmertic - Bug 34308 - Set a max width for all overlib boxes to 400px.

r51719 - 2009-10-22 10:18:00 -0700 (Thu, 22 Oct 2009) - mitani - Converted to Build 3  tags and updated the build system 

r51634 - 2009-10-19 13:32:22 -0700 (Mon, 19 Oct 2009) - mitani - Windex is the branch for Sugar Sales 1.0 development

r50375 - 2009-08-24 18:07:43 -0700 (Mon, 24 Aug 2009) - dwong - branch kobe2 from tokyo r50372

r42807 - 2008-12-29 11:16:59 -0800 (Mon, 29 Dec 2008) - dwong - Branch from trunk/sugarcrm r42806 to branches/tokyo/sugarcrm

r32629 - 2008-03-11 00:44:13 -0700 (Tue, 11 Mar 2008) - majed - fixes issues with overlib and templating

r32200 - 2008-02-29 10:44:55 -0800 (Fri, 29 Feb 2008) - jmertic - Add string placeholders for several tooltips on Step 3.
Pushed code for help popups into smarty function sugar_help and the code for including the overlib stuff into overlib_includes.


*/


/**
 * Smarty plugin
 * @package Smarty
 * @subpackage plugins
 *
 * This is a Smarty plugin to handle the inclusion of the overlib js library.
 *
 * @author John Mertic {jmertic@sugarcrm.com}
 */
 
/**
 * smarty_function_overlib_includes
 * This is the constructor for the Smarty plugin.
 * 
 * @param $params The runtime Smarty key/value arguments
 * @param $smarty The reference to the Smarty object used in this invocation 
 */
function smarty_function_overlib_includes($params, &$smarty)
{
    $path = getJSPath('include/javascript/sugar_grp_overlib.js');
	return <<<EOHTML
<!-- begin includes for overlib -->
<script type="text/javascript" src="$path"></script>
<div id="overDiv" style="position:absolute; visibility:hidden; z-index:1000; max-width: 400px;"></div>
<!-- end includes for overlib -->
EOHTML;
}