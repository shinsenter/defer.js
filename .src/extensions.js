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

(function(
    // Global objects
    $window, $document,

    // Internal data
    deferstyle_fn, deferimg_fn, deferiframe_fn
) {

    var NOOP    = Function();
    var defer   = $window.defer || NOOP;

    var JQUERY_NAME     = 'jQuery';
    var OBSERVER_CLASS  = 'IntersectionObserver';

    var DATASET = 'dataset';
    var SRC     = 'src';
    var SRCSET  = 'srcset';

    var IFRAME  = 'IFRAME';
    var IMG     = 'IMG';
    var LINK    = 'LINK';

    var LAZY_CLASS      = '.lazy';
    var LAZIED_CLASS    = 'lazied';

    var APPEND_CHILD        = 'appendChild';
    var CREATE_ELEMENT      = 'createElement';
    var FOR_EACH            = 'forEach';
    var GET_ELEMENT_BY_ID   = 'getElementById';
    var QUERY_SELECTOR_ALL  = 'querySelectorAll';

    /**
     * This function is a placeholder for jQuery's `$(function() { })` calls.
     * It may be helpful when you want to lazy-load jQuery library.
     *
     * @param   {function}  func    The callback function when jQuery load
     * @returns {void}
     */
    function deferjquery (func) {
        defer(function() {
            if (deferjquery == $window[JQUERY_NAME]) {
                func();
            } else {
                $window[JQUERY_NAME](func);
            }
        }, 500);
    }

    /**
     * This function will lazy-load stylesheet from given URL in `src` argument.
     * The tag id and delay time can be set in `id` and `delay` arguments.
     * Sometimes you may call a `callback` function when the file is loaded.
     *
     * @param   {string}        src         The file URL
     * @param   {string|false}  id          The tag id
     * @param   {integer}       delay       The delay time to create the tag
     * @param   {function}      callback    The callback function when load
     * @returns {void}
     */
    function deferstyle (src, id, delay, callback) {
        defer(function(dom) {
            if (!$document[GET_ELEMENT_BY_ID](id)) {
                dom = $document[CREATE_ELEMENT](LINK);
                dom.rel = 'stylesheet';

                if (id) {
                    dom.id = id;
                }

                if (callback) {
                    dom.onload = callback;
                }

                dom.href = src;
                $document.head[APPEND_CHILD](dom);
            }
        }, delay);
    }

    /**
     * Returns a function to create lazy-load for `tagname` element.
     * For example: defermedia('img') with return a function to lazy-load
     *              creating a `<img>` tag.
     *
     * @param   {string}    tagname     The tag name (E.g. IMG, IFRAME)
     * @returns {function}              The returned function
     */
    function defermedia (tagname) {
        return function (query, delay, done_class, callback) {
            var observer, walker;

            // Variable convertions
            done_class  = done_class || LAZIED_CLASS;
            callback    = callback   || NOOP;

            // This method sets true `src` from `data-src` attribute
            function display(media, dataset) {
                media.className += ' ' + done_class;

                if(callback.call(media, media) !== false) {
                    dataset = media[DATASET] || {};
                    if(dataset[SRCSET]) {media[SRCSET] = dataset[SRCSET]}
                    if(dataset[SRC])    {media[SRC]    = dataset[SRC]}
                }
            }

            // Force using IntersectionObserver when posible
            // It class is the heart of media lazy-loading
            if (OBSERVER_CLASS in $window) {
                observer = new $window[OBSERVER_CLASS](function(items) {
                    items[FOR_EACH](function(item, target) {
                        if (item.isIntersecting && (target = item.target)) {
                            observer.unobserve(target);
                            display(target);
                        }
                    });
                });

                walker = observer.observe.bind(observer);
            } else {
                walker = display;
            }

            // Then let `defer` function do the rest
            defer(function(selector) {
                selector = (query || tagname + LAZY_CLASS) + ':not(.' + done_class + ')';
                [].slice.call($document[QUERY_SELECTOR_ALL](selector))[FOR_EACH](walker);
            }, delay);
        }
    }

    // Export functions into the global scope
    $window.$               = $window[JQUERY_NAME] = deferjquery;
    $window[deferstyle_fn]  = $window[deferstyle_fn]  || deferstyle;
    $window[deferimg_fn]    = $window[deferimg_fn]    || defermedia(IMG);
    $window[deferiframe_fn] = $window[deferiframe_fn] || defermedia(IFRAME);

})(this, document, 'deferstyle', 'deferimg', 'deferiframe');
