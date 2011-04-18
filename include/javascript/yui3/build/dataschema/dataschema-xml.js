/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('dataschema-xml',function(Y){var LANG=Y.Lang,SchemaXML={apply:function(schema,data){var xmldoc=data,data_out={results:[],meta:{}};if(xmldoc&&xmldoc.nodeType&&(xmldoc.nodeType===9||xmldoc.nodeType===1||xmldoc.nodeType===11)&&schema){data_out=SchemaXML._parseResults(schema,xmldoc,data_out);data_out=SchemaXML._parseMeta(schema.metaFields,xmldoc,data_out);}
else{data_out.error=new Error("XML schema parse failure");}
return data_out;},_getLocationValue:function(field,context){var locator=field.locator||field.key||field,xmldoc=context.ownerDocument||context,result,res,value=null;try{if(!LANG.isUndefined(xmldoc.evaluate)){result=xmldoc.evaluate(locator,context,xmldoc.createNSResolver(!context.ownerDocument?context.documentElement:context.ownerDocument.documentElement),0,null);while(res=result.iterateNext()){value=res.textContent;}}
else{xmldoc.setProperty("SelectionLanguage","XPath");result=context.selectNodes(locator)[0];value=result.value||result.text||null;}
return Y.DataSchema.Base.parse(value,field);}
catch(e){}},_parseMeta:function(metaFields,xmldoc_in,data_out){if(LANG.isObject(metaFields)){var key,xmldoc=xmldoc_in.ownerDocument||xmldoc_in;for(key in metaFields){if(metaFields.hasOwnProperty(key)){data_out.meta[key]=SchemaXML._getLocationValue(metaFields[key],xmldoc);}}}
return data_out;},_parseResults:function(schema,xmldoc_in,data_out){if(schema.resultListLocator&&LANG.isArray(schema.resultFields)){var nodeList=xmldoc_in.getElementsByTagName(schema.resultListLocator),fields=schema.resultFields,results=[],node,field,result,i,j;if(nodeList.length){for(i=nodeList.length-1;i>=0;i--){result={};node=nodeList[i];for(j=fields.length-1;j>=0;j--){field=fields[j];result[field.key||field]=SchemaXML._getLocationValue(field,node);}
results[i]=result;}
data_out.results=results;}
else{data_out.error=new Error("XML schema result nodes retrieval failure");}}
return data_out;}};Y.DataSchema.XML=Y.mix(SchemaXML,Y.DataSchema.Base);},'3.0.0',{requires:['dataschema-base']});