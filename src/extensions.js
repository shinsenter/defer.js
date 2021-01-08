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

(function (window, document) {

    // IntersectionObserver class
    var OBSERVER_CLASS = 'IntersectionObserver';

    // Real attributes for lazy-loaded node
    var ATTR_SRC    = 'src';
    var ATTR_SRCSET = 'srcset';
    var ATTR_STYLE  = 'style';
    var ATTR_TYPE   = 'type';

    // Tag names
    var IFRAME = 'IFRAME';
    var IMG    = 'IMG';
    var LINK   = 'LINK';
    var SOURCE = 'SOURCE';

    // Tag attributes
    var DATA_PREFIX = 'data-';
    var DEFER_CLASS = 'lazied';
    var DEFER_FLAG  = DATA_PREFIX + DEFER_CLASS;

    // Element methods
    var ATTRIBUTE        = 'Attribute';
    var GET_ATTRIBUTE    = 'get' + ATTRIBUTE;
    var SET_ATTRIBUTE    = 'set' + ATTRIBUTE;
    var HAS_ATTRIBUTE    = 'has' + ATTRIBUTE;
    var REMOVE_ATTRIBUTE = 'remove' + ATTRIBUTE;
    var LOAD             = 'load';
    var FOR_EACH         = 'forEach';

    // Common used constants
    var FALSE  = false;
    var NOOP   = Function();

    // Methods from defer object
    var defer  = window.defer || NOOP;
    var fn_tag = defer._ || NOOP;
    var fn_a2h = defer.$;

    // Query selector
    function query(selector, parent) {
        return [].slice.call((parent || document).querySelectorAll(selector));
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
    function deferstyle(src, id, delay, callback) {
        defer(function (element) {
            element      = fn_tag(LINK, id, callback)
            element.rel  = 'stylesheet';
            element.href = src;
            fn_a2h(element);
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
    function defermedia(tagname) {
        return function (selector, delay, lazied_class, fn_checker, options, attributes) {
            defer(function (observer, watcher) {
                // This method sets the real attributes
                function fn_reveal(node) {
                    if ((fn_checker || NOOP).call(node, node) !== FALSE) {
                        (attributes || [ATTR_STYLE, ATTR_SRCSET, ATTR_SRC])[FOR_EACH](function (attr, value) {
                            value = node[GET_ATTRIBUTE](DATA_PREFIX + attr);
                            if (value) {node[SET_ATTRIBUTE](attr, value)}
                        });
                        query(SOURCE, node)[FOR_EACH](fn_reveal);
                        if (LOAD in node) {node[LOAD]()}
                    }

                    node.className += ' ' + (lazied_class || DEFER_CLASS);
                }

                // Force using IntersectionObserver when posible
                if (OBSERVER_CLASS in window) {
                    observer = new window[OBSERVER_CLASS](function (items) {
                        items[FOR_EACH](function (item, target) {
                            if (item.isIntersecting && (target = item.target)) {
                                observer.unobserve(target);
                                fn_reveal(target);
                            }
                        });
                    }, options);
                    watcher = observer.observe.bind(observer);
                } else {
                    watcher = fn_reveal;
                }

                // This function marks item initialized, then applies the callback
                function fn_filter(node) {
                    if (node[GET_ATTRIBUTE](DEFER_FLAG)) {return}
                    node[SET_ATTRIBUTE](DEFER_FLAG, tagname);
                    watcher(node);
                }

                query(selector ||
                    tagname + '[' + DATA_PREFIX + ATTR_SRC + ']:not([' + DEFER_FLAG + '])')[FOR_EACH](fn_filter);
            }, delay);
        }
    }

    /**
     * The easiest way to delay executing all script[type=deferjs] tags
     *
     * @returns {void}
     */
    function wakeup() {
        defer(function (target, attr, nodes) {
            target = '[type=deferjs]';
            attr   = '[async]';
            nodes  = query(target + ':not(' + attr + ')').concat(query(target + attr));

            function appendtag(clone) {
                // Try pulling the first node from the list
                target = nodes.shift();

                // If node exists, then continue
                if (target) {
                    // Remove the node from the document
                    target.parentNode.removeChild(target);
                    target[REMOVE_ATTRIBUTE](ATTR_TYPE);

                    // Make a clone DOMNode
                    clone = fn_tag();

                    for (attr in target) {
                        if (target[attr]) {
                            try {
                                clone[attr] = target[attr];
                            } catch(e) {e}
                        }
                    }

                    // Then append clone to the document
                    if (target[ATTR_SRC] && !target[HAS_ATTRIBUTE]('async')) {
                        clone.onload = clone.onerror = appendtag;
                        fn_a2h(clone);
                    } else {
                        fn_a2h(clone);
                        appendtag();
                    }
                }
            }

            appendtag();
        });
    }

    // Export functions into the global scope
    defer.all          = wakeup;
    window.deferstyle  = deferstyle;
    window.deferimg    = defermedia(IMG);
    window.deferiframe = defermedia(IFRAME);

    // Execute script tags
    wakeup();

})(this, document);
