/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('anim-easing',function(Y){Y.Easing={easeNone:function(t,b,c,d){return c*t/d+b;},easeIn:function(t,b,c,d){return c*(t/=d)*t+b;},easeOut:function(t,b,c,d){return-c*(t/=d)*(t-2)+b;},easeBoth:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b;}
return-c/2*((--t)*(t-2)-1)+b;},easeInStrong:function(t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutStrong:function(t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;},easeBothStrong:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t+b;}
return-c/2*((t-=2)*t*t*t-2)+b;},elasticIn:function(t,b,c,d,a,p){var s;if(t===0){return b;}
if((t/=d)===1){return b+c;}
if(!p){p=d*0.3;}
if(!a||a<Math.abs(c)){a=c;s=p/4;}
else{s=p/(2*Math.PI)*Math.asin(c/a);}
return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},elasticOut:function(t,b,c,d,a,p){var s;if(t===0){return b;}
if((t/=d)===1){return b+c;}
if(!p){p=d*0.3;}
if(!a||a<Math.abs(c)){a=c;s=p/4;}
else{s=p/(2*Math.PI)*Math.asin(c/a);}
return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},elasticBoth:function(t,b,c,d,a,p){var s;if(t===0){return b;}
if((t/=d/2)===2){return b+c;}
if(!p){p=d*(0.3*1.5);}
if(!a||a<Math.abs(c)){a=c;s=p/4;}
else{s=p/(2*Math.PI)*Math.asin(c/a);}
if(t<1){return-0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;}
return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b;},backIn:function(t,b,c,d,s){if(s===undefined){s=1.70158;}
if(t===d){t-=0.001;}
return c*(t/=d)*t*((s+1)*t-s)+b;},backOut:function(t,b,c,d,s){if(typeof s==='undefined'){s=1.70158;}
return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},backBoth:function(t,b,c,d,s){if(typeof s==='undefined'){s=1.70158;}
if((t/=d/2)<1){return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;}
return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},bounceIn:function(t,b,c,d){return c-Y.Easing.bounceOut(d-t,0,c,d)+b;},bounceOut:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b;}
return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b;},bounceBoth:function(t,b,c,d){if(t<d/2){return Y.Easing.bounceIn(t*2,0,c,d)*0.5+b;}
return Y.Easing.bounceOut(t*2-d,0,c,d)*0.5+c*0.5+b;}};},'3.0.0',{requires:['anim-base']});