/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('event-focus',function(Y){(function(){var UA=Y.UA,Event=Y.Event,plugins=Y.Env.evt.plugins,ie=UA.ie,bUseMutation=(UA.opera||UA.webkit),eventNames={focus:(ie?'focusin':(bUseMutation?'DOMFocusIn':'focus')),blur:(ie?'focusout':(bUseMutation?'DOMFocusOut':'blur'))},CAPTURE_CONFIG={capture:(UA.gecko?true:false)},attach=function(args,config){var a=Y.Array(args,0,true);a[0]=eventNames[a[0]];return Event._attach(a,config);},eventAdapter={on:function(){return attach(arguments,CAPTURE_CONFIG);}};Event._attachFocus=attach;Event._attachBlur=attach;plugins.focus=eventAdapter;plugins.blur=eventAdapter;})();},'3.0.0',{requires:['node-base']});