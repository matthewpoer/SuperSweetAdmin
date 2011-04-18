/*
 
 Modification information for LGPL compliance
 
 r56990 - 2010-06-16 13:05:36 -0700 (Wed, 16 Jun 2010) - kjing - snapshot "Mango" svn branch to a new one for GitHub sync
 
 r56989 - 2010-06-16 13:01:33 -0700 (Wed, 16 Jun 2010) - kjing - defunt "Mango" svn dev branch before github cutover
 
 r55980 - 2010-04-19 13:31:28 -0700 (Mon, 19 Apr 2010) - kjing - create Mango (6.1) based on windex
 
 r51719 - 2009-10-22 10:18:00 -0700 (Thu, 22 Oct 2009) - mitani - Converted to Build 3  tags and updated the build system
 
 r51634 - 2009-10-19 13:32:22 -0700 (Mon, 19 Oct 2009) - mitani - Windex is the branch for Sugar Sales 1.0 development
 
 r50375 - 2009-08-24 18:07:43 -0700 (Mon, 24 Aug 2009) - dwong - branch kobe2 from tokyo r50372
 
 r42807 - 2008-12-29 11:16:59 -0800 (Mon, 29 Dec 2008) - dwong - Branch from trunk/sugarcrm r42806 to branches/tokyo/sugarcrm
 
 r4085 - 2005-04-13 17:30:42 -0700 (Wed, 13 Apr 2005) - robert - adding meeting scheduler and accept/decline
 
 
 */
Module("crypto","0.1.2",function(mod){mod.listEncrypters=function(){var c=[];for(var attr in String.prototype){if(attr.slice(0,8)=="encrypt_"){c.push(attr.slice(8));}}
return c;}
mod.listDecrypters=function(){var c=[];for(var attr in String.prototype){if(attr.slice(0,8)=="decrypt_"){c.push(attr.slice(8));}}
return c;}
String.prototype.encrypt=function(crydec){var n="encrypt_"+crydec;if(String.prototype[n]){var args=[];for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}
return String.prototype[n].apply(this,args);}else{throw new mod.Exception("Decrypter '%s' not found.".format(crydec));}}
String.prototype.decrypt=function(crydec){var n="decrypt_"+crydec;if(String.prototype[n]){var args=[];for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}
return String.prototype[n].apply(this,args);}else{throw new mod.Exception("Encrypter '%s' not found.".format(crydec));}}
String.prototype.encrypt_xor=function(key){var e=new Array(this.length);var l=key.length;for(var i=0;i<this.length;i++){e[i]=String.fromCharCode(this.charCodeAt(i)^key.charCodeAt(i%l));}
return e.join("");}
String.prototype.decrypt_xor=String.prototype.encrypt_xor;String.prototype.encrypt_rc4=function(key){var sbox=new Array(256);for(var i=0;i<256;i++){sbox[i]=i;}
var j=0;for(var i=0;i<256;i++){j=(j+sbox[i]+key.charCodeAt(i%key.length))%256;var tmp=sbox[i];sbox[i]=sbox[j];sbox[j]=tmp;}
var i=256;var j=256;var rslt=new Array(this.length);for(var k=0;k<this.length;k++){i=(i+1)%256;j=(j+sbox[i])%256;var tmp=sbox[i];sbox[i]=sbox[j];sbox[j]=tmp;t=(sbox[i]+sbox[j])%256;rslt[k]=String.fromCharCode(this.charCodeAt(k)^sbox[t]);}
return rslt.join("");}
String.prototype.decrypt_rc4=String.prototype.encrypt_rc4;})