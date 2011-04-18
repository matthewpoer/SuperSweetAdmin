/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('stylesheet',function(Y){var d=Y.config.doc,p=d.createElement('p'),workerStyle=p.style,isString=Y.Lang.isString,selectors={},sheets={},floatAttr=('cssFloat'in workerStyle)?'cssFloat':'styleFloat',_toCssText,_unsetOpacity,_unsetProperty,OPACITY='opacity',FLOAT='float',EMPTY='';_unsetOpacity=(OPACITY in workerStyle)?function(style){style.opacity=EMPTY;}:function(style){style.filter=EMPTY;};workerStyle.border="1px solid red";workerStyle.border=EMPTY;_unsetProperty=workerStyle.borderLeft?function(style,prop){var p;if(prop!==floatAttr&&prop.toLowerCase().indexOf(FLOAT)!=-1){prop=floatAttr;}
if(isString(style[prop])){switch(prop){case OPACITY:case'filter':_unsetOpacity(style);break;case'font':style.font=style.fontStyle=style.fontVariant=style.fontWeight=style.fontSize=style.lineHeight=style.fontFamily=EMPTY;break;default:for(p in style){if(p.indexOf(prop)===0){style[p]=EMPTY;}}}}}:function(style,prop){if(prop!==floatAttr&&prop.toLowerCase().indexOf(FLOAT)!=-1){prop=floatAttr;}
if(isString(style[prop])){if(prop===OPACITY){_unsetOpacity(style);}else{style[prop]=EMPTY;}}};function StyleSheet(seed,name){var head,node,sheet,cssRules={},_rules,_insertRule,_deleteRule,i,r,sel;if(!(this instanceof StyleSheet)){return new StyleSheet(seed,name);}
if(seed){if(Y.Node&&seed instanceof Y.Node){node=Y.Node.getDOMNode(seed);}else if(seed.nodeName){node=seed;}else if(isString(seed)){if(seed&&sheets[seed]){return sheets[seed];}
node=d.getElementById(seed.replace(/^#/,EMPTY));}
if(node&&sheets[Y.stamp(node)]){return sheets[Y.stamp(node)];}}
if(!node||!/^(?:style|link)$/i.test(node.nodeName)){node=d.createElement('style');node.type='text/css';}
if(isString(seed)){if(seed.indexOf('{')!=-1){if(node.styleSheet){node.styleSheet.cssText=seed;}else{node.appendChild(d.createTextNode(seed));}}else if(!name){name=seed;}}
if(!node.parentNode||node.parentNode.nodeName.toLowerCase()!=='head'){head=(node.ownerDocument||d).getElementsByTagName('head')[0];head.appendChild(node);}
sheet=node.sheet||node.styleSheet;_rules=sheet&&('cssRules'in sheet)?'cssRules':'rules';_deleteRule=('deleteRule'in sheet)?function(i){sheet.deleteRule(i);}:function(i){sheet.removeRule(i);};_insertRule=('insertRule'in sheet)?function(sel,css,i){sheet.insertRule(sel+' {'+css+'}',i);}:function(sel,css,i){sheet.addRule(sel,css,i);};for(i=sheet[_rules].length-1;i>=0;--i){r=sheet[_rules][i];sel=r.selectorText;if(cssRules[sel]){cssRules[sel].style.cssText+=';'+r.style.cssText;_deleteRule(i);}else{cssRules[sel]=r;}}
StyleSheet.register(Y.stamp(node),this);if(name){StyleSheet.register(name,this);}
Y.mix(this,{getId:function(){return Y.stamp(node);},enable:function(){sheet.disabled=false;return this;},disable:function(){sheet.disabled=true;return this;},isEnabled:function(){return!sheet.disabled;},set:function(sel,css){var rule=cssRules[sel],multi=sel.split(/\s*,\s*/),i,idx;if(multi.length>1){for(i=multi.length-1;i>=0;--i){this.set(multi[i],css);}
return this;}
if(!StyleSheet.isValidSelector(sel)){return this;}
if(rule){rule.style.cssText=StyleSheet.toCssText(css,rule.style.cssText);}else{idx=sheet[_rules].length;css=StyleSheet.toCssText(css);if(css){_insertRule(sel,css,idx);cssRules[sel]=sheet[_rules][idx];}}
return this;},unset:function(sel,css){var rule=cssRules[sel],multi=sel.split(/\s*,\s*/),remove=!css,rules,i;if(multi.length>1){for(i=multi.length-1;i>=0;--i){this.unset(multi[i],css);}
return this;}
if(rule){if(!remove){css=Y.Array(css);workerStyle.cssText=rule.style.cssText;for(i=css.length-1;i>=0;--i){_unsetProperty(workerStyle,css[i]);}
if(workerStyle.cssText){rule.style.cssText=workerStyle.cssText;}else{remove=true;}}
if(remove){rules=sheet[_rules];for(i=rules.length-1;i>=0;--i){if(rules[i]===rule){delete cssRules[sel];_deleteRule(i);break;}}}}
return this;},getCssText:function(sel){var rule,css;if(isString(sel)){rule=cssRules[sel.split(/\s*,\s*/)[0]];return rule?rule.style.cssText:null;}else{css=[];for(sel in cssRules){if(cssRules.hasOwnProperty(sel)){rule=cssRules[sel];css.push(rule.selectorText+" {"+rule.style.cssText+"}");}}
return css.join("\n");}}});}
_toCssText=function(css,base){var f=css.styleFloat||css.cssFloat||css[FLOAT],trim=Y.Lang.trim,prop;workerStyle.cssText=base||EMPTY;if(f&&!css[floatAttr]){css=Y.merge(css);delete css.styleFloat;delete css.cssFloat;delete css[FLOAT];css[floatAttr]=f;}
for(prop in css){if(css.hasOwnProperty(prop)){try{workerStyle[prop]=trim(css[prop]);}
catch(e){}}}
return workerStyle.cssText;};Y.mix(StyleSheet,{toCssText:((OPACITY in workerStyle)?_toCssText:function(css,cssText){if(OPACITY in css){css=Y.merge(css,{filter:'alpha(opacity='+(css.opacity*100)+')'});delete css.opacity;}
return _toCssText(css,cssText);}),register:function(name,sheet){return!!(name&&sheet instanceof StyleSheet&&!sheets[name]&&(sheets[name]=sheet));},isValidSelector:function(sel){var valid=false;if(sel&&isString(sel)){if(!selectors.hasOwnProperty(sel)){selectors[sel]=!/\S/.test(sel.replace(/\s+|\s*[+~>]\s*/g,' ').replace(/([^ ])\[.*?\]/g,'$1').replace(/([^ ])::?[a-z][a-z\-]+[a-z](?:\(.*?\))?/ig,'$1').replace(/(?:^| )[a-z0-6]+/ig,' ').replace(/\\./g,EMPTY).replace(/[.#]\w[\w\-]*/g,EMPTY));}
valid=selectors[sel];}
return valid;}},true);Y.StyleSheet=StyleSheet;},'3.0.0');