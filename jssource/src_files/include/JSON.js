/*
Copyright (c) 2005 JSON.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The Software shall be used for Good, not Evil.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

    json.js

    The global object JSON contains two methods.

    JSON.stringify(value) takes a JavaScript value and produces a JSON text.
    The value must not be cyclical.

    JSON.parse(text) takes a JSON text and produces a JavaScript value. It will
    return false if there is an error.

2008-10-10: New regular expressions copied in from the new json2.js file on http://json.org (released into the public domain), work better on Safari and IE for more complicated datasets
*/
var JSON = function () {
    var m = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        s = {
            array: function (x) {
                var a = ['['], b, f, i, l = x.length, v;
                for (i = 0; i < l; i += 1) {
                    v = x[i];
                    f = s[typeof v];
                    if (f) {
                        v = f(v);
                        if (typeof v == 'string') {
                            if (b) {
                                a[a.length] = ',';
                            }
                            a[a.length] = v;
                            b = true;
                        }
                    }
                }
                a[a.length] = ']';
                return a.join('');
            },
            'boolean': function (x) {
                return String(x);
            },
            'null': function (x) {
                return "null";
            },
            number: function (x) {
                return isFinite(x) ? String(x) : 'null';
            },
            object: function (x) {
                if (x) {
                    if (x instanceof Array) {
                        return s.array(x);
                    }
                    var a = ['{'], b, f, i, v;
                    for (i in x) {
                        if (!x.hasOwnProperty || x.hasOwnProperty(i)) {
                            v = x[i];
                            f = s[typeof v];
                            if (f) {
                                v = f(v);
                                if (typeof v == 'string') {
                                    if (b) {
                                        a[a.length] = ',';
                                    }
                                    a.push(s.string(i), ':', v);
                                    b = true;
                                }
                            }
                        }
                    }
                    a[a.length] = '}';
                    return a.join('');
                }
                return 'null';
            },
            string: function (x) {

				var unicode = new String;
				for(var i=0; i<x.length; i++) {
					var temp = x.charCodeAt(i).toString(16) ;
					while(temp.length < 4) {
						temp = "0" + temp;
					}
					unicode += '\\u' + temp;
				}
				return '"' + unicode + '"';
            }
        };
    return {
/*
    Stringify a JavaScript value, adding a security envelope, producing a JSON text.
*/
        stringify: function (v) {
            var f = s[typeof v];
            if (f) {
                v = f(v);
                if (typeof v === 'string') {
                    // cn: bug 12274 - add a security envelope to protect against CSRF
					var securityEnvelope = '{"asynchronous_key": "' + asynchronous_key +'", "jsonObject": '+ v +'}';
					return securityEnvelope;
                }
            }
            return;
        },

        destringify: function(str) {

        },
/*
    Stringify a JavaScript value, NO security envelope, producing a JSON text.
*/
        stringifyNoSecurity : function (v) {
            var f = s[typeof v];
            if (f) {
                v = f(v);
                if (typeof v === 'string') {
					return v;
                }
            }
            return;
        },

        destringify: function(str) {

        },

/*
    Parse a JSON text, producing a JavaScript value.
    It returns false if there is a syntax error.
*/
        parse: function (text) {
        	// mfh: bug 14599
        	text = text.replace(/^\s*|\s*$/,'');
			// cn: bug 12274 - the below defend against CSRF (see desc for whitepaper)
			if(text.substr) {
		    	if(text.substr(0,11) == "while(1);/*") {
		    		text = text.substr(11);
		    		text = text.substr(0, (text.length - 2));
		    	}
			}

            try {
// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

              if (/^[\],:{}\s]*$/.test(text
                  .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                  .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                  .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.
                 return eval('(' + text + ')');
              } else {
                 return false;
              }
            } catch (e) {
                return false;
            }
        },

		/**
		 * SUGAR: in response to CSRF, keep a standard copy of the parse function
		 */
        parseNoSecurity: function (text) {
            try {
              // See the comments in the above function for a description of what this mess is
              if (/^[\],:{}\s]*$/.test(text
                  .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                  .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                  .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                 return eval('(' + text + ')');
              } else {
                 return false;
              }
            } catch (e) {
                return false;
            }
        }
    };
}();
