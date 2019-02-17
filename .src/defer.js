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

/*! @shinsenter/defer.js */
(function(env, doc, dequeue_fn, defer_name, deferscript_name) {

    var head_tag    = 'HEAD';
    var script_tag  = 'SCRIPT';
    var load_attr   = 'onload';

    var fn_queue    = [];
    var time_queue  = [];
    var DOM_ready   = doc.readyState;

    function onload () {
        DOM_ready   = true;

        fn_queue.forEach(function(fn, i) {
            dequeue_fn(fn, time_queue[i]);
        });

        fn_queue    = [];
        time_queue  = [];
    }

    function defer (fn, delay, context) {
        fn      = fn.bind(context || env);
        delay   = delay || 0;

        if (DOM_ready) {
            dequeue_fn(fn, delay);
        } else {
            fn_queue.push(fn);
            time_queue.push(delay);
        }
    }

    function deferscript (src, id, delay, callback) {
        defer(function() {
            var node;

            if (!doc.getElementById(id)) {
                node            = doc.createElement(script_tag);
                node.id         = id;
                node.async      = node.defer      = true;
                node[load_attr] = callback || node[load_attr];
                node.src        = src;
                doc.getElementsByTagName(head_tag)[0].appendChild(node);
            }
        }, delay);
    }

    env[defer_name]         = env[defer_name]       || defer;
    env[deferscript_name]   = env[deferscript_name] || deferscript;
    env.addEventListener('load', onload);

})(window, document, setTimeout, 'defer', 'deferscript');