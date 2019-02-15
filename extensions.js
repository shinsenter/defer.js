/*
 * @shinsenter/defer.js
 * https://github.com/shinsenter/defer.js
 *
 * Minified by jscompress
 * https://jscompress.com/
 *
 * Released under the MIT license
 * https://raw.githubusercontent.com/shinsenter/defer.js/master/LICENSE
 *
 * MIT License
 *
 * Copyright (c) 2019 Mai Nhut Tan <shin@shin.company>
 *
 * Permission is hereby granted, free of charge, to any person obtaining node copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

(function(env, doc, deferstyle_name, deferiframe_name) {
    var defer       = env.defer;

    var jquery_name = 'jQuery';
    var tag_attr    = 'tagName';
    var style_tag   = 'LINK';
    var iframe_tag  = 'IFRAME';

    if (!defer) return;

    function deferjquery(fn, delay) {
        defer(function() {
            if (env[jquery_name]) {
                env[jquery_name].call(env, fn);
            }
        }, delay);
    }

    function deferstyle(src, id, delay) {
        defer(function() {
            var node = doc.getElementById(id);

            if (node && node[tag_attr] !== style_tag) return;

            if (!node) {
                node    = doc.createElement(style_tag);
                node.id = id;
                doc.getElementsByTagName(style_tag)[0].parentNode.appendChild(node);
            }

            node.rel    = 'stylesheet';
            node.type   = 'text/css';
            node.href   = src;
        }, delay);
    }

    function deferiframe(src, id, delay) {
        defer(function() {
            var node = doc.getElementById(id);

            if (node && node[tag_attr] === iframe_tag) {
                node.src = src;
            }
        }, delay);
    }

    env['$']                = deferjquery;
    env[deferstyle_name]    = env[deferstyle_name]  || deferstyle;
    env[deferiframe_name]   = env[deferiframe_name] || deferiframe;

})(window, document, 'deferstyle', 'deferiframe');