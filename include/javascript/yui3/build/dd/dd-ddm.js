/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('dd-ddm',function(Y){Y.mix(Y.DD.DDM,{_pg:null,_debugShim:false,_activateTargets:function(){},_deactivateTargets:function(){},_startDrag:function(){if(this.activeDrag.get('useShim')){this._pg_activate();this._activateTargets();}},_endDrag:function(){this._pg_deactivate();this._deactivateTargets();},_pg_deactivate:function(){this._pg.setStyle('display','none');},_pg_activate:function(){var ah=this.activeDrag.get('activeHandle'),cur='auto';if(ah){cur=ah.getStyle('cursor');}
if(cur=='auto'){cur=this.get('dragCursor');}
this._pg_size();this._pg.setStyles({top:0,left:0,display:'block',opacity:((this._debugShim)?'.5':'0'),cursor:cur});},_pg_size:function(){if(this.activeDrag){var b=Y.get('body'),h=b.get('docHeight'),w=b.get('docWidth');this._pg.setStyles({height:h+'px',width:w+'px'});}},_createPG:function(){var pg=Y.Node.create('<div></div>'),bd=Y.get('body');pg.setStyles({top:'0',left:'0',position:'absolute',zIndex:'9999',overflow:'hidden',backgroundColor:'red',display:'none',height:'5px',width:'5px'});pg.set('id',Y.stamp(pg));pg.addClass('yui-dd-shim');if(bd.get('firstChild')){bd.insertBefore(pg,bd.get('firstChild'));}else{bd.appendChild(pg);}
this._pg=pg;this._pg.on('mouseup',Y.bind(this._end,this));this._pg.on('mousemove',Y.bind(this._move,this));var win=Y.get(window);Y.on('window:resize',Y.bind(this._pg_size,this));win.on('scroll',Y.bind(this._pg_size,this));}},true);Y.on('domready',Y.bind(Y.DD.DDM._createPG,Y.DD.DDM));},'3.0.0',{requires:['dd-ddm-base','event-resize'],skinnable:false});