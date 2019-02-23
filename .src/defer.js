/**
 *
 * Package shinsenter/defer.js
 * https://github.com/shinsenter/defer.js
 *
 * Minified by UglifyJS2
 * http://lisperator.net/uglifyjs/
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

/*!shinsenter/defer.js*/
(function ($window, $document, dequeue, defer_fn, deferscript_fn) {

    var NULL    = null;
    var TRUE    = true;

    var SCRIPT  = 'SCRIPT';

    var ADD_EVENT_LISTENER       = 'addEventListener';
    var APPEND_CHILD             = 'appendChild';
    var CREATE_ELEMENT           = 'createElement';
    var GET_ELEMENT_BY_ID        = 'getElementById';
    var GET_ELEMENTS_BY_TAG_NAME = 'getElementsByTagName';
    var READY_STATE              = 'readyState';

    var $head       = $document[GET_ELEMENTS_BY_TAG_NAME]('HEAD')[0];
    var dom_loaded  = $document[READY_STATE] == 'complete';
    var func_queue  = [];
    var last_insert;

    /**
     * This is our hero: the `defer` function.
     * This will push target function into queue with its delay time.
     * If the `load` method was fired, it will execute the function.
     *
     * @param   {function}  func    The function
     * @param   {integer}   delay   The delay time to call the function
     * @param   {Object}    context The context to bind with the function
     * @returns {void}
     */
    function defer (func, delay, context) {
        func    = func.bind(context || NULL);
        delay   = delay || 0;

        if (dom_loaded) {
            dequeue(func, delay);
        } else {
            func_queue.push(func);
            func_queue.push(delay);
        }
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
    function deferscript (src, id, delay, callback) {
        defer(function() {
            if (!id || !$document[GET_ELEMENT_BY_ID](id)) {
                last_insert = $document[CREATE_ELEMENT](SCRIPT);
                last_insert.defer = TRUE;

                if (id) {
                    last_insert.id = id;
                }

                if (callback) {
                    last_insert.onload = callback;
                }

                last_insert.src = src;
                $head[APPEND_CHILD](last_insert);

                // Free memory after attaching to DOM
                last_insert = NULL;
            }
        }, delay);
    }

    /**
     * This method will be triggled when `load` event was fired.
     * This will also turn `dom_loaded` into `true`...
     * ... and run all function in queue using `dequeue` method.
     *
     * @returns {void}
     */
    function onload () {
        dom_loaded = TRUE;

        for (;func_queue.length;) {
            dequeue(func_queue.shift(), func_queue.shift());
        }
    }

    // Export functions into the global scope
    $window[defer_fn]       = $window[defer_fn]       || defer;
    $window[deferscript_fn] = $window[deferscript_fn] || deferscript;

    // Add event listener into global scope
    $window[ADD_EVENT_LISTENER]('load', onload);

})(window, document, setTimeout, 'defer', 'deferscript');
