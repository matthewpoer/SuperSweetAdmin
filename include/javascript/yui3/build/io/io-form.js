/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('io-form',function(Y){Y.mix(Y.io,{_serialize:function(c,s){var eUC=encodeURIComponent,data=[],useDf=c.useDisabled||false,item=0,id=(typeof c.id==='string')?c.id:c.id.getAttribute('id'),e,f,n,v,d,i,il,j,jl,o;if(!id){id=Y.guid('io:');c.id.setAttribute('id',id);}
f=Y.config.doc.getElementById(id);for(i=0,il=f.elements.length;i<il;++i){e=f.elements[i];d=e.disabled;n=e.name;if((useDf)?n:(n&&!d)){n=encodeURIComponent(n)+'=';v=encodeURIComponent(e.value);switch(e.type){case'select-one':if(e.selectedIndex>-1){o=e.options[e.selectedIndex];data[item++]=n+eUC((o.attributes.value&&o.attributes.value.specified)?o.value:o.text);}
break;case'select-multiple':if(e.selectedIndex>-1){for(j=e.selectedIndex,jl=e.options.length;j<jl;++j){o=e.options[j];if(o.selected){data[item++]=n+eUC((o.attributes.value&&o.attributes.value.specified)?o.value:o.text);}}}
break;case'radio':case'checkbox':if(e.checked){data[item++]=n+v;}
break;case'file':case undefined:case'reset':case'button':break;case'submit':default:data[item++]=n+v;}}}
return s?data.join('&')+"&"+s:data.join('&');}},true);},'3.0.0',{requires:['io-base','node-base','node-style']});