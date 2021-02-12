/**
 * Package @shinsenter/defer.js
 * https://www.npmjs.com/package/@shinsenter/defer.js
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

/**
 * 🥇 A super small, super efficient library
 * that helps you lazy load everything like images, video, audio, iframes
 * as well as stylesheets, and JavaScript.
 *
 * @author Mai Nhut Tan <shin@shin.company>
 * @copyright 2021 AppSeeds <https://code.shin.company/>
 * @version 2.0
 * @license {@link https://raw.githubusercontent.com/shinsenter/defer.js/master/LICENSE|MIT}
 */

/*@shinsenter/defer.js*/
(function (window, document, _exec) {

    /*
    |--------------------------------------------------------------------------
    | Define shared variables, this helps to maximize the output minification
    |--------------------------------------------------------------------------
    */

    // Important variables
    var defer
    var _undef;
    var _queue    = [];
    var _domReady = (/p/).test(document.readyState);

    // Common objects
    var _IntersectionObserver = 'IntersectionObserver';
    var _fnNothing = Function();
    var _regexData = /^data-(.+)/;
    var _eventShow = 'pageshow';

    // Common attributes
    var _attrAttributes = 'attributes';
    var _attrDefered    = 'lazied';
    var _attrLength     = 'length';

    // Common texts
    var _txtAttribute   = 'Attribute';
    var _txtLink        = 'LINK';
    var _txtScript      = 'SCRIPT';

    // Method aliases
    var _listen       = 'addEventListener';
    var _forEach      = 'forEach';
    var _hasAttribute = 'has' + _txtAttribute;
    var _nodeName     = 'nodeName';
    var _setAttribute = 'set' + _txtAttribute;

    /*
    |--------------------------------------------------------------------------
    | Utility functions are shared within internal scope
    |--------------------------------------------------------------------------
    */

    function _newNode(nodeName, id, callback, _node) {
        _node =
            (id ? document.getElementById(id) : _undef) ||
            document.createElement(nodeName || _txtScript);
        if (id) {
            _node.id = id;
        }
        if (callback) {
            _node.onload = callback;
        }

        return _node;
    }

    function _cloneScript(node, _clone, _attr, _prop, _count) {
        _clone = _newNode(node[_nodeName]);
        for (
            _count = 0, _attr = node[_attrAttributes];
            _count < _attr[_attrLength];
            _count++
        ) {
            _prop = _attr[_count];
            if (_prop.name != 'type') {
                _clone[_setAttribute](_prop.name, _prop.value);
            }
        }
        _clone.text = node.text;

        return _clone;
    }

    function _appendToHead(node) {
        document.head.appendChild(node);
    }

    function _find(selector, parent) {
        return [].slice.call((parent || document).querySelectorAll(selector));
    }

    function _proceedJs(selector) {
        defer(function (_nodes) {
            function _next(_node, _clone) {
                _node = _nodes.shift();
                if (_node) {
                    _node.parentNode.removeChild(_node);
                    _clone = _cloneScript(_node);
                    if (_clone.src && !_clone[_hasAttribute]('async')) {
                        _clone.onload = _clone.onerror = _next;
                        _appendToHead(_clone);
                    } else {
                        _appendToHead(_clone);
                        _next();
                    }
                }
            }
            _nodes = _find(selector || '[type=deferjs]');
            _next();
        });
    }

    function _proceedQueue() {
        for (_domReady = !_proceedJs(); _queue[0];) {
            defer(_queue.shift(), _queue.shift());
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Defines the defer function and utility functions will be publicly exposed
    |--------------------------------------------------------------------------
    */

    /**
     * A definition for an ordinary function,
     * used as a parameter to another function.
     *
     * @typedef
     * @name function
     * @returns {void}
     */

    /**
     * The definition for a function that takes one parameter is a DOM {@link Node} element
     *
     * @typedef
     * @name closure
     * @param {Node} element - The DOM {@link Node} element
     * @returns {void | bool}
     */

    /**
     * The DOM Node interface
     *
     * @typedef
     * @name Node
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node}
     */

    /**
     * Used to delay execution of JavaScript
     * which may adversely affect the loading of your web page.
     *
     * All JavaScript delayed by `Defer()` will only executed
     * after the web page has completely loaded.
     *
     * @function Defer
     * @public
     * @since 2.0
     * @param {function} func - The function that will be deferred.
     * @param {number}   [delay=0] - The duration in miliseconds to delay the `func` function.
     * @returns {void}
     *
     * @example
     * Delay some heavy DOM manipulations in JavaScript.
     *
     * ```js
     * Defer(function() {
     *   // Some JavaScript that may block page rendering
     *   // such as calling jQuery's fadeIn() feature
     *   jQuery('div').hide().fadeIn().show();
     * }); // <- script runs after the page has completely loaded
     * ```
     *
     * @example
     * Delay the same JavaScript as above for 3000ms.
     *
     * ```js
     * Defer(function() {
     *   jQuery('div').hide().fadeIn().show();
     * }, 3000); // <- Added 3000 = Delay for 3000ms
     * ```
     */
    defer = function (func, delay) {
        if (_domReady) {
            _exec(func, delay);
        } else {
            _queue.push(func, delay);
        }
    };

    /**
     * By default, this function is triggered automatically.
     *
     * All script tags with attribute `<script type="deferjs">`
     * will be delayed and automatically executed
     * as soon as the page has completely loaded.
     *
     * This function is useful when you don't want heavy JavaScript works
     * to affect your website loading speed.
     *
     * @function Defer.all
     * @public
     * @since 2.0
     * @param {string} [selector=[type=deferjs]] - A CSS selector that queries script tags will be deferred.
     * @returns {void}
     *
     * @example
     *
     * You just need to simply change `type="text/javascript"` to `type="deferjs"`,
     * or add `type="deferjs"` to your script tag for it to take effect.
     *
     * Before:
     * ```html
     * <script type="text/javascript" src="heavy-library.js"></script>
     * <script>// heavy script here </script>
     * ```
     * After:
     * ```html
     * <script type="deferjs" src="heavy-library.js"></script>
     * <script type="deferjs">// heavy script here </script>
     * ```
     *
     * @example
     * If you don't want the `<script type="deferjs">` syntax,
     * or you want to define another name for website,
     * please call `Defer.all()` manually at the bottom of the `<body>` tag.
     *
     * This example uses `type="myjs"` instead of `type="deferjs"`:
     * ```html
     * <script type="myjs" src="heavy-library.js"></script>
     * <script type="myjs">// heavy script here </script>
     *
     * <!-- Call Defer.all() at the bottom of the `<body>` tag -->
     * <script>Defer.all('script[type="myjs"]');</script>
     * ```
     */
    defer.all = _proceedJs;

    /**
     * For lazy loading external JavaScript files.
     *
     * This function is useful when you don't want heavy JavaScript
     * (especially the widgets of social networks, ad services)
     * to affect your website loading speed.
     *
     * @function Defer.js
     * @public
     * @since 2.0
     * @param {string}  src - URL to the js file that should be lazy loaded.
     * @param {string}  [id] - The ID will be assigned to the script tag to avoid downloading the same file multiple times.
     * @param {number}  [delay=0] - The duration in miliseconds to delay loading the js file.
     * @param {closure} [callback] - The callback function will be executed if the js file is successfully loaded.
     * @returns {void}
     *
     * @example
     * Delay loading of Facebook SDK after 3000ms.
     *
     * ```js
     * Defer.js('https://connect.facebook.net/en_US/sdk.js', 'fb-sdk', 3000);
     * ```
     *
     * @example
     * Delay loading of AddThis SDK after 5000ms.
     *
     * ```js
     * var addthis_id = 'ra-5c68e61cf456f1cb';
     * Defer.js('https://s7.addthis.com/js/300/addthis_widget.js#pubid=' + addthis_id, 'addthis-js', 5000);
     * ```
     */
    defer.js = function (src, id, delay, callback) {
        defer(function (_node) {
            _node = _newNode(_undef, id, callback);
            _node.src = src;
            _appendToHead(_node);
        }, delay);
    };

    /**
     * For lazy loading external CSS files.
     *
     * This function is useful when you don't want heavy CSS
     * (like Web Fonts) to affect your website loading speed.
     *
     * @function Defer.css
     * @public
     * @since 2.0
     * @param {string}  src - URL to the css file that should be lazy loaded.
     * @param {string}  [id] - The ID will be assigned to the script tag to avoid downloading the same file multiple times.
     * @param {number}  [delay=0] - The duration in miliseconds to delay loading the css file.
     * @param {closure} [callback] - The callback function will be executed if the css file is successfully loaded.
     * @returns {void}
     *
     * @example
     * Lazy load FontAwesome Webfont from its CDN.
     *
     * ```js
     * Defer.css('https://pro.fontawesome.com/releases/v5.10.0/css/all.css', 'fa5-css');
     * ```
     *
     * @example
     * Delay loading animate.css from CDN for 1000ms.
     *
     * ```js
     * Defer.css('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css', 'animate-css', 1000);
     * ```
     */
    defer.css = function (src, id, delay, callback) {
        defer(function (_node) {
            _node = _newNode(_txtLink, id, callback);
            _node.rel = 'stylesheet';
            _node.href = src;
            _appendToHead(_node);
        }, delay);
    };

    /**
     * For lazy loading attributes of any element on the page.
     *
     * Basically, the `Defer.dom` function converts all `data-*` attributes
     * into regular attributes (e.g. from `data-src` to `src`)
     * when user scrolling to the position
     * where the element appears within the browser's viewport.
     *
     * Most of modern browsers support
     * [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) feature.
     *
     * To take advantage of native performance
     * for older browsers that doesn't support this feature (such as IE9),
     * you should load `IntersectionObserver` polyfill library
     * right after the `defer.min.js` script tag as following example:

     * ```html
     * <!-- Put defer.min.js here -->
     * <script src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@2.0.0/dist/defer.min.js"></script>
     *
     * <!-- Put polyfill right after defer.min.js tag -->
     * <script>'IntersectionObserver'in window||document.write('<script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"><\/script>');</script>
     * ```
     *
     * @function Defer.dom
     * @public
     * @since 2.0
     * @param {string}  [selector=[data-src]] - A CSS selector that queries elements will be lazy loaded.
     * @param {number}  [delay=0] - The duration in miliseconds to delay the lazy loading for the elements.
     * @param {string}  [cssclass] - A CSS class will be added automatically after when an element has been loaded successfully.
     * @param {closure} [validate] - A function will be executed with element will be lazy loaded as its argument. If the function returns `false`, lazy loading for that element will be skipped.
     * @param {object}  [observeOptions] - [Intersection observer options](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)
     * @returns {void}
     *
     * @example
     * Basic usage:
     * Lazy load all `<img>` tags which have CSS class `lazy`.
     *
     * ```html
     * <script>Defer.dom('img.lazy');</script>
     *
     * <!-- Here may be a very long content -->
     *
     * <img class="lazy" alt="Photo 1" data-src="https://picsum.photos/200/300?random=1" width="200" height="300" />
     * <img class="lazy" alt="Photo 2" data-src="https://picsum.photos/200/300?random=2" width="200" height="300" />
     * <img class="lazy" alt="Photo 3" data-src="https://picsum.photos/200/300?random=3" width="200" height="300" />
     * ```
     *
     * @example
     * Basic usage:
     * Lazy load background image of a `div` tag.
     *
     * ```html
     * <style>
     *   #my_div {
     *     width: 300;
     *     height: 200;
     *   }
     * </style>
     *
     * <script>
     *   // Lazy load div tag which has `id="my_div"`
     *   Defer.dom('#my_div');
     * </script>
     *
     * <!-- Here may be a very long content -->
     *
     * <div id="my_div"
     *   data-style="background: url(https://img.youtube.com/vi/Uz970DggW7E/hqdefault.jpg) 50% 50% / cover no-repeat;">
     *   <!-- The content -->
     * </div>
     * ```
     *
     * @example
     * Advanced usage:
     * Delay lazy loading `<img>` tags 200ms after the page has completely loaded.
     * Then it will add a CSS class `loaded` to the fully lazy loaded image element.
     *
     * ```html
     * <script>Defer.dom('img.lazy-extra', 200, 'loaded');</script>
     *
     * <!-- Here may be a very long content -->
     *
     * <img class="lazy-extra" alt="Photo 1" data-src="https://picsum.photos/200/300?random=4" width="200" height="300" />
     * <img class="lazy-extra" alt="Photo 2" data-src="https://picsum.photos/200/300?random=5" width="200" height="300" />
     * <img class="lazy-extra" alt="Photo 3" data-src="https://picsum.photos/200/300?random=6" width="200" height="300" />
     * ```
     *
     * @example
     * Advanced usage: Lazy load with [Intersection observer options](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)
     *
     * ```html
     * <script>
     *   // Preload images within 200% of the current viewport size.
     *   Defer.dom("img.lazy-sooner", 200, "loaded", null, {
     *     rootMargin: "200%"
     *   });
     * </script>
     *
     * <!-- Here may be a very long content -->
     *
     * <img class="lazy-sooner" alt="Photo 1" data-src="https://picsum.photos/200/300?random=7" width="200" height="300" />
     * <img class="lazy-sooner" alt="Photo 2" data-src="https://picsum.photos/200/300?random=8" width="200" height="300" />
     * <img class="lazy-sooner" alt="Photo 3" data-src="https://picsum.photos/200/300?random=9" width="200" height="300" />
     * ```
     *
     * @example
     * We can use CSS class that added to the lazy loaded element
     * to add animation to the successfully loaded elements.
     *
     * ```html
     * <script>Defer.dom('img.fade', 200, 'loaded');</script>
     * <style>
     *   img.fade {
     *     transition: opacity 500ms ease-in-out;
     *     opacity: 0;
     *   }
     *   img.fade.loaded {
     *     background: none;
     *     opacity: 1;
     *   }
     * </style>
     *
     * <!-- Here may be a very long content -->
     *
     * <img class="fade" alt="Photo 1" data-src="https://picsum.photos/200/300?random=10" width="200" height="300" />
     * <img class="fade" alt="Photo 2" data-src="https://picsum.photos/200/300?random=11" width="200" height="300" />
     * <img class="fade" alt="Photo 3" data-src="https://picsum.photos/200/300?random=12" width="200" height="300" />
     * ```
     *
     * @example
     * This function can be used similarly for other tags
     * such as `<iframe>`, `<video>`, `<audio>`, `<picture>` tags.
     *
     * ```html
     * <script>
     *   // Lazy load all elements which have CSS class `multi-lazy`
     *   Defer.dom('.multi-lazy', 200, 'loaded');
     * </script>
     *
     * <!-- Here may be a very long content -->
     *
     * <iframe class="multi-lazy" title="Youtube"
     *   width="400" height="300" allowfullscreen
     *   allow="accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture"
     *   data-style="background: url(https://img.youtube.com/vi/Uz970DggW7E/hqdefault.jpg) 50% 50% / cover no-repeat;"
     *   data-src="https://www.youtube.com/embed/Uz970DggW7E"></iframe>
     *
     * <picture class="multi-lazy">
     *   <source media="(min-width:800px)" data-srcset="https://picsum.photos/800/1200">
     *   <source media="(min-width:600px)" data-srcset="https://picsum.photos/600/900">
     *   <img data-src="https://picsum.photos/200/300" alt="Photo" style="width:auto;">
     * </picture>
     *
     * <audio class="multi-lazy" controls>
     *   <source data-src="sound.ogg" type="audio/ogg">
     *   <source data-src="sound.mp3" type="audio/mpeg">
     *   Your browser does not support the audio tag.
     * </audio>
     *
     * <video class="multi-lazy" width="320" height="240" controls>
     *   <source data-src="movie.mp4" type="video/mp4">
     *   <source data-src="movie.ogg" type="video/ogg">
     *   Your browser does not support the video tag.
     * </video>
     * ```
     *
     * @example
     * Or even execute a piece of JavaScript
     * when the user scrolls to the element `#scroll_reveal`.
     *
     * ```html
     * <script>
     *   // Show an alert when user scrolled to #scroll_reveal
     *   Defer.dom('#scroll_reveal', null, null, function(element) {
     *     window.alert('You scrolled to #' + element.id);
     *   });
     * </script>
     *
     * <!-- Here may be a very long content -->
     *
     * <div id="scroll_reveal">
     *   This is my content.
     * </div>
     * ```
     *
     * @example
     * Combine with other Defer functions.
     * Delay loading highlightjs library for 1000ms.
     * Then when you scroll to any `code` tag, enable code highlighting for it.
     *
     * ```js
     * var base = 'https://cdn.jsdelivr.net/npm/highlightjs@9.12.0';
     * Defer.css(base + '/styles/rainbow.css', 'hljs-css', 1000);
     * Defer.js(base + '/highlight.pack.min.js', 'hljs-js', 1000, function () {
     *     Defer.dom('pre code', 0, 'ide-loaded', function (block) {
     *         hljs.highlightBlock(block);
     *     });
     * });
     * ```
     */
    defer.dom = function (selector, delay, cssclass, validate, observeOptions) {
        defer(function (_attr, _count, _found, _observer, _follow) {
            function _reveal(node) {
                if (!validate || validate(node) !== false) {
                    for (
                        _count = 0, _attr = node[_attrAttributes];
                        _count < _attr[_attrLength];
                        _count++
                    ) {
                        _found = _regexData.exec(_attr[_count].name);
                        if (_found) {
                            node[_setAttribute](
                                _found[1],
                                _attr[_count].value
                            );
                        }
                    }
                    _find('source', node)[_forEach](_reveal);
                    (node.load || _fnNothing)();
                    if (cssclass) {
                        node.className += ' ' + cssclass;
                    }
                }
            }
            if (_IntersectionObserver in window) {
                _observer = new window[_IntersectionObserver](function (nodes) {
                    nodes[_forEach](function (item, _target) {
                        if (item.isIntersecting && (_target = item.target)) {
                            _observer.unobserve(_target);
                            _reveal(_target);
                        }
                    });
                }, observeOptions);
                _follow = _observer.observe.bind(_observer);
            }
            function _loop(node) {
                if (!node[_hasAttribute](_attrDefered)) {
                    node[_setAttribute](_attrDefered, node[_nodeName]);
                    (_follow || _reveal)(node);
                }
            }
            _find(selector || '[data-src]')[_forEach](_loop);
        }, delay);
    };

    /*
    |--------------------------------------------------------------------------
    | Main
    |--------------------------------------------------------------------------
    */

    // Listens for the load event of the global context
    // then starts execution of deferred scripts
    window[_listen](
        'on' + _eventShow in window ? _eventShow : 'load',
        _proceedQueue
    );

    // Expose Defer instance
    window.Defer = defer;

})(this, document, setTimeout);
