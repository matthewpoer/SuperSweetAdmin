/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('dd-constrain',function(Y){var DRAG_NODE='dragNode',OFFSET_HEIGHT='offsetHeight',OFFSET_WIDTH='offsetWidth',HOST='host',CON_2_REGION='constrain2region',CON_2_NODE='constrain2node',TICK_X_ARRAY='tickXArray',TICK_Y_ARRAY='tickYArray',DDM=Y.DD.DDM,TOP='top',RIGHT='right',BOTTOM='bottom',LEFT='left',proto=null;var C=function(config){C.superclass.constructor.apply(this,arguments);};C.NAME='DragConstrained';C.NS='con';C.ATTRS={host:{},stickX:{value:false},stickY:{value:false},tickX:{value:false},tickY:{value:false},tickXArray:{value:false},tickYArray:{value:false},constrain2region:{value:false,getter:function(r){if(Y.Lang.isObject(r)){var o={};Y.mix(o,r);return o;}else{return false;}},setter:function(r){if(Y.Lang.isObject(r)){if(Y.Lang.isNumber(r[TOP])&&Y.Lang.isNumber(r[RIGHT])&&Y.Lang.isNumber(r[LEFT])&&Y.Lang.isNumber(r[BOTTOM])){var o={};Y.mix(o,r);return o;}else{return false;}}else if(r!==false){return false;}
return r;}},gutter:{value:'0',setter:function(gutter){return Y.DD.DDM.cssSizestoObject(gutter);}},constrain2node:{value:false,setter:function(n){if(!this.get(CON_2_REGION)){var node=Y.Node.get(n);if(node){return node;}}else if(this.get(CON_2_REGION)!==false){}
return false;}},constrain2view:{value:false}};proto={initializer:function(){this.get(HOST).on('drag:start',Y.bind(this._handleStart,this));this.get(HOST).after('drag:align',Y.bind(this.align,this));},_handleStart:function(){this._regionCache=null;},_regionCache:null,_cacheRegion:function(){this._regionCache=this.get(CON_2_NODE).get('region');},getRegion:function(inc){var r={},oh=null,ow=null,g=this.get('gutter'),host=this.get(HOST);if(this.get(CON_2_NODE)){if(!this._regionCache){Y.on('resize',Y.bind(this._cacheRegion,this),window);this._cacheRegion();}
r=Y.clone(this._regionCache);}else if(this.get(CON_2_REGION)){r=this.get(CON_2_REGION);}else if(this.get('constrain2view')){r=host.get(DRAG_NODE).get('viewportRegion');}else{return false;}
Y.each(g,function(i,n){if((n==RIGHT)||(n==BOTTOM)){r[n]-=i;}else{r[n]+=i;}});if(inc){oh=host.get(DRAG_NODE).get(OFFSET_HEIGHT);ow=host.get(DRAG_NODE).get(OFFSET_WIDTH);r[RIGHT]=r[RIGHT]-ow;r[BOTTOM]=r[BOTTOM]-oh;}
return r;},_checkRegion:function(_xy){var oxy=_xy,r=this.getRegion(),host=this.get(HOST),oh=host.get(DRAG_NODE).get(OFFSET_HEIGHT),ow=host.get(DRAG_NODE).get(OFFSET_WIDTH);if(oxy[1]>(r[BOTTOM]-oh)){_xy[1]=(r[BOTTOM]-oh);}
if(r[TOP]>oxy[1]){_xy[1]=r[TOP];}
if(oxy[0]>(r[RIGHT]-ow)){_xy[0]=(r[RIGHT]-ow);}
if(r[LEFT]>oxy[0]){_xy[0]=r[LEFT];}
return _xy;},inRegion:function(xy){xy=xy||this.get(HOST).get(DRAG_NODE).getXY();var _xy=this._checkRegion([xy[0],xy[1]]),inside=false;if((xy[0]===_xy[0])&&(xy[1]===_xy[1])){inside=true;}
return inside;},align:function(){var host=this.get(HOST),_xy=host.actXY,r=this.getRegion(true);if(this.get('stickX')){_xy[1]=(host.startXY[1]-host.deltaXY[1]);}
if(this.get('stickY')){_xy[0]=(host.startXY[0]-host.deltaXY[0]);}
if(r){_xy=this._checkRegion(_xy);}
_xy=this._checkTicks(_xy,r);host.actXY=_xy;},_checkTicks:function(xy,r){var host=this.get(HOST),lx=(host.startXY[0]-host.deltaXY[0]),ly=(host.startXY[1]-host.deltaXY[1]),xt=this.get('tickX'),yt=this.get('tickY');if(xt&&!this.get(TICK_X_ARRAY)){xy[0]=DDM._calcTicks(xy[0],lx,xt,r[LEFT],r[RIGHT]);}
if(yt&&!this.get(TICK_Y_ARRAY)){xy[1]=DDM._calcTicks(xy[1],ly,yt,r[TOP],r[BOTTOM]);}
if(this.get(TICK_X_ARRAY)){xy[0]=DDM._calcTickArray(xy[0],this.get(TICK_X_ARRAY),r[LEFT],r[RIGHT]);}
if(this.get(TICK_Y_ARRAY)){xy[1]=DDM._calcTickArray(xy[1],this.get(TICK_Y_ARRAY),r[TOP],r[BOTTOM]);}
return xy;}};Y.namespace('Plugin');Y.extend(C,Y.Base,proto);Y.Plugin.DDConstrained=C;Y.mix(DDM,{_calcTicks:function(pos,start,tick,off1,off2){var ix=((pos-start)/tick),min=Math.floor(ix),max=Math.ceil(ix);if((min!==0)||(max!==0)){if((ix>=min)&&(ix<=max)){pos=(start+(tick*min));if(off1&&off2){if(pos<off1){pos=(start+(tick*(min+1)));}
if(pos>off2){pos=(start+(tick*(min-1)));}}}}
return pos;},_calcTickArray:function(pos,ticks,off1,off2){var i=0,len=ticks.length,next=0,diff1,diff2,ret;if(!ticks||(ticks.length===0)){return pos;}else if(ticks[0]>=pos){return ticks[0];}else{for(i=0;i<len;i++){next=(i+1);if(ticks[next]&&ticks[next]>=pos){diff1=pos-ticks[i];diff2=ticks[next]-pos;ret=(diff2>diff1)?ticks[i]:ticks[next];if(off1&&off2){if(ret>off2){if(ticks[i]){ret=ticks[i];}else{ret=ticks[len-1];}}}
return ret;}}
return ticks[ticks.length-1];}}});},'3.0.0',{requires:['dd-drag'],skinnable:false});