/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('dataschema-base',function(Y){var LANG=Y.Lang,SchemaBase={apply:function(schema,data){return data;},parse:function(value,field){if(field.parser){var parser=(LANG.isFunction(field.parser))?field.parser:Y.Parsers[field.parser+''];if(parser){value=parser.call(this,value);}
else{}}
return value;}};Y.namespace("DataSchema").Base=SchemaBase;Y.namespace("Parsers");},'3.0.0',{requires:['base']});YUI.add('dataschema-json',function(Y){var LANG=Y.Lang,SchemaJSON={getPath:function(locator){var path=null,keys=[],i=0;if(locator){locator=locator.replace(/\[(['"])(.*?)\1\]/g,function(x,$1,$2){keys[i]=$2;return'.@'+(i++);}).replace(/\[(\d+)\]/g,function(x,$1){keys[i]=parseInt($1,10)|0;return'.@'+(i++);}).replace(/^\./,'');if(!/[^\w\.\$@]/.test(locator)){path=locator.split('.');for(i=path.length-1;i>=0;--i){if(path[i].charAt(0)==='@'){path[i]=keys[parseInt(path[i].substr(1),10)];}}}
else{}}
return path;},getLocationValue:function(path,data){var i=0,len=path.length;for(;i<len;i++){if(!LANG.isUndefined(data[path[i]])){data=data[path[i]];}
else{data=undefined;break;}}
return data;},apply:function(schema,data){var data_in=data,data_out={results:[],meta:{}};if(!LANG.isObject(data)){try{data_in=Y.JSON.parse(data);}
catch(e){data_out.error=e;return data_out;}}
if(LANG.isObject(data_in)&&schema){if(!LANG.isUndefined(schema.resultListLocator)){data_out=SchemaJSON._parseResults(schema,data_in,data_out);}
if(!LANG.isUndefined(schema.metaFields)){data_out=SchemaJSON._parseMeta(schema.metaFields,data_in,data_out);}}
else{data_out.error=new Error("JSON schema parse failure");}
return data_out;},_parseResults:function(schema,json_in,data_out){var results=[],path,error;if(schema.resultListLocator){path=SchemaJSON.getPath(schema.resultListLocator);if(path){results=SchemaJSON.getLocationValue(path,json_in);if(results===undefined){data_out.results=[];error=new Error("JSON results retrieval failure");}
else{if(LANG.isArray(schema.resultFields)&&LANG.isArray(results)){data_out=SchemaJSON._getFieldValues(schema.resultFields,results,data_out);}
else{data_out.results=[];error=new Error("JSON Schema fields retrieval failure");}}}
else{error=new Error("JSON Schema results locator failure");}
if(error){data_out.error=error;}}
return data_out;},_getFieldValues:function(fields,array_in,data_out){var results=[],len=fields.length,i,j,field,key,path,parser,simplePaths=[],complexPaths=[],fieldParsers=[],result,record;for(i=0;i<len;i++){field=fields[i];key=field.key||field;path=SchemaJSON.getPath(key);if(path){if(path.length===1){simplePaths[simplePaths.length]={key:key,path:path[0]};}else{complexPaths[complexPaths.length]={key:key,path:path};}}else{}
parser=(LANG.isFunction(field.parser))?field.parser:Y.Parsers[field.parser+''];if(parser){fieldParsers[fieldParsers.length]={key:key,parser:parser};}}
for(i=array_in.length-1;i>=0;--i){record={};result=array_in[i];if(result){for(j=simplePaths.length-1;j>=0;--j){record[simplePaths[j].key]=Y.DataSchema.Base.parse((LANG.isUndefined(result[simplePaths[j].path])?result[j]:result[simplePaths[j].path]),simplePaths[j]);}
for(j=complexPaths.length-1;j>=0;--j){record[complexPaths[j].key]=Y.DataSchema.Base.parse((SchemaJSON.getLocationValue(complexPaths[j].path,result)),complexPaths[j]);}
for(j=fieldParsers.length-1;j>=0;--j){key=fieldParsers[j].key;record[key]=fieldParsers[j].parser(record[key]);if(LANG.isUndefined(record[key])){record[key]=null;}}
results[i]=record;}}
data_out.results=results;return data_out;},_parseMeta:function(metaFields,json_in,data_out){if(LANG.isObject(metaFields)){var key,path;for(key in metaFields){if(metaFields.hasOwnProperty(key)){path=SchemaJSON.getPath(metaFields[key]);if(path&&json_in){data_out.meta[key]=SchemaJSON.getLocationValue(path,json_in);}}}}
else{data_out.error=new Error("JSON meta data retrieval failure");}
return data_out;}};Y.DataSchema.JSON=Y.mix(SchemaJSON,Y.DataSchema.Base);},'3.0.0',{requires:['json','dataschema-base']});YUI.add('dataschema-xml',function(Y){var LANG=Y.Lang,SchemaXML={apply:function(schema,data){var xmldoc=data,data_out={results:[],meta:{}};if(xmldoc&&xmldoc.nodeType&&(xmldoc.nodeType===9||xmldoc.nodeType===1||xmldoc.nodeType===11)&&schema){data_out=SchemaXML._parseResults(schema,xmldoc,data_out);data_out=SchemaXML._parseMeta(schema.metaFields,xmldoc,data_out);}
else{data_out.error=new Error("XML schema parse failure");}
return data_out;},_getLocationValue:function(field,context){var locator=field.locator||field.key||field,xmldoc=context.ownerDocument||context,result,res,value=null;try{if(!LANG.isUndefined(xmldoc.evaluate)){result=xmldoc.evaluate(locator,context,xmldoc.createNSResolver(!context.ownerDocument?context.documentElement:context.ownerDocument.documentElement),0,null);while(res=result.iterateNext()){value=res.textContent;}}
else{xmldoc.setProperty("SelectionLanguage","XPath");result=context.selectNodes(locator)[0];value=result.value||result.text||null;}
return Y.DataSchema.Base.parse(value,field);}
catch(e){}},_parseMeta:function(metaFields,xmldoc_in,data_out){if(LANG.isObject(metaFields)){var key,xmldoc=xmldoc_in.ownerDocument||xmldoc_in;for(key in metaFields){if(metaFields.hasOwnProperty(key)){data_out.meta[key]=SchemaXML._getLocationValue(metaFields[key],xmldoc);}}}
return data_out;},_parseResults:function(schema,xmldoc_in,data_out){if(schema.resultListLocator&&LANG.isArray(schema.resultFields)){var nodeList=xmldoc_in.getElementsByTagName(schema.resultListLocator),fields=schema.resultFields,results=[],node,field,result,i,j;if(nodeList.length){for(i=nodeList.length-1;i>=0;i--){result={};node=nodeList[i];for(j=fields.length-1;j>=0;j--){field=fields[j];result[field.key||field]=SchemaXML._getLocationValue(field,node);}
results[i]=result;}
data_out.results=results;}
else{data_out.error=new Error("XML schema result nodes retrieval failure");}}
return data_out;}};Y.DataSchema.XML=Y.mix(SchemaXML,Y.DataSchema.Base);},'3.0.0',{requires:['dataschema-base']});YUI.add('dataschema-array',function(Y){var LANG=Y.Lang,SchemaArray={apply:function(schema,data){var data_in=data,data_out={results:[],meta:{}};if(LANG.isArray(data_in)){if(LANG.isArray(schema.resultFields)){data_out=SchemaArray._parseResults(schema.resultFields,data_in,data_out);}
else{data_out.results=data_in;}}
else{data_out.error=new Error("Array schema parse failure");}
return data_out;},_parseResults:function(fields,array_in,data_out){var results=[],result,item,type,field,key,value,i,j;for(i=array_in.length-1;i>-1;i--){result={};item=array_in[i];type=(LANG.isObject(item)&&!LANG.isFunction(item))?2:(LANG.isArray(item))?1:(LANG.isString(item))?0:-1;if(type>0){for(j=fields.length-1;j>-1;j--){field=fields[j];key=(!LANG.isUndefined(field.key))?field.key:field;value=(!LANG.isUndefined(item[key]))?item[key]:item[j];result[key]=Y.DataSchema.Base.parse(value,field);}}
else if(type===0){result=item;}
else{result=null;}
results[i]=result;}
data_out.results=results;return data_out;}};Y.DataSchema.Array=Y.mix(SchemaArray,Y.DataSchema.Base);},'3.0.0',{requires:['dataschema-base']});YUI.add('dataschema-text',function(Y){var LANG=Y.Lang,SchemaText={apply:function(schema,data){var data_in=data,data_out={results:[],meta:{}};if(LANG.isString(data_in)&&LANG.isString(schema.resultDelimiter)){data_out=SchemaText._parseResults(schema,data_in,data_out);}
else{data_out.error=new Error("Text schema parse failure");}
return data_out;},_parseResults:function(schema,text_in,data_out){var resultDelim=schema.resultDelimiter,results=[],results_in,fields_in,result,item,fields,field,key,value,i,j,tmpLength=text_in.length-resultDelim.length;if(text_in.substr(tmpLength)==resultDelim){text_in=text_in.substr(0,tmpLength);}
results_in=text_in.split(schema.resultDelimiter);for(i=results_in.length-1;i>-1;i--){result={};item=results_in[i];if(LANG.isString(schema.fieldDelimiter)){fields_in=item.split(schema.fieldDelimiter);if(LANG.isArray(schema.resultFields)){fields=schema.resultFields;for(j=fields.length-1;j>-1;j--){field=fields[j];key=(!LANG.isUndefined(field.key))?field.key:field;value=(!LANG.isUndefined(fields_in[key]))?fields_in[key]:fields_in[j];result[key]=Y.DataSchema.Base.parse(value,field);}}}
else{result=item;}
results[i]=result;}
data_out.results=results;return data_out;}};Y.DataSchema.Text=Y.mix(SchemaText,Y.DataSchema.Base);},'3.0.0',{requires:['dataschema-base']});YUI.add('dataschema',function(Y){},'3.0.0',{use:['dataschema-base','dataschema-json','dataschema-xml','dataschema-array','dataschema-text']});