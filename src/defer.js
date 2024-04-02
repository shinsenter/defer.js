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
 * 🥇 A JavaScript micro-library that helps you lazy load (almost) anything.
 * Defer.js is zero-dependency, super-efficient, and Web Vitals friendly.
 *
 * @author    Mai Nhut Tan <shin@shin.company>
 * @copyright 2019-2024 SHIN Company <https://code.shin.company/>
 * @version   3.8.0
 * @license   {@link https://code.shin.company/defer.js/blob/master/LICENSE|MIT}
 */

/*!@shinsenter/defer.js@3.8.0*/
(function (window, NAMESPACE, VERSION, CONST_UNDEFINED) {

  // var NAMESPACE = 'Defer';
  // var VERSION   = '3.8.0';

  /*
  |--------------------------------------------------------------------------
  | Defines internal variables for a better minification rate
  |--------------------------------------------------------------------------
  */

  // aliases for reusable variables
  var CONST_FALSE     = false;
  var CONST_TAP_DELAY = 350;

  // aliases for regular expressions
  var REGEX_READY  = /p/;
  var REGEX_DATA   = /^data-(.+)/;

  // aliases for HTML tags
  var TAG_LINK      = 'link';
  var TAG_SCRIPT    = 'script';

  // default CSS selectors
  var SELECTOR_DOM  = '[data-src]';
  var SELECTOR_JS   = TAG_SCRIPT + '[type=deferjs]';

  // aliases for events
  var EVENT_ERROR     = 'error';
  var EVENT_LOAD      = 'load';
  var EVENT_PAGESHOW  = 'pageshow';
  var TYPE_ADD        = 'add';
  var TYPE_REMOVE     = 'remove';

  // page events
  var ACTION_EVENTS = 'touchstart mousemove mousedown keydown wheel';
  var WINDOW_EVENT  = 'on' + EVENT_PAGESHOW in window ? EVENT_PAGESHOW : EVENT_LOAD;

  // aliases for object methods
  var FUNC_SET_ATTR = 'setAttribute';
  var FUNC_SHIFT    = 'shift';

  // aliases for object attributes
  var ATTR_ASYNC    = 'async';
  var ATTR_HREF     = 'href';
  var ATTR_SRC      = 'src';
  var ATTR_TYPE     = 'type';

  // aliases for meta types
  var META_CSS      = 'stylesheet';
  var META_LAZY     = 'lazy';
  var META_PRELOAD  = 'preload';

  /*
  |--------------------------------------------------------------------------
  | Defines internal variables for holding state of the library
  |--------------------------------------------------------------------------
  */

  // the IntersectionObserver feature
  var IntersectionObserver = window.IntersectionObserver;

  // browser features
  var console   = window.console;
  var document  = window.document;

  // variables that hold the state of Defer
  var isReady   = REGEX_READY.test(document.readyState);
  var fastQueue = [];
  var lazyQueue = [];

  // helper functions
  var fnServe = window.setTimeout;
  var fnSlice = fastQueue.slice;

  /*
  |--------------------------------------------------------------------------
  | Simple loggers
  |--------------------------------------------------------------------------
  */

  // performance labels
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
  | Defines the defer function
  |--------------------------------------------------------------------------
  */

  // debug
  log(_DEFER_JS_ + ' is initializing...', '#888');

  // the heart of the library
  function $$(func, delay, lazy, _callee) {
    if (isReady) {
      fnServe(func, delay);
    } else {
      lazy = lazy === CONST_UNDEFINED ? $$[META_LAZY] : lazy;
      if (lazy > 1) {
        _callee = func;

        // create a wrapper function for the original function
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
        // A temporary fix for the issue #121
        // See: https://code.shin.company/defer.js/discussions/122
        Math.max(lazy ? CONST_TAP_DELAY : 0, delay)
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Defines internal functions
  |--------------------------------------------------------------------------
  */

  // normalizes attributes of a DOM node
  function _fnAttributes(attributes) {
    attributes = attributes || {};

    if (typeof attributes == 'string') {
      attributes = {'id': attributes};
    }

    return attributes;
  }

  // attaches/detaches event listeners
  function _fnEventHelper(type, events, callback, target) {
    _fnForEach(events.split(' '), function (event) {
      (target || window)[type + 'EventListener'](event, callback || _boot);
    });
  }

  // loops and passes each item in a list to a callback function
  function _fnForEach(list, callback) {
    list.map(callback);
  }

  // loops through all attributes of a DOM node
  function _fnLoopAttributes(node, callback) {
    _fnForEach(fnSlice.call(node.attributes), function (attribute) {
      callback(attribute.name, attribute.value);
    });
  }

  // creates a new fresh DOM node
  function _fnNewNode(nodeName, attributes, callback, inject, _node, _attr) {
    // debug
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

    if (inject) {
      document.head.appendChild(_node);

      // debug
      debug('A DOM node has been attached.', _node);
    }

    return _node;
  }

  // a simple DOM query selector
  function _fnQueryAll(selector, context) {
    return fnSlice.call((context || document).querySelectorAll(selector));
  }

  /*
  |--------------------------------------------------------------------------
  | Public functions
  |--------------------------------------------------------------------------
  */

  // reveals a DOM node deferred by the library
  function fnDeferReveal(node, unveiledClass) {
    // reveals descendant children nodes
    _fnForEach(_fnQueryAll('source,img', node), fnDeferReveal);

    // transforms "data-xxx" attributes to non-"data-" attributes
    _fnLoopAttributes(node, function (name, value, _matches) {
      _matches = REGEX_DATA.exec(name);

      if (_matches) {
        node[FUNC_SET_ATTR](_matches[1], value);
      }
    });

    // debug
    debug('A DOM node has been unveiled.', node);

    // appends new class names
    if (typeof unveiledClass == 'string') {
      node.className += ' ' + unveiledClass;
    }

    // calls load() method to reset the media
    if (node[EVENT_LOAD]) {
      node[EVENT_LOAD]();
    }
  }

  // the core of the Defer.dom
  function fnDeferDom(
    selector,
    delay,
    unveiledClass,
    resolver,
    observeOptions
  ) {
    function ___(_observer) {
      // unveils an observed node
      function _unveil(node) {
        if (!resolver || resolver(node) !== CONST_FALSE) {
          fnDeferReveal(node, unveiledClass);
        }
      }

      // watches a node for its appeal
      function _watch(node) {
        if (!node[NAMESPACE]) {
          // marks this element is initialized
          node[NAMESPACE] = $$;

          // observes or unveils a node
          _observer ? _observer.observe(node) : _unveil(node);
        }
      }

      // creates intersection observer
      if (IntersectionObserver) {
        _observer = new IntersectionObserver(function (nodes) {
          _fnForEach(nodes, function (entry, _node) {
            if (entry.isIntersecting) {
              // stops observing the target element
              _observer.unobserve(_node = entry.target);

              // reveals the node
              _unveil(_node);
            }
          });
        }, observeOptions);
      } else {
        _observer = CONST_UNDEFINED;
      }

      // collects target nodes and registers them to the observer
      _fnForEach(_fnQueryAll(selector || SELECTOR_DOM), _watch);
    }

    // adds the internal script to the queue
    // NOTE: the lazy mode should be disable for DOM manipulations
    $$(___, delay, CONST_FALSE);
  }

  // the core of the Defer.all
  function fnDeferScripts(selector, delay, lazy) {
    function ___(_scripts) {
      var _debug_ = 'Defer.all(' +
        (selector || SELECTOR_JS) + ', ' +
        (delay || 0) + ', ' +
        (lazy === CONST_UNDEFINED ? $$[META_LAZY] : lazy) + ')';
      perf_begin(_debug_);

      // executes queued script tags in the order they were queued
      function _dequeue(_node, _clone, _download) {
        // shifts the next script tag in the front of the queue
        _node = _scripts[FUNC_SHIFT]();

        if (_node) {
          _clone = {};

          // copies the attributes from the original node
          _fnLoopAttributes(_node, function (name, value) {
            if (name != ATTR_TYPE) {
              _clone[name] = value;
            }
          });

          // if the script contains an src attribute and is not an async script
          // then sets the download flag to true
          _download = _clone[ATTR_SRC] && !(ATTR_ASYNC in _clone);

          // clones the node
          _clone = _fnNewNode(TAG_SCRIPT, _clone);

          // copies he node's text content
          _clone.text = _node.text;

          // replaces the original node with the cloned node
          debug('A DOM node will be replaced.', _download ? 'WAIT' : '', _clone);
          _node.parentNode.replaceChild(_clone, _node);

          if (_download) {
            // dequeues the next script after the download is completed
            _fnEventHelper(TYPE_ADD, EVENT_LOAD + ' ' + EVENT_ERROR, _dequeue, _clone);
          } else {
            // executes the next script
            _dequeue();
          }
        } else {
          perf_end(_debug_);
        }
      }

      // creates preload hint for a script node
      function _preload(node, _clone) {
        if (node[ATTR_SRC]) {
          _clone = {};

          // copies the attributes from the original node
          _fnLoopAttributes(node, function (name, value) {
            if (name != ATTR_TYPE) {
              _clone[name == ATTR_SRC ? ATTR_HREF : name] = value;
            }
          });

          // overrides its preload attributes
          _clone.as  = TAG_SCRIPT;
          _clone.rel = META_PRELOAD;

          // creates and attaches the new node to the document
          _fnNewNode(TAG_LINK, _clone, CONST_UNDEFINED, window);
        }
      }

      // collects target script tags for lazy loading
      _scripts = _fnQueryAll(selector || SELECTOR_JS);

      // if ($$[META_PRELOAD] !== CONST_FALSE) {
      // adds preload nodes
      _fnForEach(_scripts, _preload);
      // }

      // starts the lazy loading script tags
      _dequeue();
    }

    // adds the internal script to the queue
    $$(___, delay, lazy);
  }

  // the core of the Defer.css
  function fnDeferCss(fileUrl, attributes, delay, onload, lazy) {
    attributes      = _fnAttributes(attributes);
    attributes.href = fileUrl;
    attributes.rel  = META_CSS;

    // attaches the new node to the document
    function ___() {
      _fnNewNode(TAG_LINK, attributes, onload, window);
    }

    // adds the internal script to the queue
    $$(___, delay, lazy);
  }

  // the core of the Defer.js
  function fnDeferJs(fileUrl, attributes, delay, onload, lazy) {
    attributes     = _fnAttributes(attributes);
    attributes.src = fileUrl;

    // attaches the new node to the document
    function ___() {
      _fnNewNode(TAG_SCRIPT, attributes, onload, window);
    }

    // adds the internal script to the queue
    $$(___, delay, lazy);
  }

  /*
  |--------------------------------------------------------------------------
  | Boot function (on page load / user interactions)
  |--------------------------------------------------------------------------
  */

  // handles events
  function _boot(event, _queue) {
    // debug
    log(_DEFER_JS_ + ': "' + event.type + '" event was triggered.', '#90f');

    if (isReady) {
      // debug
      log(_DEFER_JS_ + ': a user interaction detected!', '#09f');
      perf_begin(_USERSTEP_);

      // removes user events for lazy tasks
      _fnEventHelper(TYPE_REMOVE, ACTION_EVENTS);

      // debug
      log(_DEFER_JS_ + ': ' + lazyQueue.length / 2 + ' lazy task(s) will execute from now!', '#f90');

      // selects the queue to be served
      _queue = lazyQueue;
    } else {
      // debug
      log(_DEFER_JS_ + ': page has fully loaded!', '#09f');
      perf_end(_BOOTSTEP_);
      perf_begin(_LOADSTEP_);

      // removes browser event listening
      _fnEventHelper(TYPE_REMOVE, WINDOW_EVENT);

      // debug
      log(_DEFER_JS_ + ': ' + fastQueue.length / 2 + ' queued task(s) will execute from now!', '#f09');
      log(_DEFER_JS_ + ': ' + lazyQueue.length / 2 + ' other task(s) will be delayed until there is user interaction.', '#f90');

      // tells the core that the page has fully loaded
      isReady = $$;

      // adds user event watchers for lazy tasks if it is not empty
      if (lazyQueue[0]) {
        _fnEventHelper(TYPE_ADD, ACTION_EVENTS);
        log(ACTION_EVENTS);
      }

      // debug
      log(_DEFER_JS_ + ' is now ready!', '#9a3');

      // selects the queue to be served
      _queue = fastQueue;
    }

    // serves all queued tasks
    while (_queue[0]) {
      fnServe(_queue[FUNC_SHIFT](), _queue[FUNC_SHIFT]());
    }

    // debug
    if (event.type == WINDOW_EVENT) {
      perf_end(_LOADSTEP_);
    } else {
      perf_end(_USERSTEP_);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Defines defer utility functions will be publicly exposed
  |--------------------------------------------------------------------------
  */

  // exposes public methods
  $$.all    = fnDeferScripts;
  $$.dom    = fnDeferDom;
  $$.css    = fnDeferCss;
  $$.js     = fnDeferJs;
  $$.reveal = fnDeferReveal;

  // exposes the Defer instance
  window[NAMESPACE] = $$;

  if (!isReady) {
    // debug
    log(_DEFER_JS_ + ' was injected!', '#888');
    perf_begin(_BOOTSTEP_);

    // adds an event listener for the page load event
    _fnEventHelper(TYPE_ADD, WINDOW_EVENT);
  }

  // unveils the script tags with type="deferjs"
  fnDeferScripts();

})(this, 'Defer', '3.8.0');
