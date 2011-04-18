/*
 Artistic License 2.0
 
 Copyright (c) 2000-2006, The Perl Foundation.
 
 Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed.
 Preamble
 
 This license establishes the terms under which a given free software Package may be copied, modified, distributed, and/or redistributed. The intent is that the Copyright Holder maintains some artistic control over the development of that Package while still keeping the Package available as open source and free software.
 
 You are always permitted to make arrangements wholly outside of this license directly with the Copyright Holder of a given Package. If the terms of this license do not permit the full use that you propose to make of the Package, you should contact the Copyright Holder and seek a different licensing arrangement.
 Definitions
 
 "Copyright Holder" means the individual(s) or organization(s) named in the copyright notice for the entire Package.
 
 "Contributor" means any party that has contributed code or other material to the Package, in accordance with the Copyright Holder's procedures.
 
 "You" and "your" means any person who would like to copy, distribute, or modify the Package.
 
 "Package" means the collection of files distributed by the Copyright Holder, and derivatives of that collection and/or of those files. A given Package may consist of either the Standard Version, or a Modified Version.
 
 "Distribute" means providing a copy of the Package or making it accessible to anyone else, or in the case of a company or organization, to others outside of your company or organization.
 
 "Distributor Fee" means any fee that you charge for Distributing this Package or providing support for this Package to another party. It does not mean licensing fees.
 
 "Standard Version" refers to the Package if it has not been modified, or has been modified only in ways explicitly requested by the Copyright Holder.
 
 "Modified Version" means the Package, if it has been changed, and such changes were not explicitly requested by the Copyright Holder.
 
 "Original License" means this Artistic License as Distributed with the Standard Version of the Package, in its current version or as it may be modified by The Perl Foundation in the future.
 
 "Source" form means the source code, documentation source, and configuration files for the Package.
 
 "Compiled" form means the compiled bytecode, object code, binary, or any other form resulting from mechanical transformation or translation of the Source form.
 Permission for Use and Modification Without Distribution
 
 (1) You are permitted to use the Standard Version and create and use Modified Versions for any purpose without restriction, provided that you do not Distribute the Modified Version.
 Permissions for Redistribution of the Standard Version
 
 (2) You may Distribute verbatim copies of the Source form of the Standard Version of this Package in any medium without restriction, either gratis or for a Distributor Fee, provided that you duplicate all of the original copyright notices and associated disclaimers. At your discretion, such verbatim copies may or may not include a Compiled form of the Package.
 
 (3) You may apply any bug fixes, portability changes, and other modifications made available from the Copyright Holder. The resulting Package will still be considered the Standard Version, and as such will be subject to the Original License.
 Distribution of Modified Versions of the Package as Source
 
 (4) You may Distribute your Modified Version as Source (either gratis or for a Distributor Fee, and with or without a Compiled form of the Modified Version) provided that you clearly document how it differs from the Standard Version, including, but not limited to, documenting any non-standard features, executables, or modules, and provided that you do at least ONE of the following:
 
 (a) make the Modified Version available to the Copyright Holder of the Standard Version, under the Original License, so that the Copyright Holder may include your modifications in the Standard Version.
 (b) ensure that installation of your Modified Version does not prevent the user installing or running the Standard Version. In addition, the Modified Version must bear a name that is different from the name of the Standard Version.
 (c) allow anyone who receives a copy of the Modified Version to make the Source form of the Modified Version available to others under
 (i) the Original License or
 (ii) a license that permits the licensee to freely copy, modify and redistribute the Modified Version using the same licensing terms that apply to the copy that the licensee received, and requires that the Source form of the Modified Version, and of any works derived from it, be made freely available in that license fees are prohibited but Distributor Fees are allowed.
 Distribution of Compiled Forms of the Standard Version or Modified Versions without the Source
 
 (5) You may Distribute Compiled forms of the Standard Version without the Source, provided that you include complete instructions on how to get the Source of the Standard Version. Such instructions must be valid at the time of your distribution. If these instructions, at any time while you are carrying out such distribution, become invalid, you must provide new instructions on demand or cease further distribution. If you provide valid instructions or cease distribution within thirty days after you become aware that the instructions are invalid, then you do not forfeit any of your rights under this license.
 
 (6) You may Distribute a Modified Version in Compiled form without the Source, provided that you comply with Section 4 with respect to the Source of the Modified Version.
 Aggregating or Linking the Package
 
 (7) You may aggregate the Package (either the Standard Version or Modified Version) with other packages and Distribute the resulting aggregation provided that you do not charge a licensing fee for the Package. Distributor Fees are permitted, and licensing fees for other components in the aggregation are permitted. The terms of this license apply to the use and Distribution of the Standard or Modified Versions as included in the aggregation.
 
 (8) You are permitted to link Modified and Standard Versions with other works, to embed the Package in a larger work of your own, or to build stand-alone binary or bytecode versions of applications that include the Package, and Distribute the result without restriction, provided the result does not expose a direct interface to the Package.
 Items That are Not Considered Part of a Modified Version
 
 (9) Works (including, but not limited to, modules and scripts) that merely extend or make use of the Package, do not, by themselves, cause the Package to be a Modified Version. In addition, such works are not considered parts of the Package itself, and are not subject to the terms of this license.
 General Provisions
 
 (10) Any use, modification, and distribution of the Standard or Modified Versions is governed by this Artistic License. By using, modifying or distributing the Package, you accept this license. Do not use, modify, or distribute the Package, if you do not accept this license.
 
 (11) If your Modified Version has been derived from a Modified Version made by someone other than you, you are nevertheless required to ensure that your Modified Version complies with the requirements of this license.
 
 (12) This license does not grant you the right to use any trademark, service mark, tradename, or logo of the Copyright Holder.
 
 (13) This license includes the non-exclusive, worldwide, free-of-charge patent license to make, have made, use, offer to sell, sell, import and otherwise transfer the Package with respect to any patent claims licensable by the Copyright Holder that are necessarily infringed by the Package. If you institute patent litigation (including a cross-claim or counterclaim) against any party alleging that the Package constitutes direct or contributory patent infringement, then this Artistic License to you shall terminate on the date that such litigation is filed.
 
 (14) Disclaimer of Warranty: THE PACKAGE IS PROVIDED BY THE COPYRIGHT HOLDER AND CONTRIBUTORS "AS IS' AND WITHOUT ANY EXPRESS OR IMPLIED WARRANTIES. THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT ARE DISCLAIMED TO THE EXTENT PERMITTED BY YOUR LOCAL LAW. UNLESS REQUIRED BY LAW, NO COPYRIGHT HOLDER OR CONTRIBUTOR WILL BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING IN ANY WAY OUT OF THE USE OF THE PACKAGE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var OLloaded=0,pmCnt=1,pMtr=new Array(),OLcmdLine=new Array(),OLrunTime=new Array(),OLv,OLudf,OLpct=new Array("83%","67%","83%","100%","117%","150%","200%","267%"),OLrefXY,OLbubblePI=0,OLcrossframePI=0,OLdebugPI=0,OLdraggablePI=0,OLexclusivePI=0,OLfilterPI=0,OLfunctionPI=0,OLhidePI=0,OLiframePI=0,OLovertwoPI=0,OLscrollPI=0,OLshadowPI=0,OLprintPI=0;if(typeof OLgateOK=='undefined')var OLgateOK=1;var OLp1or2c='inarray,caparray,caption,closetext,right,left,center,autostatuscap,padx,pady,'
+'below,above,vcenter,donothing',OLp1or2co='nofollow,background,offsetx,offsety,fgcolor,'
+'bgcolor,cgcolor,textcolor,capcolor,width,wrap,wrapmax,height,border,base,status,autostatus,'
+'snapx,snapy,fixx,fixy,relx,rely,midx,midy,ref,refc,refp,refx,refy,fgbackground,bgbackground,'
+'cgbackground,fullhtml,capicon,textfont,captionfont,textsize,captionsize,timeout,delay,hauto,'
+'vauto,nojustx,nojusty,fgclass,bgclass,cgclass,capbelow,textpadding,textfontclass,'
+'captionpadding,captionfontclass,sticky,noclose,mouseoff,offdelay,closecolor,closefont,'
+'closesize,closeclick,closetitle,closefontclass,decode',OLp1or2o='text,cap,close,hpos,vpos,'
+'padxl,padxr,padyt,padyb',OLp1co='label',OLp1or2=OLp1or2co+','+OLp1or2o,OLp1=OLp1co+','+'frame';OLregCmds(OLp1or2c+','+OLp1or2co+','+OLp1co);function OLud(v){return eval('typeof ol_'+v+'=="undefined"')?1:0;}
if(OLud('fgcolor'))var ol_fgcolor="#ccccff";if(OLud('bgcolor'))var ol_bgcolor="#333399";if(OLud('cgcolor'))var ol_cgcolor="#333399";if(OLud('textcolor'))var ol_textcolor="#000000";if(OLud('capcolor'))var ol_capcolor="#ffffff";if(OLud('closecolor'))var ol_closecolor="#eeeeff";if(OLud('textfont'))var ol_textfont="Verdana,Arial,Helvetica";if(OLud('captionfont'))var ol_captionfont="Verdana,Arial,Helvetica";if(OLud('closefont'))var ol_closefont="Verdana,Arial,Helvetica";if(OLud('textsize'))var ol_textsize=1;if(OLud('captionsize'))var ol_captionsize=1;if(OLud('closesize'))var ol_closesize=1;if(OLud('fgclass'))var ol_fgclass="";if(OLud('bgclass'))var ol_bgclass="";if(OLud('cgclass'))var ol_cgclass="";if(OLud('textpadding'))var ol_textpadding=2;if(OLud('textfontclass'))var ol_textfontclass="";if(OLud('captionpadding'))var ol_captionpadding=2;if(OLud('captionfontclass'))var ol_captionfontclass="";if(OLud('closefontclass'))var ol_closefontclass="";if(OLud('close'))var ol_close="Close";if(OLud('closeclick'))var ol_closeclick=0;if(OLud('closetitle'))var ol_closetitle="Click to Close";if(OLud('text'))var ol_text="Default Text";if(OLud('cap'))var ol_cap="";if(OLud('capbelow'))var ol_capbelow=0;if(OLud('background'))var ol_background="";if(OLud('width'))var ol_width=200;if(OLud('wrap'))var ol_wrap=0;if(OLud('wrapmax'))var ol_wrapmax=0;if(OLud('height'))var ol_height=-1;if(OLud('border'))var ol_border=1;if(OLud('base'))var ol_base=0;if(OLud('offsetx'))var ol_offsetx=10;if(OLud('offsety'))var ol_offsety=10;if(OLud('sticky'))var ol_sticky=0;if(OLud('nofollow'))var ol_nofollow=0;if(OLud('noclose'))var ol_noclose=0;if(OLud('mouseoff'))var ol_mouseoff=0;if(OLud('offdelay'))var ol_offdelay=300;if(OLud('hpos'))var ol_hpos=RIGHT;if(OLud('vpos'))var ol_vpos=BELOW;if(OLud('status'))var ol_status="";if(OLud('autostatus'))var ol_autostatus=0;if(OLud('snapx'))var ol_snapx=0;if(OLud('snapy'))var ol_snapy=0;if(OLud('fixx'))var ol_fixx=-1;if(OLud('fixy'))var ol_fixy=-1;if(OLud('relx'))var ol_relx=null;if(OLud('rely'))var ol_rely=null;if(OLud('midx'))var ol_midx=null;if(OLud('midy'))var ol_midy=null;if(OLud('ref'))var ol_ref="";if(OLud('refc'))var ol_refc='UL';if(OLud('refp'))var ol_refp='UL';if(OLud('refx'))var ol_refx=0;if(OLud('refy'))var ol_refy=0;if(OLud('fgbackground'))var ol_fgbackground="";if(OLud('bgbackground'))var ol_bgbackground="";if(OLud('cgbackground'))var ol_cgbackground="";if(OLud('padxl'))var ol_padxl=1;if(OLud('padxr'))var ol_padxr=1;if(OLud('padyt'))var ol_padyt=1;if(OLud('padyb'))var ol_padyb=1;if(OLud('fullhtml'))var ol_fullhtml=0;if(OLud('capicon'))var ol_capicon="";if(OLud('frame'))var ol_frame=self;if(OLud('timeout'))var ol_timeout=0;if(OLud('delay'))var ol_delay=0;if(OLud('hauto'))var ol_hauto=0;if(OLud('vauto'))var ol_vauto=0;if(OLud('nojustx'))var ol_nojustx=0;if(OLud('nojusty'))var ol_nojusty=0;if(OLud('label'))var ol_label="";if(OLud('decode'))var ol_decode=0;if(OLud('texts'))var ol_texts=new Array("Text 0","Text 1");if(OLud('caps'))var ol_caps=new Array("Caption 0","Caption 1");var o3_text="",o3_cap="",o3_sticky=0,o3_nofollow=0,o3_background="",o3_noclose=0,o3_mouseoff=0,o3_offdelay=300,o3_hpos=RIGHT,o3_offsetx=10,o3_offsety=10,o3_fgcolor="",o3_bgcolor="",o3_cgcolor="",o3_textcolor="",o3_capcolor="",o3_closecolor="",o3_width=200,o3_wrap=0,o3_wrapmax=0,o3_height=-1,o3_border=1,o3_base=0,o3_status="",o3_autostatus=0,o3_snapx=0,o3_snapy=0,o3_fixx=-1,o3_fixy=-1,o3_relx=null,o3_rely=null,o3_midx=null,o3_midy=null,o3_ref="",o3_refc='UL',o3_refp='UL',o3_refx=0,o3_refy=0,o3_fgbackground="",o3_bgbackground="",o3_cgbackground="",o3_padxl=0,o3_padxr=0,o3_padyt=0,o3_padyb=0,o3_fullhtml=0,o3_vpos=BELOW,o3_capicon="",o3_textfont="Verdana,Arial,Helvetica",o3_captionfont="",o3_closefont="",o3_textsize=1,o3_captionsize=1,o3_closesize=1,o3_frame=self,o3_timeout=0,o3_delay=0,o3_hauto=0,o3_vauto=0,o3_nojustx=0,o3_nojusty=0,o3_close="",o3_closeclick=0,o3_closetitle="",o3_fgclass="",o3_bgclass="",o3_cgclass="",o3_textpadding=2,o3_textfontclass="",o3_captionpadding=2,o3_captionfontclass="",o3_closefontclass="",o3_capbelow=0,o3_label="",o3_decode=0,CSSOFF=DONOTHING,CSSCLASS=DONOTHING,OLdelayid=0,OLtimerid=0,OLshowid=0,OLndt=0,over=null,OLfnRef="",OLhover=0,OLx=0,OLy=0,OLshowingsticky=0,OLallowmove=0,OLcC=null,OLua=navigator.userAgent.toLowerCase(),OLns4=(navigator.appName=='Netscape'&&parseInt(navigator.appVersion)==4),OLns6=(document.getElementById)?1:0,OLie4=(document.all)?1:0,OLgek=(OLv=OLua.match(/gecko\/(\d{8})/i))?parseInt(OLv[1]):0,OLmac=(OLua.indexOf('mac')>=0)?1:0,OLsaf=(OLua.indexOf('safari')>=0)?1:0,OLkon=(OLua.indexOf('konqueror')>=0)?1:0,OLkht=(OLsaf||OLkon)?1:0,OLopr=(OLua.indexOf('opera')>=0)?1:0,OLop7=(OLopr&&document.createTextNode)?1:0;if(OLopr){OLns4=OLns6=0;if(!OLop7)OLie4=0;}
var OLieM=((OLie4&&OLmac)&&!(OLkht||OLopr))?1:0,OLie5=0,OLie55=0;if(OLie4&&!OLop7){if((OLv=OLua.match(/msie (\d\.\d+)\.*/i))&&(OLv=parseFloat(OLv[1]))>=5.0){OLie5=1;OLns6=0;if(OLv>=5.5)OLie55=1;}if(OLns6)OLie4=0;}
if(OLns4)window.onresize=function(){location.reload();}
var OLchkMh=1,OLdw;if(OLns4||OLie4||OLns6)OLmh();else{overlib=nd=cClick=OLpageDefaults=no_overlib;}
function overlib(){if(!(OLloaded&&OLgateOK))return;if((OLexclusivePI)&&OLisExclusive(arguments))return true;if(OLchkMh)OLmh();if(OLndt&&!OLtimerid)OLndt=0;if(over)cClick();OLload(OLp1or2);OLload(OLp1);OLfnRef="";OLhover=0;OLsetRunTimeVar();OLparseTokens('o3_',arguments);if(!(over=OLmkLyr()))return false;if(o3_decode)OLdecode();if(OLprintPI)OLchkPrint();if(OLbubblePI)OLchkForBubbleEffect();if(OLdebugPI)OLsetDebugCanShow();if(OLshadowPI)OLinitShadow();if(OLiframePI)OLinitIfs();if(OLfilterPI)OLinitFilterLyr();if(OLexclusivePI&&o3_exclusive&&o3_exclusivestatus!="")o3_status=o3_exclusivestatus;else if(o3_autostatus==2&&o3_cap!="")o3_status=o3_cap;else if(o3_autostatus==1&&o3_text!="")o3_status=o3_text;if(!o3_delay){return OLmain();}else{OLdelayid=setTimeout("OLmain()",o3_delay);if(o3_status!=""){self.status=o3_status;return true;}
else if(!(OLop7&&event&&event.type=='mouseover'))return false;}}
function nd(time){if(OLloaded&&OLgateOK){if(!((OLexclusivePI)&&OLisExclusive())){if(time&&over&&!o3_delay){if(OLtimerid>0)clearTimeout(OLtimerid);OLtimerid=(OLhover&&o3_frame==self&&!OLcursorOff())?0:setTimeout("cClick()",(o3_timeout=OLndt=time));}else{if(!OLshowingsticky){OLallowmove=0;if(over)OLhideObject(over);}}}}
return false;}
function cClick(){if(OLloaded&&OLgateOK){OLhover=0;if(over){if(OLovertwoPI&&over==over2)cClick2();OLhideObject(over);OLshowingsticky=0;}}
return false;}
function OLpageDefaults(){OLparseTokens('ol_',arguments);}
function no_overlib(){return false;}
function OLmain(){o3_delay=0;if(o3_frame==self){if(o3_noclose)OLoptMOUSEOFF(0);else if(o3_mouseoff)OLoptMOUSEOFF(1);}
if(o3_sticky)OLshowingsticky=1;OLdoLyr();OLallowmove=0;if(o3_timeout>0){if(OLtimerid>0)clearTimeout(OLtimerid);OLtimerid=setTimeout("cClick()",o3_timeout);}
if(o3_ref){OLrefXY=OLgetRefXY(o3_ref);if(OLrefXY[0]==null){o3_ref="";o3_midx=0;o3_midy=0;}}
OLdisp(o3_status);if(OLdraggablePI)OLcheckDrag();if(o3_status!="")return true;else if(!(OLop7&&event&&event.type=='mouseover'))return false;}
function OLload(c){var i,m=c.split(',');for(i=0;i<m.length;i++)eval('o3_'+m[i]+'=ol_'+m[i]);}
function OLdoLGF(){return(o3_background!=''||o3_fullhtml)?OLcontentBackground(o3_text,o3_background,o3_fullhtml):(o3_cap=="")?OLcontentSimple(o3_text):(o3_sticky)?OLcontentCaption(o3_text,o3_cap,o3_close):OLcontentCaption(o3_text,o3_cap,'');}
function OLmkLyr(id,f,z){id=(id||'overDiv');f=(f||o3_frame);z=(z||1000);var fd=f.document,d=OLgetRefById(id,fd);if(!d){if(OLns4)d=fd.layers[id]=new Layer(1024,f);else if(OLie4&&!document.getElementById){fd.body.insertAdjacentHTML('BeforeEnd','<div id="'+id+'"></div>');d=fd.all[id];}else{d=fd.createElement('div');if(d){d.id=id;fd.body.appendChild(d);}}if(!d)return null;if(OLns4)d.zIndex=z;else{var o=d.style;o.position='absolute';o.visibility='hidden';o.zIndex=z;}}
return d;}
function OLdoLyr(){if(o3_background==''&&!o3_fullhtml){if(o3_fgbackground!='')o3_fgbackground=' background="'+o3_fgbackground+'"';if(o3_bgbackground!='')o3_bgbackground=' background="'+o3_bgbackground+'"';if(o3_cgbackground!='')o3_cgbackground=' background="'+o3_cgbackground+'"';if(o3_fgcolor!='')o3_fgcolor=' bgcolor="'+o3_fgcolor+'"';if(o3_bgcolor!='')o3_bgcolor=' bgcolor="'+o3_bgcolor+'"';if(o3_cgcolor!='')o3_cgcolor=' bgcolor="'+o3_cgcolor+'"';if(o3_height>0)o3_height=' height="'+o3_height+'"';else o3_height='';}
if(!OLns4)OLrepositionTo(over,(OLns6?20:0),0);var lyrHtml=OLdoLGF();if(o3_sticky&&OLtimerid>0){clearTimeout(OLtimerid);OLtimerid=0;}
if(o3_wrap&&!o3_fullhtml){OLlayerWrite(lyrHtml);o3_width=(OLns4?over.clip.width:over.offsetWidth);if(OLns4&&o3_wrapmax<1)o3_wrapmax=o3_frame.innerWidth-40;o3_wrap=0;if(o3_wrapmax>0&&o3_width>o3_wrapmax)o3_width=o3_wrapmax;lyrHtml=OLdoLGF();}
OLlayerWrite(lyrHtml);o3_width=(OLns4?over.clip.width:over.offsetWidth);if(OLbubblePI)OLgenerateBubble(lyrHtml);}
function OLcontentSimple(txt){var t=OLbgLGF()+OLfgLGF(txt)+OLbaseLGF();OLsetBackground('');return t;}
function OLcontentCaption(txt,title,close){var closing=(OLprintPI?OLprintCapLGF():''),closeevent='onmouseover',caption,t,cC='javascript:return '+OLfnRef+(OLovertwoPI&&over==over2?'cClick2();':'cClick();');if(o3_closeclick)closeevent=(o3_closetitle?'title="'+o3_closetitle+'" ':'')+'onclick';if(o3_capicon!='')o3_capicon='<img src="'+o3_capicon+'" /> ';if(close){closing+='<a href="'+cC+'" '
+closeevent+'="'+cC+'"'+(o3_closefontclass?'>':'>'+OLlgfUtil(0,'','span',o3_closecolor,o3_closefont,o3_closesize))+close
+(o3_closefontclass?'':OLlgfUtil(1,'','span'))+'</a>';}
caption='<table'+OLwd(0)+' border="0" cellpadding="'+o3_captionpadding+'" cellspacing="0"'
+(o3_cgclass?' class="'+o3_cgclass+'"':o3_cgcolor+o3_cgbackground)+'><tr><td'+OLwd(0)
+(o3_cgclass?' class="'+o3_cgclass+'">':'>')+(o3_captionfontclass?'<div class="'
+o3_captionfontclass+'">':''
+OLlgfUtil(0,'','',o3_capcolor,o3_captionfont,o3_captionsize))+o3_capicon+title
+OLlgfUtil(1,'','')+(o3_captionfontclass?'':'')+closing+'</div></td></tr></table>';t=OLbgLGF()+(o3_capbelow?OLfgLGF(txt)+caption:caption+OLfgLGF(txt))+OLbaseLGF();OLsetBackground('');return t;}
function OLcontentBackground(txt,image,hasfullhtml){var t;if(hasfullhtml){t=txt;}else{t='<table'+OLwd(1)
+' border="0" cellpadding="0" cellspacing="0" '+'height="'+o3_height
+'"><tr><td colspan="3" height="'+o3_padyt+'"></td></tr><tr><td width="'
+o3_padxl+'"></td><td valign="top"'+OLwd(2)+'>'
+OLlgfUtil(0,o3_textfontclass,'div',o3_textcolor,o3_textfont,o3_textsize)+txt+
OLlgfUtil(1,'','div')+'</td><td width="'+o3_padxr+'"></td></tr><tr><td colspan="3" height="'
+o3_padyb+'"></td></tr></table>';}
OLsetBackground(image);return t;}
function OLbgLGF(){return'<table'+OLwd(1)+o3_height+' border="0" cellpadding="'+o3_border+'" cellspacing="0"'
+(o3_bgclass?' class="'+o3_bgclass+'"':o3_bgcolor+o3_bgbackground)+'><tr><td>';}
function OLfgLGF(t){return'<table'+OLwd(0)+o3_height+' border="0" cellpadding="'+o3_textpadding
+'" cellspacing="0"'+(o3_fgclass?' class="'+o3_fgclass+'"':o3_fgcolor+o3_fgbackground)
+'><tr><td valign="top"'+(o3_fgclass?' class="'+o3_fgclass+'"':'')+'>'
+OLlgfUtil(0,o3_textfontclass,'div',o3_textcolor,o3_textfont,o3_textsize)+t
+(OLprintPI?OLprintFgLGF():'')+OLlgfUtil(1,'','div')+'</td></tr></table>';}
function OLlgfUtil(end,tfc,ele,col,fac,siz){if(end)return('</'+(OLns4?'font':ele)+'>');else return(tfc?'<div class="'+tfc+'">':('<'+(OLns4?'font color="'+col+'" face="'+OLquoteMultiNameFonts(fac)+'" size="'+siz:ele
+' style="color:'+col+';font-family:'+OLquoteMultiNameFonts(fac)+';font-size:'+siz+';'
+(ele=='span'?'text-decoration:underline;':''))+'">'));}
function OLquoteMultiNameFonts(f){var i,v,pM=f.split(',');for(i=0;i<pM.length;i++){v=pM[i];v=v.replace(/^\s+/,'').replace(/\s+$/,'');if(/\s/.test(v)&&!/['"]/.test(v)){v="\'"+v+"\'";pM[i]=v;}}
return pM.join();}
function OLbaseLGF(){return((o3_base>0&&!o3_wrap)?('<table width="100%" border="0" cellpadding="0" cellspacing="0"'
+(o3_bgclass?' class="'+o3_bgclass+'"':'')+'><tr><td height="'+o3_base
+'"></td></tr></table>'):'')+'</td></tr></table>';}
function OLwd(a){return(o3_wrap?'':' width="'+(!a?'100%':(a==1?o3_width:(o3_width-o3_padxl-o3_padxr)))+'"');}
function OLsetBackground(i){if(i==''){if(OLns4)over.background.src=null;else{if(OLns6)over.style.width='';over.style.backgroundImage='none';}}else{if(OLns4)over.background.src=i;else{if(OLns6)over.style.width=o3_width+'px';over.style.backgroundImage='url('+i+')';}}}
function OLdisp(s){if(!OLallowmove){if(OLshadowPI)OLdispShadow();if(OLiframePI)OLdispIfs();OLplaceLayer();if(OLndt)OLshowObject(over);else OLshowid=setTimeout("OLshowObject(over)",1);OLallowmove=(o3_sticky||o3_nofollow)?0:1;}OLndt=0;if(s!="")self.status=s;}
function OLplaceLayer(){var snp,X,Y,pgLeft,pgTop,pWd=o3_width,pHt,iWd=100,iHt=100,SB=0,LM=0,CX=0,TM=0,BM=0,CY=0,o=OLfd(),nsb=(OLgek>=20010505&&!o3_frame.scrollbars.visible)?1:0;if(!OLkht&&o&&o.clientWidth)iWd=o.clientWidth;else if(o3_frame.innerWidth){SB=Math.ceil(1.4*(o3_frame.outerWidth-o3_frame.innerWidth));if(SB>20)SB=20;iWd=o3_frame.innerWidth;}
pgLeft=(OLie4)?o.scrollLeft:o3_frame.pageXOffset;if(OLie55&&OLfilterPI&&o3_filter&&o3_filtershadow)SB=CX=5;else
if((OLshadowPI)&&bkdrop&&o3_shadow&&o3_shadowx){SB+=((o3_shadowx>0)?o3_shadowx:0);LM=((o3_shadowx<0)?Math.abs(o3_shadowx):0);CX=Math.abs(o3_shadowx);}
if(o3_ref!=""||o3_fixx>-1||o3_relx!=null||o3_midx!=null){if(o3_ref!=""){X=OLrefXY[0];if(OLie55&&OLfilterPI&&o3_filter&&o3_filtershadow){if(o3_refp=='UR'||o3_refp=='LR')X-=5;}
else if((OLshadowPI)&&bkdrop&&o3_shadow&&o3_shadowx){if(o3_shadowx<0&&(o3_refp=='UL'||o3_refp=='LL'))X-=o3_shadowx;else
if(o3_shadowx>0&&(o3_refp=='UR'||o3_refp=='LR'))X-=o3_shadowx;}}else{if(o3_midx!=null){X=parseInt(pgLeft+((iWd-pWd-SB-LM)/2)+o3_midx);}else{if(o3_relx!=null){if(o3_relx>=0)X=pgLeft+o3_relx+LM;else X=pgLeft+o3_relx+iWd-pWd-SB;}else{X=o3_fixx+LM;}}}}else{if(o3_hauto){if(o3_hpos==LEFT&&OLx-pgLeft<iWd/2&&OLx-pWd-o3_offsetx<pgLeft+LM)o3_hpos=RIGHT;else
if(o3_hpos==RIGHT&&OLx-pgLeft>iWd/2&&OLx+pWd+o3_offsetx>pgLeft+iWd-SB)o3_hpos=LEFT;}
X=(o3_hpos==CENTER)?parseInt(OLx-((pWd+CX)/2)+o3_offsetx):(o3_hpos==LEFT)?OLx-o3_offsetx-pWd:OLx+o3_offsetx;if(o3_snapx>1){snp=X%o3_snapx;if(o3_hpos==LEFT){X=X-(o3_snapx+snp);}else{X=X+(o3_snapx-snp);}}}
if(!o3_nojustx&&X+pWd>pgLeft+iWd-SB)
X=iWd+pgLeft-pWd-SB;if(!o3_nojustx&&X-LM<pgLeft)X=pgLeft+LM;pgTop=OLie4?o.scrollTop:o3_frame.pageYOffset;if(!OLkht&&!nsb&&o&&o.clientHeight)iHt=o.clientHeight;else if(o3_frame.innerHeight)iHt=o3_frame.innerHeight;if(OLbubblePI&&o3_bubble)pHt=OLbubbleHt;else pHt=OLns4?over.clip.height:over.offsetHeight;if((OLshadowPI)&&bkdrop&&o3_shadow&&o3_shadowy){TM=(o3_shadowy<0)?Math.abs(o3_shadowy):0;if(OLie55&&OLfilterPI&&o3_filter&&o3_filtershadow)BM=CY=5;else
BM=(o3_shadowy>0)?o3_shadowy:0;CY=Math.abs(o3_shadowy);}
if(o3_ref!=""||o3_fixy>-1||o3_rely!=null||o3_midy!=null){if(o3_ref!=""){Y=OLrefXY[1];if(OLie55&&OLfilterPI&&o3_filter&&o3_filtershadow){if(o3_refp=='LL'||o3_refp=='LR')Y-=5;}else if((OLshadowPI)&&bkdrop&&o3_shadow&&o3_shadowy){if(o3_shadowy<0&&(o3_refp=='UL'||o3_refp=='UR'))Y-=o3_shadowy;else
if(o3_shadowy>0&&(o3_refp=='LL'||o3_refp=='LR'))Y-=o3_shadowy;}}else{if(o3_midy!=null){Y=parseInt(pgTop+((iHt-pHt-CY)/2)+o3_midy);}else{if(o3_rely!=null){if(o3_rely>=0)Y=pgTop+o3_rely+TM;else Y=pgTop+o3_rely+iHt-pHt-BM;}else{Y=o3_fixy+TM;}}}}else{if(o3_vauto){if(o3_vpos==ABOVE&&OLy-pgTop<iHt/2&&OLy-pHt-o3_offsety<pgTop)o3_vpos=BELOW;else
if(o3_vpos==BELOW&&OLy-pgTop>iHt/2&&OLy+pHt+o3_offsety+((OLns4||OLkht)?17:0)>pgTop+iHt-BM)
o3_vpos=ABOVE;}Y=(o3_vpos==VCENTER)?parseInt(OLy-((pHt+CY)/2)+o3_offsety):(o3_vpos==ABOVE)?OLy-(pHt+o3_offsety+BM):OLy+o3_offsety+TM;if(o3_snapy>1){snp=Y%o3_snapy;if(pHt>0&&o3_vpos==ABOVE){Y=Y-(o3_snapy+snp);}else{Y=Y+(o3_snapy-snp);}}}
if(!o3_nojusty&&Y+pHt+BM>pgTop+iHt)Y=pgTop+iHt-pHt-BM;if(!o3_nojusty&&Y-TM<pgTop)Y=pgTop+TM;OLrepositionTo(over,X,Y);if(OLshadowPI)OLrepositionShadow(X,Y);if(OLiframePI)OLrepositionIfs(X,Y);if(OLns6&&o3_frame.innerHeight){iHt=o3_frame.innerHeight;OLrepositionTo(over,X,Y);}
if(OLscrollPI)OLchkScroll(X-pgLeft,Y-pgTop);}
function OLfd(f){var fd=((f)?f:o3_frame).document,fdc=fd.compatMode,fdd=fd.documentElement;return(!OLop7&&fdc&&fdc!='BackCompat'&&fdd&&fdd.clientWidth)?fd.documentElement:fd.body;}
function OLgetRefXY(r){var o=OLgetRef(r),ob=o,rXY=[o3_refx,o3_refy],of;if(!o)return[null,null];if(OLns4){if(typeof o.length!='undefined'&&o.length>1){ob=o[0];rXY[0]+=o[0].x+o[1].pageX;rXY[1]+=o[0].y+o[1].pageY;}else{if((o.toString().indexOf('Image')!=-1)||(o.toString().indexOf('Anchor')!=-1)){rXY[0]+=o.x;rXY[1]+=o.y;}else{rXY[0]+=o.pageX;rXY[1]+=o.pageY;}}}else{rXY[0]+=OLpageLoc(o,'Left');rXY[1]+=OLpageLoc(o,'Top');}
of=OLgetRefOffsets(ob);rXY[0]+=of[0];rXY[1]+=of[1];return rXY;}
function OLgetRef(l){var r=OLgetRefById(l);return(r)?r:OLgetRefByName(l);}
function OLgetRefById(l,d){var r="",j;l=(l||'overDiv');d=(d||o3_frame.document);if(OLie4&&d.all){return d.all[l];}else if(d.getElementById){return d.getElementById(l);}else if(d.layers&&d.layers.length>0){if(d.layers[l])return d.layers[l];for(j=0;j<d.layers.length;j++){r=OLgetRefById(l,d.layers[j].document);if(r)return r;}}
return null;}
function OLgetRefByName(l,d){var r=null,j;d=(d||o3_frame.document);if(typeof d.images[l]!='undefined'&&d.images[l]){return d.images[l];}else if(typeof d.anchors[l]!='undefined'&&d.anchors[l]){return d.anchors[l];}else if(d.layers&&d.layers.length>0){for(j=0;j<d.layers.length;j++){r=OLgetRefByName(l,d.layers[j].document);if(r&&r.length>0)return r;else if(r)return[r,d.layers[j]];}}
return null;}
function OLgetRefOffsets(o){var c=o3_refc.toUpperCase(),p=o3_refp.toUpperCase(),W=0,H=0,pW=0,pH=0,of=[0,0];pW=(OLbubblePI&&o3_bubble)?o3_width:OLns4?over.clip.width:over.offsetWidth;pH=(OLbubblePI&&o3_bubble)?OLbubbleHt:OLns4?over.clip.height:over.offsetHeight;if((!OLop7)&&o.toString().indexOf('Image')!=-1){W=o.width;H=o.height;}else if((!OLop7)&&o.toString().indexOf('Anchor')!=-1){c=o3_refc='UL';}else{W=(OLns4)?o.clip.width:o.offsetWidth;H=(OLns4)?o.clip.height:o.offsetHeight;}
if((OLns4||(OLns6&&OLgek))&&o.border){W+=2*parseInt(o.border);H+=2*parseInt(o.border);}
if(c=='UL'){of=(p=='UR')?[-pW,0]:(p=='LL')?[0,-pH]:(p=='LR')?[-pW,-pH]:[0,0];}else if(c=='UR'){of=(p=='UR')?[W-pW,0]:(p=='LL')?[W,-pH]:(p=='LR')?[W-pW,-pH]:[W,0];}else if(c=='LL'){of=(p=='UR')?[-pW,H]:(p=='LL')?[0,H-pH]:(p=='LR')?[-pW,H-pH]:[0,H];}else if(c=='LR'){of=(p=='UR')?[W-pW,H]:(p=='LL')?[W,H-pH]:(p=='LR')?[W-pW,H-pH]:[W,H];}
return of;}
function OLpageLoc(o,t){var l=0;while(o.offsetParent&&o.offsetParent.tagName.toLowerCase()!='html'){l+=o['offset'+t];o=o.offsetParent;}l+=o['offset'+t];return l;}
function OLmouseMove(e){var e=(e||event);OLcC=(OLovertwoPI&&over2&&over==over2?cClick2:cClick);OLx=(e.pageX||e.clientX+OLfd().scrollLeft);OLy=(e.pageY||e.clientY+OLfd().scrollTop);if((OLallowmove&&over)&&(o3_frame==self||over==OLgetRefById())){OLplaceLayer();if(OLhidePI)OLhideUtil(0,1,1,0,0,0);}
if(OLhover&&over&&o3_frame==self&&OLcursorOff())if(o3_offdelay<1)OLcC();else
{if(OLtimerid>0)clearTimeout(OLtimerid);OLtimerid=setTimeout("OLcC()",o3_offdelay);}}
function OLmh(){var fN,f,j,k,s,mh=OLmouseMove,w=(OLns4&&window.onmousemove),re=/function[ ]*(\w*)\(/;OLdw=document;if(document.onmousemove||w){if(w)OLdw=window;f=OLdw.onmousemove.toString();fN=f.match(re);if(!fN||fN[1]=='anonymous'||fN[1]=='OLmouseMove'){OLchkMh=0;return;}
if(fN[1])s=fN[1]+'(e)';else{j=f.indexOf('{');k=f.lastIndexOf('}')+1;s=f.substring(j,k);}
s+=';OLmouseMove(e);';mh=new Function('e',s);}
OLdw.onmousemove=mh;if(OLns4)OLdw.captureEvents(Event.MOUSEMOVE);}
function OLparseTokens(pf,ar){var i,v,md=-1,par=(pf!='ol_'),p=OLpar,q=OLparQuo,t=OLtoggle;OLudf=(par&&!ar.length?1:0);for(i=0;i<ar.length;i++){if(md<0){if(typeof ar[i]=='number'){OLudf=(par?1:0);i--;}
else{switch(pf){case'ol_':ol_text=ar[i];break;default:o3_text=ar[i];}}md=0;}else{if(ar[i]==INARRAY){OLudf=0;eval(pf+'text=ol_texts['+ar[++i]+']');continue;}
if(ar[i]==CAPARRAY){eval(pf+'cap=ol_caps['+ar[++i]+']');continue;}
if(ar[i]==CAPTION){q(ar[++i],pf+'cap');continue;}
if(Math.abs(ar[i])==STICKY){t(ar[i],pf+'sticky');continue;}
if(Math.abs(ar[i])==NOFOLLOW){t(ar[i],pf+'nofollow');continue;}
if(ar[i]==BACKGROUND){q(ar[++i],pf+'background');continue;}
if(Math.abs(ar[i])==NOCLOSE){t(ar[i],pf+'noclose');continue;}
if(Math.abs(ar[i])==MOUSEOFF){t(ar[i],pf+'mouseoff');continue;}
if(ar[i]==OFFDELAY){p(ar[++i],pf+'offdelay');continue;}
if(ar[i]==RIGHT||ar[i]==LEFT||ar[i]==CENTER){p(ar[i],pf+'hpos');continue;}
if(ar[i]==OFFSETX){p(ar[++i],pf+'offsetx');continue;}
if(ar[i]==OFFSETY){p(ar[++i],pf+'offsety');continue;}
if(ar[i]==FGCOLOR){q(ar[++i],pf+'fgcolor');continue;}
if(ar[i]==BGCOLOR){q(ar[++i],pf+'bgcolor');continue;}
if(ar[i]==CGCOLOR){q(ar[++i],pf+'cgcolor');continue;}
if(ar[i]==TEXTCOLOR){q(ar[++i],pf+'textcolor');continue;}
if(ar[i]==CAPCOLOR){q(ar[++i],pf+'capcolor');continue;}
if(ar[i]==CLOSECOLOR){q(ar[++i],pf+'closecolor');continue;}
if(ar[i]==WIDTH){p(ar[++i],pf+'width');continue;}
if(Math.abs(ar[i])==WRAP){t(ar[i],pf+'wrap');continue;}
if(ar[i]==WRAPMAX){p(ar[++i],pf+'wrapmax');continue;}
if(ar[i]==HEIGHT){p(ar[++i],pf+'height');continue;}
if(ar[i]==BORDER){p(ar[++i],pf+'border');continue;}
if(ar[i]==BASE){p(ar[++i],pf+'base');continue;}
if(ar[i]==STATUS){q(ar[++i],pf+'status');continue;}
if(Math.abs(ar[i])==AUTOSTATUS){v=pf+'autostatus';eval(v+'=('+ar[i]+'<0)?('+v+'==2?2:0):('+v+'==1?0:1)');continue;}
if(Math.abs(ar[i])==AUTOSTATUSCAP){v=pf+'autostatus';eval(v+'=('+ar[i]+'<0)?('+v+'==1?1:0):('+v+'==2?0:2)');continue;}
if(ar[i]==CLOSETEXT){q(ar[++i],pf+'close');continue;}
if(ar[i]==SNAPX){p(ar[++i],pf+'snapx');continue;}
if(ar[i]==SNAPY){p(ar[++i],pf+'snapy');continue;}
if(ar[i]==FIXX){p(ar[++i],pf+'fixx');continue;}
if(ar[i]==FIXY){p(ar[++i],pf+'fixy');continue;}
if(ar[i]==RELX){p(ar[++i],pf+'relx');continue;}
if(ar[i]==RELY){p(ar[++i],pf+'rely');continue;}
if(ar[i]==MIDX){p(ar[++i],pf+'midx');continue;}
if(ar[i]==MIDY){p(ar[++i],pf+'midy');continue;}
if(ar[i]==REF){q(ar[++i],pf+'ref');continue;}
if(ar[i]==REFC){q(ar[++i],pf+'refc');continue;}
if(ar[i]==REFP){q(ar[++i],pf+'refp');continue;}
if(ar[i]==REFX){p(ar[++i],pf+'refx');continue;}
if(ar[i]==REFY){p(ar[++i],pf+'refy');continue;}
if(ar[i]==FGBACKGROUND){q(ar[++i],pf+'fgbackground');continue;}
if(ar[i]==BGBACKGROUND){q(ar[++i],pf+'bgbackground');continue;}
if(ar[i]==CGBACKGROUND){q(ar[++i],pf+'cgbackground');continue;}
if(ar[i]==PADX){p(ar[++i],pf+'padxl');p(ar[++i],pf+'padxr');continue;}
if(ar[i]==PADY){p(ar[++i],pf+'padyt');p(ar[++i],pf+'padyb');continue;}
if(Math.abs(ar[i])==FULLHTML){t(ar[i],pf+'fullhtml');continue;}
if(ar[i]==BELOW||ar[i]==ABOVE||ar[i]==VCENTER){p(ar[i],pf+'vpos');continue;}
if(ar[i]==CAPICON){q(ar[++i],pf+'capicon');continue;}
if(ar[i]==TEXTFONT){q(ar[++i],pf+'textfont');continue;}
if(ar[i]==CAPTIONFONT){q(ar[++i],pf+'captionfont');continue;}
if(ar[i]==CLOSEFONT){q(ar[++i],pf+'closefont');continue;}
if(ar[i]==TEXTSIZE){q(ar[++i],pf+'textsize');continue;}
if(ar[i]==CAPTIONSIZE){q(ar[++i],pf+'captionsize');continue;}
if(ar[i]==CLOSESIZE){q(ar[++i],pf+'closesize');continue;}
if(ar[i]==TIMEOUT){p(ar[++i],pf+'timeout');continue;}
if(ar[i]==DELAY){p(ar[++i],pf+'delay');continue;}
if(Math.abs(ar[i])==HAUTO){t(ar[i],pf+'hauto');continue;}
if(Math.abs(ar[i])==VAUTO){t(ar[i],pf+'vauto');continue;}
if(Math.abs(ar[i])==NOJUSTX){t(ar[i],pf+'nojustx');continue;}
if(Math.abs(ar[i])==NOJUSTY){t(ar[i],pf+'nojusty');continue;}
if(Math.abs(ar[i])==CLOSECLICK){t(ar[i],pf+'closeclick');continue;}
if(ar[i]==CLOSETITLE){q(ar[++i],pf+'closetitle');continue;}
if(ar[i]==FGCLASS){q(ar[++i],pf+'fgclass');continue;}
if(ar[i]==BGCLASS){q(ar[++i],pf+'bgclass');continue;}
if(ar[i]==CGCLASS){q(ar[++i],pf+'cgclass');continue;}
if(ar[i]==TEXTPADDING){p(ar[++i],pf+'textpadding');continue;}
if(ar[i]==TEXTFONTCLASS){q(ar[++i],pf+'textfontclass');continue;}
if(ar[i]==CAPTIONPADDING){p(ar[++i],pf+'captionpadding');continue;}
if(ar[i]==CAPTIONFONTCLASS){q(ar[++i],pf+'captionfontclass');continue;}
if(ar[i]==CLOSEFONTCLASS){q(ar[++i],pf+'closefontclass');continue;}
if(Math.abs(ar[i])==CAPBELOW){t(ar[i],pf+'capbelow');continue;}
if(ar[i]==LABEL){q(ar[++i],pf+'label');continue;}
if(Math.abs(ar[i])==DECODE){t(ar[i],pf+'decode');continue;}
if(ar[i]==DONOTHING){continue;}
i=OLparseCmdLine(pf,i,ar);}}
if((OLfunctionPI)&&OLudf&&o3_function)o3_text=o3_function();if(pf=='o3_')OLfontSize();}
function OLpar(a,v){eval(v+'='+a);}
function OLparQuo(a,v){eval(v+"='"+OLescSglQt(a)+"'");}
function OLescSglQt(s){return s.toString().replace(/'/g,"\\'");}
function OLtoggle(a,v){eval(v+'=('+v+'==0&&'+a+'>=0)?1:0');}
function OLhasDims(s){return/[%\-a-z]+$/.test(s);}
function OLfontSize(){var i;if(OLhasDims(o3_textsize)){if(OLns4)o3_textsize="2";}else
if(!OLns4){i=parseInt(o3_textsize);o3_textsize=(i>0&&i<8)?OLpct[i]:OLpct[0];}
if(OLhasDims(o3_captionsize)){if(OLns4)o3_captionsize="2";}else
if(!OLns4){i=parseInt(o3_captionsize);o3_captionsize=(i>0&&i<8)?OLpct[i]:OLpct[0];}
if(OLhasDims(o3_closesize)){if(OLns4)o3_closesize="2";}else
if(!OLns4){i=parseInt(o3_closesize);o3_closesize=(i>0&&i<8)?OLpct[i]:OLpct[0];}
if(OLprintPI)OLprintDims();}
function OLdecode(){var re=/%[0-9A-Fa-f]{2,}/,t=o3_text,c=o3_cap,u=unescape,d=!OLns4&&(!OLgek||OLgek>=20020826)&&typeof decodeURIComponent?decodeURIComponent:u;if(typeof(window.TypeError)=='function'){if(re.test(t)){eval(new Array('try{','o3_text=d(t);','}catch(e){','o3_text=u(t);','}').join('\n'))};if(c&&re.test(c)){eval(new Array('try{','o3_cap=d(c);','}catch(e){','o3_cap=u(c);','}').join('\n'))}}else{if(re.test(t))o3_text=u(t);if(c&&re.test(c))o3_cap=u(c);}}
function OLlayerWrite(t){t+="\n";if(OLns4){over.document.write(t);over.document.close();}else if(typeof over.innerHTML!='undefined'){if(OLieM)over.innerHTML='';over.innerHTML=t;}else{range=o3_frame.document.createRange();range.setStartAfter(over);domfrag=range.createContextualFragment(t);while(over.hasChildNodes()){over.removeChild(over.lastChild);}
over.appendChild(domfrag);}
if(OLprintPI)over.print=o3_print?t:null;}
function OLshowObject(o){OLshowid=0;o=(OLns4)?o:o.style;if(((OLfilterPI)&&!OLchkFilter(o))||!OLfilterPI)o.visibility="visible";if(OLshadowPI)OLshowShadow();if(OLiframePI)OLshowIfs();if(OLhidePI)OLhideUtil(1,1,0);}
function OLhideObject(o){if(OLshowid>0){clearTimeout(OLshowid);OLshowid=0;}
if(OLtimerid>0)clearTimeout(OLtimerid);if(OLdelayid>0)clearTimeout(OLdelayid);OLtimerid=0;OLdelayid=0;self.status="";o3_label=ol_label;if(o3_frame!=self)o=OLgetRefById();if(o){if(o.onmouseover)o.onmouseover=null;if(OLscrollPI&&o==over)OLclearScroll();if(OLdraggablePI)OLclearDrag();if(OLfilterPI)OLcleanupFilter(o);if(OLshadowPI)OLhideShadow();var os=(OLns4)?o:o.style;os.visibility="hidden";if(OLhidePI&&o==over)OLhideUtil(0,0,1);if(OLiframePI)OLhideIfs(o);}}
function OLrepositionTo(o,xL,yL){o=(OLns4)?o:o.style;if(o.setAttribute){o.setAttribute('left',OLns4?xL:xL+'px');o.setAttribute('top',OLns4?yL:yL+'px');}else{o.left=(OLns4?xL:xL+'px');o.top=(OLns4?yL:yL+'px');}}
function OLoptMOUSEOFF(c){if(!c)o3_close="";over.onmouseover=function(){OLhover=1;if(OLtimerid>0){clearTimeout(OLtimerid);OLtimerid=0;}}}
function OLcursorOff(){var o=(OLns4?over:over.style),pHt=OLns4?over.clip.height:over.offsetHeight,left=parseInt(o.left),top=parseInt(o.top),right=left+o3_width,bottom=top+((OLbubblePI&&o3_bubble)?OLbubbleHt:pHt);if(OLx<left||OLx>right||OLy<top||OLy>bottom)return true;return false;}
function OLsetRunTimeVar(){if(OLrunTime.length)for(var k=0;k<OLrunTime.length;k++)OLrunTime[k]();}
function OLparseCmdLine(pf,i,ar){if(OLcmdLine.length){for(var k=0;k<OLcmdLine.length;k++){var j=OLcmdLine[k](pf,i,ar);if(j>-1){i=j;break;}}}
return i;}
function OLregCmds(c){if(typeof c!='string')return;var pM=c.split(',');pMtr=pMtr.concat(pM);for(var i=0;i<pM.length;i++)eval(pM[i].toUpperCase()+'='+pmCnt++);}
function OLregRunTimeFunc(f){if(typeof f=='object')OLrunTime=OLrunTime.concat(f);else OLrunTime[OLrunTime.length++]=f;}
function OLregCmdLineFunc(f){if(typeof f=='object')OLcmdLine=OLcmdLine.concat(f);else OLcmdLine[OLcmdLine.length++]=f;}
OLloaded=1;// End of File include/javascript/overlibmws.js
                                
/*
 Artistic License 2.0
 
 Copyright (c) 2000-2006, The Perl Foundation.
 
 Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed.
 Preamble
 
 This license establishes the terms under which a given free software Package may be copied, modified, distributed, and/or redistributed. The intent is that the Copyright Holder maintains some artistic control over the development of that Package while still keeping the Package available as open source and free software.
 
 You are always permitted to make arrangements wholly outside of this license directly with the Copyright Holder of a given Package. If the terms of this license do not permit the full use that you propose to make of the Package, you should contact the Copyright Holder and seek a different licensing arrangement.
 Definitions
 
 "Copyright Holder" means the individual(s) or organization(s) named in the copyright notice for the entire Package.
 
 "Contributor" means any party that has contributed code or other material to the Package, in accordance with the Copyright Holder's procedures.
 
 "You" and "your" means any person who would like to copy, distribute, or modify the Package.
 
 "Package" means the collection of files distributed by the Copyright Holder, and derivatives of that collection and/or of those files. A given Package may consist of either the Standard Version, or a Modified Version.
 
 "Distribute" means providing a copy of the Package or making it accessible to anyone else, or in the case of a company or organization, to others outside of your company or organization.
 
 "Distributor Fee" means any fee that you charge for Distributing this Package or providing support for this Package to another party. It does not mean licensing fees.
 
 "Standard Version" refers to the Package if it has not been modified, or has been modified only in ways explicitly requested by the Copyright Holder.
 
 "Modified Version" means the Package, if it has been changed, and such changes were not explicitly requested by the Copyright Holder.
 
 "Original License" means this Artistic License as Distributed with the Standard Version of the Package, in its current version or as it may be modified by The Perl Foundation in the future.
 
 "Source" form means the source code, documentation source, and configuration files for the Package.
 
 "Compiled" form means the compiled bytecode, object code, binary, or any other form resulting from mechanical transformation or translation of the Source form.
 Permission for Use and Modification Without Distribution
 
 (1) You are permitted to use the Standard Version and create and use Modified Versions for any purpose without restriction, provided that you do not Distribute the Modified Version.
 Permissions for Redistribution of the Standard Version
 
 (2) You may Distribute verbatim copies of the Source form of the Standard Version of this Package in any medium without restriction, either gratis or for a Distributor Fee, provided that you duplicate all of the original copyright notices and associated disclaimers. At your discretion, such verbatim copies may or may not include a Compiled form of the Package.
 
 (3) You may apply any bug fixes, portability changes, and other modifications made available from the Copyright Holder. The resulting Package will still be considered the Standard Version, and as such will be subject to the Original License.
 Distribution of Modified Versions of the Package as Source
 
 (4) You may Distribute your Modified Version as Source (either gratis or for a Distributor Fee, and with or without a Compiled form of the Modified Version) provided that you clearly document how it differs from the Standard Version, including, but not limited to, documenting any non-standard features, executables, or modules, and provided that you do at least ONE of the following:
 
 (a) make the Modified Version available to the Copyright Holder of the Standard Version, under the Original License, so that the Copyright Holder may include your modifications in the Standard Version.
 (b) ensure that installation of your Modified Version does not prevent the user installing or running the Standard Version. In addition, the Modified Version must bear a name that is different from the name of the Standard Version.
 (c) allow anyone who receives a copy of the Modified Version to make the Source form of the Modified Version available to others under
 (i) the Original License or
 (ii) a license that permits the licensee to freely copy, modify and redistribute the Modified Version using the same licensing terms that apply to the copy that the licensee received, and requires that the Source form of the Modified Version, and of any works derived from it, be made freely available in that license fees are prohibited but Distributor Fees are allowed.
 Distribution of Compiled Forms of the Standard Version or Modified Versions without the Source
 
 (5) You may Distribute Compiled forms of the Standard Version without the Source, provided that you include complete instructions on how to get the Source of the Standard Version. Such instructions must be valid at the time of your distribution. If these instructions, at any time while you are carrying out such distribution, become invalid, you must provide new instructions on demand or cease further distribution. If you provide valid instructions or cease distribution within thirty days after you become aware that the instructions are invalid, then you do not forfeit any of your rights under this license.
 
 (6) You may Distribute a Modified Version in Compiled form without the Source, provided that you comply with Section 4 with respect to the Source of the Modified Version.
 Aggregating or Linking the Package
 
 (7) You may aggregate the Package (either the Standard Version or Modified Version) with other packages and Distribute the resulting aggregation provided that you do not charge a licensing fee for the Package. Distributor Fees are permitted, and licensing fees for other components in the aggregation are permitted. The terms of this license apply to the use and Distribution of the Standard or Modified Versions as included in the aggregation.
 
 (8) You are permitted to link Modified and Standard Versions with other works, to embed the Package in a larger work of your own, or to build stand-alone binary or bytecode versions of applications that include the Package, and Distribute the result without restriction, provided the result does not expose a direct interface to the Package.
 Items That are Not Considered Part of a Modified Version
 
 (9) Works (including, but not limited to, modules and scripts) that merely extend or make use of the Package, do not, by themselves, cause the Package to be a Modified Version. In addition, such works are not considered parts of the Package itself, and are not subject to the terms of this license.
 General Provisions
 
 (10) Any use, modification, and distribution of the Standard or Modified Versions is governed by this Artistic License. By using, modifying or distributing the Package, you accept this license. Do not use, modify, or distribute the Package, if you do not accept this license.
 
 (11) If your Modified Version has been derived from a Modified Version made by someone other than you, you are nevertheless required to ensure that your Modified Version complies with the requirements of this license.
 
 (12) This license does not grant you the right to use any trademark, service mark, tradename, or logo of the Copyright Holder.
 
 (13) This license includes the non-exclusive, worldwide, free-of-charge patent license to make, have made, use, offer to sell, sell, import and otherwise transfer the Package with respect to any patent claims licensable by the Copyright Holder that are necessarily infringed by the Package. If you institute patent litigation (including a cross-claim or counterclaim) against any party alleging that the Package constitutes direct or contributory patent infringement, then this Artistic License to you shall terminate on the date that such litigation is filed.
 
 (14) Disclaimer of Warranty: THE PACKAGE IS PROVIDED BY THE COPYRIGHT HOLDER AND CONTRIBUTORS "AS IS' AND WITHOUT ANY EXPRESS OR IMPLIED WARRANTIES. THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT ARE DISCLAIMED TO THE EXTENT PERMITTED BY YOUR LOCAL LAW. UNLESS REQUIRED BY LAW, NO COPYRIGHT HOLDER OR CONTRIBUTOR WILL BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING IN ANY WAY OUT OF THE USE OF THE PACKAGE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
OLloaded=0;var OLifsP1=null,OLifsSh=null,OLifsP2=null;function OLinitIfs(){if(!OLie55)return;if((OLovertwoPI)&&over2&&over==over2){var o=o3_frame.document.all['overIframeOvertwo'];if(!o||OLifsP2!=o){OLifsP2=null;OLgetIfsP2Ref();}return;}
o=o3_frame.document.all['overIframe'];if(!o||OLifsP1!=o){OLifsP1=null;OLgetIfsRef();}
if((OLshadowPI)&&o3_shadow){o=o3_frame.document.all['overIframeShadow'];if(!o||OLifsSh!=o){OLifsSh=null;OLgetIfsShRef();}}}
function OLsetIfsRef(o,i,z){o.id=i;o.src='javascript:false;';o.scrolling='no';var os=o.style;os.position='absolute';os.top=0;os.left=0;os.width=1;os.height=1;os.visibility='hidden';os.zIndex=over.style.zIndex-z;os.filter='Alpha(style=0,opacity=0)';}
function OLgetIfsRef(){if(OLifsP1||!OLie55)return;OLifsP1=o3_frame.document.createElement('iframe');OLsetIfsRef(OLifsP1,'overIframe',2);o3_frame.document.body.appendChild(OLifsP1);}
function OLgetIfsShRef(){if(OLifsSh||!OLie55)return;OLifsSh=o3_frame.document.createElement('iframe');OLsetIfsRef(OLifsSh,'overIframeShadow',3);o3_frame.document.body.appendChild(OLifsSh);}
function OLgetIfsP2Ref(){if(OLifsP2||!OLie55)return;OLifsP2=o3_frame.document.createElement('iframe');OLsetIfsRef(OLifsP2,'overIframeOvertwo',1);o3_frame.document.body.appendChild(OLifsP2);}
function OLsetDispIfs(o,w,h){var os=o.style;os.width=w+'px';os.height=h+'px';os.clip='rect(0px '+w+'px '+h+'px 0px)';o.filters.alpha.enabled=true;}
function OLdispIfs(){if(!OLie55)return;var wd=over.offsetWidth,ht=over.offsetHeight;if(OLfilterPI&&o3_filter&&o3_filtershadow){wd+=5;ht+=5;}
if((OLovertwoPI)&&over2&&over==over2){if(!OLifsP2)return;OLsetDispIfs(OLifsP2,wd,ht);return;}
if(!OLifsP1)return;OLsetDispIfs(OLifsP1,wd,ht);if((!OLshadowPI)||!o3_shadow||!OLifsSh)return;OLsetDispIfs(OLifsSh,wd,ht);}
function OLshowIfs(){if(OLifsP1){OLifsP1.style.visibility="visible";if((OLshadowPI)&&o3_shadow&&OLifsSh)OLifsSh.style.visibility="visible";}}
function OLhideIfs(o){if(!OLie55||o!=over)return;if(OLifsP1)OLifsP1.style.visibility="hidden";if((OLshadowPI)&&o3_shadow&&OLifsSh)OLifsSh.style.visibility="hidden";}
function OLrepositionIfs(X,Y){if(OLie55){if((OLovertwoPI)&&over2&&over==over2){if(OLifsP2)OLrepositionTo(OLifsP2,X,Y);}
else{if(OLifsP1){OLrepositionTo(OLifsP1,X,Y);if((OLshadowPI)&&o3_shadow&&OLifsSh)
OLrepositionTo(OLifsSh,X+o3_shadowx,Y+o3_shadowy);}}}}
OLiframePI=1;OLloaded=1;// End of File include/javascript/overlibmws_iframe.js
                                
