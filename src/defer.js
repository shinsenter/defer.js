/**
 * Package @shinsenter/defer.js
 * https://www.npmjs.com/package/@shinsenter/defer.js
 *
 * Released under the MIT license
 * https://code.shin.company/defer.js/blob/master/LICENSE
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
 * that helps you lazy load almost everything
 * like images, video, audio, iframes as well as stylesheets, and JavaScript.
 *
 * @author    Mai Nhut Tan <shin@shin.company>
 * @copyright 2021 AppSeeds <https://code.shin.company/>
 * @version   2.6.0
 * @license   {@link https://code.shin.company/defer.js/blob/master/LICENSE|MIT}
 */

/*@shinsenter/defer.js@2.6.0*/
(function (window, document, worker) {

  /*
  |--------------------------------------------------------------------------
  | Define shared variables, this helps to maximize the output minification
  |--------------------------------------------------------------------------
  */

  // The defer instance
  var defer;

  // Constant values
  var _dataRegExp   = /^data-(.+)/;
  var _IO           = 'IntersectionObserver';

  // Common attributes
  var _lazied       = 'deferjs';
  var _load         = 'load';
  var _pageshow     = 'pageshow';

  // Method aliases
  var _forEach      = 'forEach';
  var _hasAttribute = 'hasAttribute';
  var _listen       = 'addEventListener';
  var _setAttribute = 'setAttribute';
  var _shift        = 'shift';

  // CSS Selectors
  var _selectorJS   = '[type=deferjs]';
  var _selectorDOM  = '[data-src]';

  // State holders
  var _booted       = (/p/).test(document.readyState);
  var _queue        = [];
  var _slice        = _queue.slice;

  /*
  |--------------------------------------------------------------------------
  | Utility functions are shared within internal scope
  |--------------------------------------------------------------------------
  */

  function _appendToHead(node) {
    document.head.appendChild(node);
  }

  function _attrLoop(node, callback) {
    _slice.call(node.attributes)[_forEach](callback);
  }

  function _newNode(nodeName, id, callback, _node) {
    _node = (id ? document.getElementById(id) : _node) ||
            document.createElement(nodeName);

    if (id) {
      _node.id = id;
    }

    if (callback) {
      _node.onload = callback;
    }

    return _node;
  }

  function _query(selector, parent) {
    return _slice.call((parent || document).querySelectorAll(selector));
  }

  function _reveal(node, revealedClass) {
    // Reveal children source nodes
    _query('source', node)[_forEach](_reveal);

    // Transform data-xxx attributes to normal attributes
    _attrLoop(node, function (_attr, _found) {
      _found = _dataRegExp.exec(_attr.name);

      if (_found) {
        node[_found[1]] = _attr.value;
      }
    });

    if (revealedClass) {
      node.className += ' ' + revealedClass;
    }

    // Call element's load() method if exists
    if (_load in node) {
      node[_load]();
    }
  }

  function _scripts(selector) {
    // Defer action until page loaded
    defer(function (_found) {
      _found = _query(selector || _selectorJS);

      function _next(_node, _clone) {
        _node = _found[_shift]();

        if (_node) {
          // Remove the node from DOM tree
          _node.parentNode.removeChild(_node);

          // Clone the node
          _clone = _newNode(_node.nodeName);
          _clone.text = _node.text;

          _attrLoop(_node, function (_attr) {
            if (_attr.name != 'type') {
              _clone[_setAttribute](_attr.name, _attr.value);
            }
          });

          // Execute the node
          if (_clone.src && !_clone[_hasAttribute]('async')) {
            _clone.onload = _clone.onerror = _next;
            _appendToHead(_clone);
          } else {
            _appendToHead(_clone);
            _next();
          }
        }
      }

      _next();
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Defines the defer function and utility functions will be publicly exposed
  |--------------------------------------------------------------------------
  */

  /**
   * The DOM Node interface
   *
   * @typedef
   * @name Node
   * @see  {@link https://developer.mozilla.org/docs/Web/API/Node}
   */

  /**
   * A function is a code snippet that can be called by other code or by itself.
   *
   * @typedef
   * @name Function
   * @see  {@link https://developer.mozilla.org/docs/Glossary/Function}
   */

  /**
   * In this library, a closure is a {@link Function} that gives you access to a DOM {@link Node} element.
   *
   * @typedef
   * @extends {Function}
   * @name    Closure
   * @param   {Node} element - The DOM {@link Node} element
   * @see     {@link https://developer.mozilla.org/docs/Web/JavaScript/Closures}
   */

  /**
   * This function is used when you want to defer a JavaScript code block
   * and reduce the impact of its execution on page load performance.
   *
   * A JavaScript block called by the `Defer()` function
   * is always guaranteed to be executed after your web page
   * has completely loaded other essential resources.
   *
   * @function Defer
   * @since    2.0
   * @param    {Function} func - The function that will be deferred.
   * @param    {number}   [delay=0] - The duration in miliseconds to delay the `func` function.
   * @returns  {void}
   *
   * @example
   * Basic example.
   *
   * ```js
   * Defer(function() {
   *   // Put JavaScript code block here
   *   // and it will be executed after your page has finished loading.
   *   runMyHeavyFunction();
   *   runLongTasks();
   *   // or
   *   runMyAjaxRequests();
   *   connectTo3rdPartyServices();
   * });
   * ```
   *
   * @example
   * The jQuery's `get` and `fadeIn()` functions
   * often affect DOM structure of web page and slows down page performance.
   * Calling `fadeIn()` with `Defer()` will reduce the impact significantly.
   *
   * ```js
   * Defer(function() {
   *   // A common example of using jQuery functions.
   *   // These functions may affect DOM structure if not deferred.
   *   jQuery.get('https://appseeds.net/api', function(result) {
   *     jQuery('#mydiv').hide().append(result);
   *     jQuery('#mydiv').fadeIn().show();
   *   });
   * }, 2000);
   * // The number 2000 means Defer() will delay execution
   * // of above jQuery functions after 2000ms when the page has finished loading.
   * ```
   */
  defer = function (func, delay) {
    if (_booted) {
      worker(func, delay);
    } else {
      _queue.push(func, delay);
    }
  };

  /**
   * Applying above `Defer()` function to all script tags on your website
   * may take time. The `Defer.all()` function below can be a great help.
   *
   * Simply replace the `type` attribute of script tags to `type="deferjs"`
   * and this library will automatically lazyload
   * all script tags with this attribute attached.
   *
   * By default, the `Defer.all()` function is triggered automatically.
   *
   * @function Defer.all
   * @since    2.0
   * @param    {string} [selector=[type=deferjs]] - A CSS selector that queries script tags will be deferred.
   * @returns  {void}
   *
   * @example
   * Basic usage.
   *
   * Before:
   * ```html
   * <script type="text/javascript" src="/path/to/external-javascript.js"></script>
   * <script>
   *   // Example of JavaScript code block
   * </script>
   * ```
   *
   * After replacing `type` attributes to `type="deferjs"`:
   * ```html
   * <script type="deferjs" src="/path/to/external-javascript.js"></script>
   * <script type="deferjs">
   *   // Example of JavaScript code block
   * </script>
   * ```
   *
   * @example
   * If you don't want to use `type="deferjs"` syntax,
   * you can easily choose your own name.
   *
   * This example uses `type="myjs"` instead of `type="deferjs"`:
   * ```html
   * <script type="myjs" src="/path/to/heavy-javascript.js"></script>
   * <script type="myjs">
   *   // Some heavy DOM manipulations here
   * </script>
   *
   * <!-- HTML content trimmed -->
   *
   * <!-- Call Defer.all() after all other script tags -->
   * <script>Defer.all('script[type="myjs"]');</script>
   * ```
   *
   * *Important note:* make sure `Defer.all('script[type="myjs"]');` is placed
   * after all other script tags, such as very bottom of the `body` tag.
   */
  defer.all = _scripts;

  /**
   * For lazy loading external JavaScript files.
   *
   * This function is useful when you don't want heavy JavaScript
   * (especially the widgets of social networks, ad services)
   * to affect your website loading speed.
   *
   * @function Defer.js
   * @since    2.0
   * @param    {string}  src - URL to the js file that should be lazy loaded.
   * @param    {string}  [id] - The ID will be assigned to the script tag to avoid downloading the same file multiple times.
   * @param    {number}  [delay=0] - The duration in miliseconds to delay loading the js file.
   * @param    {Closure} [callback] - The callback function will be executed if the js file is successfully loaded.
   * @returns  {void}
   *
   * @example
   * Delay loading of Facebook SDK after 3000ms.
   * Then use a `callback` function trigger a Share dialog.
   *
   * ```js
   * window.fbAsyncInit = function() {
   *   FB.init({
   *     appId            : 'your-app-id',
   *     autoLogAppEvents : true,
   *     xfbml            : true,
   *     version          : 'v11.0'
   *   });
   * };
   *
   * Defer.js('https://connect.facebook.net/en_US/sdk.js', 'fb-sdk', 3000, function () {
   *   // trigger a Share dialog when the SDK loaded
   *   FB.ui({
   *     method: 'share',
   *     href: 'https://developers.facebook.com/docs/'
   *   }, function(response){});
   * });
   * ```
   */
  defer.js = function (src, id, delay, callback) {
    defer(function (_node) {
      _node = _newNode('SCRIPT', id, callback);
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
   * @since    2.0
   * @param    {string}  src - URL to the css file that should be lazy loaded.
   * @param    {string}  [id] - The ID will be assigned to the script tag to avoid downloading the same file multiple times.
   * @param    {number}  [delay=0] - The duration in miliseconds to delay loading the css file.
   * @param    {Closure} [callback] - The callback function will be executed if the css file is successfully loaded.
   * @returns  {void}
   *
   * @example
   * Lazy load FontAwesome Webfont from its CDN.
   *
   * ```js
   * Defer.css('https://pro.fontawesome.com/releases/v5.10.0/css/all.css', 'fa5-css');
   * ```
   *
   * @example
   * Delay loading animate.css from CDN,
   * then use a `callback` function to add some animations to `h1` tag.
   *
   * ```js
   * Defer.css('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css', 'animate-css', 1000, function () {
   *   jQuery('h1').addClass('animate__animated animate__bounce');
   * });
   * ```
   */
  defer.css = function (src, id, delay, callback) {
    defer(function (_node) {
      _node = _newNode('LINK', id, callback);
      _node.rel  = 'stylesheet';
      _node.href = src;
      _appendToHead(_node);
    }, delay);
  };

  /**
   * For lazy loading attributes of any element on web page.
   *
   * Basically, this library use a feature called [IntersectionObserver](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API) to reveal an element
   * when user is scrolling to the position
   * where it appears within the browser's viewport.
   *
   * The `Defer.dom` function also converts its `data-*` attributes
   * into regular attributes (e.g. from `data-src` to `src`),
   * so you can use this to lazyload your images and iframes as well.
   *
   * @function Defer.dom
   * @since    2.0
   * @param    {string}  [selector=[data-src]] - A CSS selector that queries elements will be lazy loaded.
   * @param    {number}  [delay=0] - The duration in miliseconds to delay the lazy loading for the elements.
   * @param    {string}  [revealedClass] - A CSS class will be added automatically after when an element has been successfully revealed.
   * @param    {Closure} [validator] - A function will be executed with element will be lazy loaded as its argument.
   * If the function returns `false`, lazy loading for that element will be skipped.
   * @param    {object}  [observeOptions] - [Intersection observer options](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)
   * @returns  {void}
   *
   * @example
   * Basic usage:
   * Lazy load all `<img>` tags which have CSS class `lazy`.
   *
   * ```html
   * <!-- Here may be a very long content -->
   *
   * <img class="lazy" alt="Photo 1" data-src="https://picsum.photos/200/300?random=1" width="200" height="300" />
   * <img class="lazy" alt="Photo 2" data-src="https://picsum.photos/200/300?random=2" width="200" height="300" />
   * <img class="lazy" alt="Photo 3" data-src="https://picsum.photos/200/300?random=3" width="200" height="300" />
   *
   * <script>
   *   // Lazy load img tags which have class="lazy"
   *   Defer.dom('img.lazy');
   * </script>
   * ```
   *
   * @example
   * Basic usage:
   * Usage with responsive images.
   *
   * ```html
   * <!-- Here may be a very long content -->
   *
   * <!-- Usage with responsive images -->
   * <img class="lazy" alt="Responsive photo"
   *   width="200" height="300"
   *   data-src="https://picsum.photos/200/300"
   *   sizes="(max-width: 600px) 480px, 800px"
   *   data-srcset="https://picsum.photos/480/640 480w, https://picsum.photos/800/1200 800w" />
   *
   * <script>
   *   // Lazy load img tags which have class="lazy"
   *   Defer.dom('img.lazy');
   * </script>
   * ```
   *
   * @example
   * Basic usage:
   * Lazy load background images of `div` tags.
   *
   * ```html
   * <style>
   *   div.card {
   *     display: inline-block;
   *     background-repeat:no-repeat;
   *     background-size:contain;
   *     margin: 5px;
   *     width: 200px;
   *     height: 300px;
   *   }
   *   div.card.revealed {
   *     box-shadow: 0 0 5px rgb(0 0 0 / 20%);
   *     border-radius: 5px;
   *   }
   * </style>
   *
   * <!-- Here may be a very long content -->
   *
   * <div class="card" bgurl="https://picsum.photos/200/300?random=1">&nbsp;</div>
   * <div class="card" bgurl="https://picsum.photos/200/300?random=2">&nbsp;</div>
   * <div class="card" bgurl="https://picsum.photos/200/300?random=3">&nbsp;</div>
   * <div class="card" bgurl="https://picsum.photos/200/300?random=4">&nbsp;</div>
   *
   * <script>
   *   // Lazy load div tags which have class="card" and bgurl attribute
   *   Defer.dom('div.card[bgurl]', 0, 'revealed', function (div) {
   *     var url = div.getAttribute('bgurl');
   *     if (url) {
   *       div.style.backgroundImage = 'url(' + url + ')';
   *     }
   *   });
   * </script>
   * ```
   *
   * @example
   * Advanced usage:
   * Delay lazy loading `<img>` tags 200ms after the page has completely loaded.
   * Then it will add a CSS class `loaded` to the fully lazy loaded image elements.
   *
   * ```html
   * <!-- Here may be a very long content -->
   *
   * <img class="lazy" alt="Photo 1" data-src="https://picsum.photos/200/300?random=4" width="200" height="300" />
   * <img class="lazy" alt="Photo 2" data-src="https://picsum.photos/200/300?random=5" width="200" height="300" />
   * <img class="lazy" alt="Photo 3" data-src="https://picsum.photos/200/300?random=6" width="200" height="300" />
   *
   * <script>
   *   // Lazy load img tags which have class="lazy"
   *   // then add `loaded` to elements' class attribute.
   *   Defer.dom('img.lazy', 200, 'loaded');
   * </script>
   * ```
   *
   * @example
   * Advanced usage: Lazy load with [Intersection observer options](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)
   *
   * ```html
   * <!-- Here may be a very long content -->
   *
   * <img class="early-lazy" alt="Photo 1" data-src="https://picsum.photos/200/300?random=7" width="200" height="300" />
   * <img class="early-lazy" alt="Photo 2" data-src="https://picsum.photos/200/300?random=8" width="200" height="300" />
   * <img class="early-lazy" alt="Photo 3" data-src="https://picsum.photos/200/300?random=9" width="200" height="300" />
   *
   * <script>
   *   // Preload images within 200% of the current viewport size.
   *   Defer.dom("img.early-lazy", 200, "loaded", null, {
   *     rootMargin: "200%"
   *   });
   * </script>
   * ```
   *
   * @example
   * We can use CSS class that added to the lazy loaded element
   * to add animation to the successfully loaded elements.
   *
   * ```html
   * <style>
   *   img.fade {
   *     transition: opacity 500ms ease-in-out;
   *     opacity: 0;
   *   }
   *   img.fade.revealed {
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
   *
   * <script>
   *   // Lazy load img tags which have class="fade"
   *   // then add `revealed` to elements' class attribute.
   *   Defer.dom('img.fade', 200, 'revealed');
   * </script>
   * ```
   *
   * @example
   * This function can be used similarly for other tags
   * such as `<iframe>`, `<video>`, `<audio>`, `<picture>` tags.
   *
   * ```html
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
   *
   * <script>
   *   // Lazy load all elements which have CSS class `multi-lazy`
   *   Defer.dom('.multi-lazy', 200, 'loaded');
   * </script>
   * ```
   *
   * @example
   * Or even execute a piece of JavaScript
   * when the user scrolls to the element `#scroll_reveal`.
   *
   * ```html
   * <!-- Here may be a very long content -->
   *
   * <div id="scroll_reveal">
   *   This is my content.
   * </div>
   *
   * <script>
   *   // Show an alert when user scrolled to #scroll_reveal
   *   Defer.dom('#scroll_reveal', null, null, function(element) {
   *     window.alert('You scrolled to #' + element.id);
   *   });
   * </script>
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
   *   Defer.dom('pre code', 0, 'ide-loaded', function (block) {
   *     hljs.highlightBlock(block);
   *   });
   * });
   * ```
   */
  defer.dom = function (
    selector,
    delay,
    revealedClass,
    validator,
    observeOptions
  ) {
    function _present(node) {
      if (!validator || validator(node) !== false) {
        _reveal(node, revealedClass);
      }
    }

    function _lazyload(_observer) {
      if (_IO in window) {
        _observer = new window[_IO](function (nodes) {
          nodes[_forEach](function (object, _node) {
            if (object.isIntersecting) {
              _node = object.target;

              if (_node) {
                _observer.unobserve(_node);
                _present(_node);
              }
            }
          });
        }, observeOptions);
      } else {
        _observer = false;
      }

      _query(selector || _selectorDOM)[_forEach](function (node) {
        if (!(_lazied in node)) {
          node[_lazied] = 1;

          if (_observer) {
            _observer.observe(node);
          } else {
            _present(node);
          }
        }
      });
    }

    defer(_lazyload, delay);
  };

  /**
   * Reveals an element which is lazyloaded by the library
   *
   * @function Defer.reveal
   * @since    2.1
   * @param    {Node}   element - The DOM {@link Node} element
   * @param    {string} [revealedClass] - A CSS class will be added automatically after when an element has been successfully revealed.
   * @returns  {void}
   *
   * @example
   * ```js
   * // Show single element
   * var node = document.getElementById('my-video');
   * Defer.reveal(node);
   *
   * // Show multiple elements
   * document.querySelectorAll('.multi-lazy')
   *   .forEach(function(node) {
   *     Defer.reveal(node);
   *   });
   *
   * // Or even shorter way
   * document.querySelectorAll('.multi-lazy').forEach(Defer.reveal);
   *
   * // Add 'loaded' class name after revealed elements
   * document.querySelectorAll('.multi-lazy')
   *   .forEach(function(node) {
   *     Defer.reveal(node, 'loaded');
   *   });
   * ```
   */
  defer.reveal = _reveal;

  /*
  |--------------------------------------------------------------------------
  | Main
  |--------------------------------------------------------------------------
  */

  // Exposes a Defer instance
  window.Defer = defer;

  // Listens for the load event of the global context
  // then starts execution of all deferred scripts
  window[_listen](
    'on' + _pageshow in window ? _pageshow : _load,
    function () {
      for (
        _scripts();
        _queue[0];
        worker(_queue[_shift](), _queue[_shift]())
      ) {
        _booted = 1;
      }
    }
  );

})(this, document, setTimeout);
