/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('dd-proxy',function(Y){var DDM=Y.DD.DDM,NODE='node',DRAG_NODE='dragNode',HOST='host',TRUE=true;var P=function(config){P.superclass.constructor.apply(this,arguments);};P.NAME='DDProxy';P.NS='proxy';P.ATTRS={host:{},moveOnEnd:{value:TRUE},hideOnEnd:{value:TRUE},resizeFrame:{value:TRUE},positionProxy:{value:TRUE},borderStyle:{value:'1px solid #808080'}};var proto={_hands:null,_init:function(){if(!DDM._proxy){Y.on('domready',Y.bind(this._init,this));return;}
if(!this._hands){this._hands=[];}
var i,h,h1,host=this.get(HOST),dnode=host.get(DRAG_NODE);if(dnode.compareTo(host.get(NODE))){if(DDM._proxy){host.set(DRAG_NODE,DDM._proxy);}}
Y.each(this._hands,function(v){v.detach();});h=DDM.on('ddm:start',Y.bind(function(){if(DDM.activeDrag===host){DDM._setFrame(host);}},this));h1=DDM.on('ddm:end',Y.bind(function(){if(host.get('dragging')){if(this.get('moveOnEnd')){host.get(NODE).setXY(host.lastXY);}
if(this.get('hideOnEnd')){host.get(DRAG_NODE).setStyle('display','none');}}},this));this._hands=[h,h1];},initializer:function(){this._init();},destructor:function(){var host=this.get(HOST);Y.each(this._hands,function(v){v.detach();});host.set(DRAG_NODE,host.get(NODE));}};Y.namespace('Plugin');Y.extend(P,Y.Base,proto);Y.Plugin.DDProxy=P;Y.mix(DDM,{_createFrame:function(){if(!DDM._proxy){DDM._proxy=TRUE;var p=Y.Node.create('<div></div>'),b=Y.Node.get('body');p.setStyles({position:'absolute',display:'none',zIndex:'999',top:'-999px',left:'-999px'});b.insertBefore(p,b.get('firstChild'));p.set('id',Y.stamp(p));p.addClass(DDM.CSS_PREFIX+'-proxy');DDM._proxy=p;}},_setFrame:function(drag){var n=drag.get(NODE),d=drag.get(DRAG_NODE),ah,cur='auto';if(drag.proxy.get('resizeFrame')){DDM._proxy.setStyles({height:n.get('offsetHeight')+'px',width:n.get('offsetWidth')+'px'});}
ah=DDM.activeDrag.get('activeHandle');if(ah){cur=ah.getStyle('cursor');}
if(cur=='auto'){cur=DDM.get('dragCursor');}
d.setStyles({visibility:'hidden',display:'block',cursor:cur,border:drag.proxy.get('borderStyle')});if(drag.proxy.get('positionProxy')){d.setXY(drag.nodeXY);}
d.setStyle('visibility','visible');}});Y.on('domready',Y.bind(DDM._createFrame,DDM));},'3.0.0',{requires:['dd-ddm','dd-drag'],skinnable:false});