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
    dequeue, func_queue,

    // Variable placeholder
    dom_loaded
) {
    // Method names
    var defer_fn        = 'defer';
    var deferscript_fn  = 'deferscript';

    var SCRIPT  = 'SCRIPT';

    var ADD_EVENT_LISTENER   = 'addEventListener';
    var APPEND_CHILD         = 'appendChild';
    var CREATE_ELEMENT       = 'createElement';
    var GET_ELEMENT_BY_ID    = 'getElementById';
    var READY_STATE          = 'readyState';

    dom_loaded = (/p/).test(document[READY_STATE]);

    /**
     * This is our hero: the `defer` function.
     * This will push your function `func` into queue with its delay time.
     * If browser's `load` event was fired, your function will be executed.
     *
     * @param   {function}  func    The function
     * @param   {integer}   delay   The delay time to call the function
     * @returns {void}
     */
    function defer (func, delay) {
        // Let's set default timeout to 5 browser tick cycles
        var default_delay = 80;

        if (dom_loaded) {
            dequeue(func, delay || default_delay);
        } else {
            func_queue.push(func, delay);
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
        defer(function(dom) {
            if (!document[GET_ELEMENT_BY_ID](id)) {
                dom = document[CREATE_ELEMENT](SCRIPT);

                if (id) {
                    dom.id = id;
                }

                if (callback) {
                    dom.onload = callback;
                }

                dom.src = src;
                document.head[APPEND_CHILD](dom);
            }
        }, delay);
    }

    /**
     * [WIP]
     * This function aims to provide both function
     * throttling and debouncing in as few bytes as possible.
     *
     * @param   {function}  func        The file URL
     * @param   {integer}   delay       The delay time to create the tag
     * @param   {boolean}   throttle    Set false to debounce, true to throttle
     * @param   {integer}   ticker      Placeholder for holding timer
     * @returns {function}              Return a new function
     */
    // function defersmart(func, delay, throttle, ticker) {
    //     return function() {
    //         var context = this;
    //         var args    = arguments;

    //         if (!throttle) {
    //             clearTimeout(ticker);
    //         }

    //         if (!throttle || !ticker) {
    //             ticker = dequeue(function() {
    //                 ticker = null;
    //                 func.apply(context, args);
    //             }, delay);
    //         }
    //     }
    // }

    /**
     * This method will be triggled when `load` event was fired.
     * This will also turn `dom_loaded` into `true`...
     * ... and run all function in queue using `dequeue` method.
     *
     * @returns {void}
     */
    function flushqueue () {
        dom_loaded = 1;

        for (;func_queue.length;) {
            defer(func_queue.shift(), func_queue.shift());
        }
    }

    // Add event listener into global scope
    window[ADD_EVENT_LISTENER]('on' + load_event in window ? load_event : 'load', flushqueue);

    // Export functions into the global scope
    window[defer_fn]       = defer;
    window[deferscript_fn] = deferscript;

})(this, document, 'pageshow', setTimeout, []);
