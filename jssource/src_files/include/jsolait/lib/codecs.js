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

/*
  Copyright (c) 2004 Jan-Klaas Kollhof
  
  This file is part of the JavaScript o lait library(jsolait).
  
  jsolait is free software; you can redistribute it and/or modify
  it under the terms of the GNU Lesser General Public License as published by
  the Free Software Foundation; either version 2.1 of the License, or
  (at your option) any later version.
 
  This software is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Lesser General Public License for more details.
 
  You should have received a copy of the GNU Lesser General Public License
  along with this software; if not, write to the Free Software
  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/


/**
    Codecs for encoding decoding Strings.
    To add new encoders simply create new String.prototype.encode_yourCodec methods.
    To add new decoders simply create new String.prototype.decode_yourCodec methods.
*/
Module("codecs", "0.1.2", function(mod){
    /**
        Returns all all available encoders.
        @return  An array of encoder names.
    */
    mod.listEncoders=function(){
        var c=[];
        for(var attr in String.prototype){
            if(attr.slice(0, 7) == "encode_"){
                c.push(attr.slice(7));
            }
        }
        return c;
    }
    /**
        Returns all all available decoders.
        @return  An array of decoder names.
    */
    mod.listDecoders=function(){
        var c=[];
        for(var attr in String.prototype){
            if(attr.slice(0, 7) == "decode_"){
                c.push(attr.slice(7));
            }
        }
        return c;
    }
    
    /**
        Decodes an encoded string.
        Parameters but the codec parameter are forwardet to the codec.
        @param codec  The codec to use.
    */
    String.prototype.decode = function(codec){
        var n ="decode_" + codec;
        if(String.prototype[n]){
            var args=[];
            for(var i=1;i<arguments.length;i++){
                args[i-1] = arguments[i];
            }
            return String.prototype[n].apply(this, args);
        }else{
            throw new mod.Exception("Decoder '%s' not found.".format(codec));
        }
    }
    
    /**
        Encodes a string.
        Parameters but the codec parameter are forwardet to the codec.
        @param codec  The codec to use.
    */
    String.prototype.encode = function(codec){
        var n ="encode_" + codec;
        if(String.prototype[n]){
            var args=[];
            for(var i=1;i<arguments.length;i++){
                args[i-1] = arguments[i];
            }
            return String.prototype[n].apply(this, args);
        }else{
            throw new mod.Exception("Ecnoder '%s' not found.".format(codec));
        }
    }
    
    /**
        Decodes a Base64 encoded string to a byte string.
    */
    String.prototype.decode_base64=function(){
         if((this.length % 4) == 0){
             if(typeof(atob) != "undefined"){//try using mozillas builtin codec
                 return atob(this);
             }else{
                 var nBits;
                 //create a result buffer, this is much faster than having strings concatinated.
                 var sDecoded = new Array(this.length /4);
                 var base64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
                 for(var i=0; i < this.length; i+=4){
                     nBits = (base64.indexOf(this.charAt(i))   & 0xff) << 18 |
                                (base64.indexOf(this.charAt(i+1)) & 0xff) << 12 |
                                (base64.indexOf(this.charAt(i+2)) & 0xff) <<  6 |
                                base64.indexOf(this.charAt(i+3)) & 0xff;
                    sDecoded[i] = String.fromCharCode((nBits & 0xff0000) >> 16, (nBits & 0xff00) >> 8, nBits & 0xff);
                }
                //make sure padding chars are left out.
                sDecoded[sDecoded.length-1] = sDecoded[sDecoded.length-1].substring(0, 3 - ((this.charCodeAt(i - 2) == 61) ? 2 : (this.charCodeAt(i - 1) == 61 ? 1 : 0)));
                return sDecoded.join("");
             }
         }else{
             throw new mod.Exception("String length must be divisible by 4.");
         }
    }
    
    /**
        Encodes a string using Base64.
    */
    String.prototype.encode_base64=function(){
        if(typeof(btoa) != "undefined"){//try using mozillas builtin codec
            return btoa(this);
        }else{
            var base64 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
                                'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                                '0','1','2','3','4','5','6','7','8','9','+','/'];
            var sbin;
            var pad=0;
            var s="" + this;
            if((s.length % 3) == 1){
                s+=String.fromCharCode(0);
                s+=String.fromCharCode(0);
                pad=2;
            }else if((s.length % 3) == 2){
                s+=String.fromCharCode(0);
                pad=1;
            }
            //create a result buffer, this is much faster than having strings concatinated.
            var rslt=new Array(s.length / 3);
            var ri=0;
            for(var i=0;i<s.length; i+=3){
                sbin=((s.charCodeAt(i) & 0xff) << 16) | ((s.charCodeAt(i+1) & 0xff ) << 8) | (s.charCodeAt(i+2) & 0xff);    
                rslt[ri] = (base64[(sbin >> 18) & 0x3f] + base64[(sbin >> 12) & 0x3f] + base64[(sbin >>6) & 0x3f] + base64[sbin & 0x3f]);
                ri++;
            }
            if(pad>0){
                rslt[rslt.length-1] = rslt[rslt.length-1].substr(0, 4-pad) +  ((pad==2) ? "==" : (pad==1) ? "=" : "");
            }
            return rslt.join("");
        }
    }

    /**
        Decodes a URI using decodeURI.
    */
    String.prototype.decode_uri=function(){
        return decodeURI(this);
    }
    
    /**
        Encodes a URI using encodeURI.
    */
    String.prototype.encode_uri=function(){
        return encodeURI(this);
    }
})
