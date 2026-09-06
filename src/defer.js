/**
 * Package @shinsenter/defer.js
 * https://www.npmjs.com/package/@shinsenter/defer.js
 *
 * Released under the MIT license
 * https://code.shin.company/defer.js/blob/master/LICENSE
 *
 * MIT License
 *
 * Copyright (c) 2019-2024 Mai Nhut Tan <shin@shin.company>
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
 * 🥇 A small JavaScript library to lazy-load almost anything.
 * Defer.js is dependency-free, efficient, and optimized for Web Vitals.
 *
 * @author    Mai Nhut Tan <shin@shin.company>
 * @copyright 2019-2024 SHIN Company <https://code.shin.company/>
 * @version   3.10.0
 * @license   {@link https://code.shin.company/defer.js/blob/master/LICENSE|MIT}
 */

/*!@shinsenter/defer.js@3.10.0*/
(function (window, NAMESPACE, VERSION, CONST_UNDEFINED) {

  // var NAMESPACE = 'Defer';
  // var VERSION   = '3.10.0';

  /*
  |--------------------------------------------------------------------------
  | Define internal variables for better minification efficiency
  |--------------------------------------------------------------------------
  */

  // Aliases for reusable variables
  var CONST_FALSE = false;

  // Aliases for regular expressions
  var REGEX_READY  = /p/;
  var REGEX_DATA   = /^data-(.+)/;

  // Aliases for HTML tags
  var TAG_LINK      = 'link';
  var TAG_SCRIPT    = 'script';

  // Default CSS selectors
  var SELECTOR_DOM  = '[data-src]';
  var SELECTOR_JS   = TAG_SCRIPT + '[type=deferjs]';

  // Aliases for events
  var EVENT_ERROR     = 'error';
  var EVENT_LOAD      = 'load';
  var EVENT_PAGESHOW  = 'pageshow';
  var TYPE_ADD        = 'add';
  var TYPE_REMOVE     = 'remove';

  // Page events
  var ACTION_EVENTS = 'keydown mousemove mousedown touchstart wheel';
  var WINDOW_EVENT  = 'on' + EVENT_PAGESHOW in window ? EVENT_PAGESHOW : EVENT_LOAD;

  // Aliases for object methods
  var FUNC_SET_ATTR = 'setAttribute';
  var FUNC_SHIFT    = 'shift';

  // Aliases for object attributes
  var ATTR_ASYNC    = 'async';
  var ATTR_HREF     = 'href';
  var ATTR_SRC      = 'src';
  var ATTR_TYPE     = 'type';

  // Aliases for meta types
  var META_CSS      = 'stylesheet';
  var META_PRELOAD  = 'preload';

  /*
  |--------------------------------------------------------------------------
  | Define internal variables for holding library state
  |--------------------------------------------------------------------------
  */

  // The IntersectionObserver feature
  var IntersectionObserver = window.IntersectionObserver;

  // Browser features
  var console   = window.console;
  var document  = window.document;

  // Variables that hold the state of Defer
  var isReady   = REGEX_READY.test(document.readyState);
  var fastQueue = [];
  var lazyQueue = [];

  // Helper functions
  var fnServe = window.setTimeout;
  var fnSlice = fastQueue.slice;

  /*
  |--------------------------------------------------------------------------
  | Simple loggers
  |--------------------------------------------------------------------------
  */

  // Performance labels
  var _DEFER_JS_ = NAMESPACE + ' v' + VERSION;
  var _BOOTSTEP_ = _DEFER_JS_ + ' boot';
  var _LOADSTEP_ = _DEFER_JS_ + ' execution: page load event';
  var _USERSTEP_ = _DEFER_JS_ + ' execution: user events';

  function debug() {
    if (console && 'debug' in console) {
      console.debug.bind(console, _DEFER_JS_).apply(console, fnSlice.call(arguments));
    }
  }

  function log(text, color) {
    if (console && 'log' in console) {
      console.log('%c 🥇 ' + text, 'color:' + color);
    }
  }

  function perf_begin(label) {
    if (console && 'time' in console) {
      console.debug('Perf: ⏩ ' + label);
      console.time('Perf: ⏱️ ' + label);
    }
  }

  function perf_end(label) {
    if (console && 'timeEnd' in console) {
      console.timeEnd('Perf: ⏱️ ' + label);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Define the defer function
  |--------------------------------------------------------------------------
  */

  // Debug message
  log(_DEFER_JS_ + ' is initializing...', '#888');

  // The core of the library
  function $$(func, delay, lazy, _callee) {
    if (isReady) {
      fnServe(func, delay);
    } else {
      lazy = lazy === CONST_UNDEFINED ? $$.lazy : lazy;
      if (lazy > 1) {
        _callee = func;

        // Create a wrapper function for the original function
        func = function () {
          if (_callee) {
            _callee();
            _callee = CONST_UNDEFINED;
          }
        }

        fastQueue.push(func, lazy);
      }

      (lazy ? lazyQueue : fastQueue).push(
        func,
        // A temporary fix for issue #121
        // See: https://code.shin.company/defer.js/discussions/122
        // Further reading: https://webkit.org/blog/5610/more-responsive-tapping-on-ios/
        Math.max(lazy ? 350 : 0, delay)
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Define internal functions
  |--------------------------------------------------------------------------
  */

  // Normalize attributes of a DOM node
  function _fnAttributes(attributes) {
    attributes = attributes || {};

    if (typeof attributes == 'string') {
      attributes = {
        'id': attributes
      };
    }

    return attributes;
  }

  // Attach/detach event listeners
  function _fnEventHelper(type, events, callback, target) {
    _fnForEach(events.split(' '), function (event) {
      (target || window)[type + 'EventListener'](event, callback || _boot);
    });
  }

  // Loop through each item in a list and pass it to a callback function
  function _fnForEach(list, callback) {
    list.map(callback);
  }

  // Loop through all attributes of a DOM node
  // A snapshot array is required: some callbacks (e.g. fnDeferReveal) call
  // setAttribute() mid-loop, which would mutate a live NamedNodeMap.
  function _fnLoopAttributes(node, callback) {
    _fnForEach(fnSlice.call(node.attributes), function (attribute) {
      callback(attribute.name, attribute.value);
    });
  }

  // Create a new fresh DOM node
  function _fnNewNode(nodeName, attributes, callback, attach, _node, _attr) {
    // Debug message
    debug('Creating a new DOM node.', nodeName, attributes);

    _node = document.createElement(nodeName);

    if (callback) {
      _fnEventHelper(TYPE_ADD, EVENT_LOAD, callback, _node);
    }

    if (attributes) {
      for (_attr in attributes) {
        _node[FUNC_SET_ATTR](_attr, attributes[_attr]);
      }
    }

    if (attach) {
      document.head.appendChild(_node);

      // Debug message
      debug('A DOM node has been attached.', _node);
    }

    return _node;
  }

  // Simple DOM query selector
  function _fnQueryAll(selector, context) {
    return fnSlice.call((context || document).querySelectorAll(selector));
  }

  /*
  |--------------------------------------------------------------------------
  | Public functions
  |--------------------------------------------------------------------------
  */

  // Reveal a DOM node deferred by the library
  function fnDeferReveal(node, unveiledClass) {
    // Reveal descendant children nodes
    _fnForEach(_fnQueryAll('source,img', node), fnDeferReveal);

    // Transform "data-xxx" attributes to non-"data-" attributes
    _fnLoopAttributes(node, function (name, value, _matches) {
      _matches = REGEX_DATA.exec(name);

      if (_matches) {
        node[FUNC_SET_ATTR](_matches[1], value);
      }
    });

    // Debug message
    debug('A DOM node has been unveiled.', node);

    // Append new class names
    if (typeof unveiledClass == 'string') {
      node.className += ' ' + unveiledClass;
    }

    // Call the load() method to reset the media
    if (node[EVENT_LOAD]) {
      node[EVENT_LOAD]();
    }
  }

  // The core of the Defer.dom method
  function fnDeferDom(
    selector,
    delay,
    unveiledClass,
    resolver,
    observeOptions
  ) {
    function ___(_observer) {
      // Reveal an observed node
      function _unveil(node) {
        if (_observer) {
          // Stop observing the target element
          _observer.unobserve(node);
        }

        if (!resolver || resolver(node) !== CONST_FALSE) {
          // Reveal the node
          fnDeferReveal(node, unveiledClass);
        }
      }

      // Watch a node for intersection with the viewport
      function _watch(node) {
        if (!node[NAMESPACE]) {
          // Mark this element as initialized
          node[NAMESPACE] = $$;

          // Observe or reveal a node
          _observer ? _observer.observe(node) : _unveil(node);
        }
      }

      // Create intersection observer
      if (IntersectionObserver) {
        _observer = new IntersectionObserver(function (nodes) {
          _fnForEach(nodes, function (entry) {
            // Reveal the node when it intersects with the viewport
            if (entry.isIntersecting) {
              _unveil(entry.target);
            }
          });
        }, observeOptions);
      } else {
        _observer = CONST_UNDEFINED;
      }

      // Collect target nodes and register them to the observer
      _fnForEach(_fnQueryAll(selector || SELECTOR_DOM), _watch);
    }

    // Add the internal script to the queue
    // NOTE: lazy mode should be disabled for DOM manipulations
    $$(___, delay, CONST_FALSE);
  }

  // The core of the Defer.all method
  function fnDeferScripts(selector, delay, lazy) {
    function ___(_scripts) {
      var _debug_ = 'Defer.all(' +
        (selector || SELECTOR_JS) + ', ' +
        (delay || 0) + ', ' +
        (lazy === CONST_UNDEFINED ? $$.lazy : lazy) + ')';
      perf_begin(_debug_);

      // Execute queued script tags in the order they were queued
      function _dequeue(_node, _clone, _download) {
        // Shift the next script tag from the front of the queue
        _node = _scripts[FUNC_SHIFT]();

        if (_node) {
          _clone = {};

          // Apply "data-*" attributes to the node
          fnDeferReveal(_node);

          // Copy the attributes from the original node
          // A "data-type" attribute lets the clone keep a real type (e.g.
          // "module"); otherwise the original sentinel (deferjs, my-magic,
          // ...) must not reach the clone.
          _fnLoopAttributes(_node, function (name, value) {
            if (name != ATTR_TYPE) {
              _clone[name == 'data-type' ? ATTR_TYPE : name] = value;
            }
          });

          // If the script contains an src attribute and is not an async script,
          // then set the download flag to true
          _download = _clone[ATTR_SRC] && !(ATTR_ASYNC in _clone);

          // Clone the node
          _clone = _fnNewNode(TAG_SCRIPT, _clone);

          // Copy the node's text content
          _clone.text = _node.text;

          // Replace the original node with the cloned node
          debug('A DOM node will be replaced.', _download ? 'WAIT' : '', _clone);
          _node.parentNode.replaceChild(_clone, _node);

          if (_download) {
            // Dequeue the next script after the download is completed
            _fnEventHelper(TYPE_ADD, EVENT_LOAD + ' ' + EVENT_ERROR, _dequeue, _clone);
          } else {
            // Execute the next script
            _dequeue();
          }
        } else {
          perf_end(_debug_);
        }
      }

      // Create preload hint for a script node
      function _preload(node, _clone) {
        if (node[ATTR_SRC]) {
          _clone = {};

          // Copy the attributes from the original node
          _fnLoopAttributes(node, function (name, value) {
            if (name != ATTR_TYPE) {
              _clone[name == ATTR_SRC ? ATTR_HREF : name] = value;
            }
          });

          // Override preload attributes
          _clone.as  = TAG_SCRIPT;
          _clone.rel = META_PRELOAD;

          // Create and attach the new node to the document
          _fnNewNode(TAG_LINK, _clone, CONST_UNDEFINED, window);
        }
      }

      // Collect target script tags for lazy loading
      _scripts = _fnQueryAll(selector || SELECTOR_JS);

      // if (!isReady) {
      // Add preload nodes
      _fnForEach(_scripts, _preload);
      // }

      // Start lazy loading script tags
      _dequeue();
    }

    // Add the internal script to the queue
    $$(___, delay, lazy);
  }

  // The core of the Defer.css method
  function fnDeferCss(fileUrl, attributes, delay, onload, lazy) {
    attributes      = _fnAttributes(attributes);
    attributes.href = fileUrl;
    attributes.rel  = META_CSS;

    // Attach the new node to the document
    function ___() {
      _fnNewNode(TAG_LINK, attributes, onload, window);
    }

    // Add the internal script to the queue
    $$(___, delay, lazy);
  }

  // The core of the Defer.js method
  function fnDeferJs(fileUrl, attributes, delay, onload, lazy) {
    attributes     = _fnAttributes(attributes);
    attributes.src = fileUrl;

    // Attach the new node to the document
    function ___() {
      _fnNewNode(TAG_SCRIPT, attributes, onload, window);
    }

    // Add the internal script to the queue
    $$(___, delay, lazy);
  }

  /*
  |--------------------------------------------------------------------------
  | Boot function (on page load or user interactions)
  |--------------------------------------------------------------------------
  */

  // Handle events
  function _boot(event, _queue) {
    // Debug message
    log(_DEFER_JS_ + ': "' + event.type + '" event was triggered.', '#90f');

    if (isReady) {
      // Debug message
      log(_DEFER_JS_ + ': a user interaction detected!', '#09f');
      perf_begin(_USERSTEP_);

      // Remove user events for lazy tasks
      _fnEventHelper(TYPE_REMOVE, ACTION_EVENTS);

      // Debug message
      log(_DEFER_JS_ + ': ' + lazyQueue.length / 2 + ' lazy task(s) will execute from now!', '#f90');

      // Select the queue to be served
      _queue = lazyQueue;
    } else {
      // Debug message
      log(_DEFER_JS_ + ': page has fully loaded!', '#09f');
      perf_end(_BOOTSTEP_);
      perf_begin(_LOADSTEP_);

      // Remove browser event listening
      _fnEventHelper(TYPE_REMOVE, WINDOW_EVENT);

      // Debug message
      log(_DEFER_JS_ + ': ' + fastQueue.length / 2 + ' queued task(s) will execute from now!', '#f09');
      log(_DEFER_JS_ + ': ' + lazyQueue.length / 2 + ' other task(s) will be delayed until user interaction.', '#f90');

      // Tell the core that the page has fully loaded
      isReady = $$;

      // Add user event watchers for lazy tasks if not empty
      if (lazyQueue[0]) {
        _fnEventHelper(TYPE_ADD, ACTION_EVENTS);
        log(ACTION_EVENTS);
      }

      // Debug message
      log(_DEFER_JS_ + ' is now ready!', '#9a3');

      // Select the queue to be served
      _queue = fastQueue;
    }

    // Serve all queued tasks
    while (_queue[0]) {
      fnServe(_queue[FUNC_SHIFT](), _queue[FUNC_SHIFT]());
    }

    // Debug message
    if (event.type == WINDOW_EVENT) {
      perf_end(_LOADSTEP_);
    } else {
      perf_end(_USERSTEP_);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Define defer utility functions to be publicly exposed
  |--------------------------------------------------------------------------
  */

  // Expose public methods
  $$.all    = fnDeferScripts;
  $$.dom    = fnDeferDom;
  $$.css    = fnDeferCss;
  $$.js     = fnDeferJs;
  $$.reveal = fnDeferReveal;

  // Expose the Defer instance
  window[NAMESPACE] = $$;

  if (!isReady) {
    // Debug message
    log(_DEFER_JS_ + ' was injected!', '#888');
    perf_begin(_BOOTSTEP_);

    // Add an event listener for the page load event
    _fnEventHelper(TYPE_ADD, WINDOW_EVENT);
  }

  // Reveal script tags with type="deferjs"
  fnDeferScripts();

})(this, 'Defer', '3.10.0');
