/**
 *
 * Package shinsenter/defer.js
 * https://github.com/shinsenter/defer.js
 *
 * Minified by UglifyJS3
 * http://lisperator.net/uglifyjs/
 *
 * Released under the MIT license
 * https://raw.githubusercontent.com/shinsenter/defer.js/master/LICENSE
 *
 * MIT License
 *
 * Copyright (c) 2019 Mai Nhut Tan <shin@shin.company>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
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

/*@shinsenter/defer.js*/
(function (
    // Global objects
    window, document,

    // Page load event name
    load_event,

    // Dequeue method
    func_dequeue,

    // The function queue
    queue,

    // Variable placeholder
    dom_loaded,

    // Utilities
    fn_append
) {

    // Check if load event was fired
    dom_loaded = (/p/).test(document.readyState);

    // Append node to the <head> tag
    fn_append  = document.head.appendChild.bind(document.head);

    /**
     * This is our hero: the `defer` function.
     * This will push your function `func` into queue with its delay time.
     * If browser's `load` event was fired, your function will be executed.
     *
     * @param   {function}  func    The function
     * @param   {integer}   delay   The delay time to call the function
     * @returns {void}
     */
    function defer(func, delay) {
        if (dom_loaded) {
            func_dequeue(func, delay);
        } else {
            queue.push(func, delay);
        }
    }

    /**
     * This method will be triggled when `load` event was fired.
     * This will also turn `dom_loaded` into `true`...
     * ... and run all function in queue using `func_dequeue` method.
     *
     * @returns {void}
     */
    function flush_queue() {
        for (dom_loaded = 1; queue[0];) {
            func_dequeue(queue.shift(), queue.shift());
        }
    }

    /**
     * Create a DOM element if not exist.
     *
     * @param   {string}    tag_name    Tag name
     * @param   {string}    id          The DOMNode's id
     * @param   {function}  callback    The callback function when load
     * @param   {object}    node        The placeholder for the DOMNode
     * @returns {object}    The DOMNode
     */
    function fn_tag(tag_name, id, callback, node) {
        node = document.createElement(tag_name || 'SCRIPT');

        if (id) {
            node.id = id;
        }

        if (callback) {
            node.onload = callback;
        }

        return document.getElementById(id) || node;
    }

    /**
     * This function will lazy-load a script from given URL in `src` argument.
     * The tag id and delay time can be set in `id` and `delay` arguments.
     * Sometimes you may call a `callback` function when the file is loaded.
     *
     * @param   {string}        src         The file URL
     * @param   {string|false}  id          The tag id
     * @param   {integer}       delay       The delay time to create the tag
     * @param   {function}      callback    The callback function when load
     * @returns {void}
     */
    function deferscript(src, id, delay, callback) {
        defer(function (element) {
            element = fn_tag(0, id, callback);
            element.src = src;
            fn_append(element);
        }, delay);
    }

    // Add event listener into global scope
    window.addEventListener('on' + load_event in window ? load_event : 'load', flush_queue);

    // Export functions into the global scope
    defer._            = fn_tag;
    defer.$            = fn_append;
    window.defer       = defer;
    window.deferscript = deferscript;

})(this, document, 'pageshow', setTimeout, []);
