/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('dd-ddm-base',function(Y){var DDMBase=function(){DDMBase.superclass.constructor.apply(this,arguments);};DDMBase.NAME='ddm';DDMBase.ATTRS={dragCursor:{value:'move'},clickPixelThresh:{value:3},clickTimeThresh:{value:1000},dragMode:{value:'point',setter:function(mode){this._setDragMode(mode);return mode;}}};Y.extend(DDMBase,Y.Base,{_active:null,_setDragMode:function(mode){if(mode===null){mode=Y.DD.DDM.get('dragMode');}
switch(mode){case 1:case'intersect':return 1;case 2:case'strict':return 2;case 0:case'point':return 0;}
return 0;},CSS_PREFIX:'yui-dd',_activateTargets:function(){},_drags:[],activeDrag:false,_regDrag:function(d){if(this.getDrag(d.get('node'))){return false;}
if(!this._active){this._setupListeners();}
this._drags.push(d);return true;},_unregDrag:function(d){var tmp=[];Y.each(this._drags,function(n,i){if(n!==d){tmp[tmp.length]=n;}});this._drags=tmp;},_setupListeners:function(){this._active=true;var doc=Y.get(document);doc.on('mousemove',Y.bind(this._move,this));doc.on('mouseup',Y.bind(this._end,this));},_start:function(){this.fire('ddm:start');this._startDrag();},_startDrag:function(){},_endDrag:function(){},_dropMove:function(){},_end:function(){if(this.activeDrag){this._endDrag();this.fire('ddm:end');this.activeDrag.end.call(this.activeDrag);this.activeDrag=null;}},stopDrag:function(){if(this.activeDrag){this._end();}
return this;},_move:function(ev){if(this.activeDrag){this.activeDrag._move.call(this.activeDrag,ev);this._dropMove();}},cssSizestoObject:function(gutter){var x=gutter.split(' ');switch(x.length){case 1:x[1]=x[2]=x[3]=x[0];break;case 2:x[2]=x[0];x[3]=x[1];break;case 3:x[3]=x[1];break;}
return{top:parseInt(x[0],10),right:parseInt(x[1],10),bottom:parseInt(x[2],10),left:parseInt(x[3],10)};},getDrag:function(node){var drag=false,n=Y.get(node);if(n instanceof Y.Node){Y.each(this._drags,function(v,k){if(n.compareTo(v.get('node'))){drag=v;}});}
return drag;}});Y.namespace('DD');Y.DD.DDM=new DDMBase();},'3.0.0',{requires:['node','base'],skinnable:false});