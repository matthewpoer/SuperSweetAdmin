/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('classnamemanager',function(Y){var CLASS_NAME_PREFIX='classNamePrefix',CLASS_NAME_DELIMITER='classNameDelimiter',CONFIG=Y.config;CONFIG[CLASS_NAME_PREFIX]=CONFIG[CLASS_NAME_PREFIX]||'yui';CONFIG[CLASS_NAME_DELIMITER]=CONFIG[CLASS_NAME_DELIMITER]||'-';Y.ClassNameManager=function(){var sPrefix=CONFIG[CLASS_NAME_PREFIX],sDelimiter=CONFIG[CLASS_NAME_DELIMITER];return{getClassName:Y.cached(function(c,x){var sClass=sPrefix+sDelimiter+
((x)?Array.prototype.join.call(arguments,sDelimiter):c);return sClass.replace(/\s/g,'');})};}();},'3.0.0');