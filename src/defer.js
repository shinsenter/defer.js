/**
 * Package @shinsenter/defer.js
 * https://www.npmjs.com/package/@shinsenter/defer.js
 *
 * Released under the MIT license
 * https://code.shin.company/defer.js/blob/master/LICENSE
 *
 * MIT License
 *
 * Copyright (c) 2019-2023 Mai Nhut Tan <shin@shin.company>
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
 * @copyright 2019-2023 SHIN Company <https://code.shin.company/>
 * @version   3.6.0
 * @license   {@link https://code.shin.company/defer.js/blob/master/LICENSE|MIT}
 */

/*!@shinsenter/defer.js@3.6.0*/
(function (window, NAMESPACE, VERSION, CONST_UNDEFINED) {

  // var NAMESPACE = 'Defer';
  // var VERSION   = '3.6.0';

  /*
  |--------------------------------------------------------------------------
  | Defines internal variables for a better minification rate
  |--------------------------------------------------------------------------
  */

  // aliases for reusable variables
  var CONST_FALSE     = false;
  var CONST_TAP_DELAY = 350;

  // aliases for HTML tags
  var TAG_LINK      = 'link';
  var TAG_SCRIPT    = 'script';

  // default CSS selectors
  var SELECTOR_DOM  = '[data-src]';
  var SELECTOR_JS   = TAG_SCRIPT + '[type=deferjs]';

  // aliases for events
  var EVN_ERROR     = 'error';
  var EVN_LOAD      = 'load';
  var EVN_PAGESHOW  = 'pageshow';
  var TYPE_ADD      = 'add';
  var TYPE_REMOVE   = 'remove';

  // page events
  var ACTION_EVENTS = 'touchstart mousemove mousedown keydown wheel';
  var WINDOW_EVENT  = 'on' + EVN_PAGESHOW in window ? EVN_PAGESHOW : EVN_LOAD;

  // aliases for object methods
  var FUNC_GET_ATTR = 'getAttribute';
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
  var document  = window.document || window;

  // variables that hold the state of Defer
  var isReady   = (/p/).test(document.readyState);
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
  function $$(func, delay, lazy) {
    if (isReady) {
      fnServe(func, delay);
    } else {
      lazy = lazy === CONST_UNDEFINED ? $$[META_LAZY] : lazy;
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

  // attaches a DOM node into the <head> tag
  function fnAttach(node) {
    document.head.appendChild(node);

    // debug
    debug('A DOM node has been attached.', node);
  }

  // calls forEach on array-like list
  // and passes only one argument to the callback function
  function fnEach(list, callback) {
    list.forEach(function(item) {callback(item)});
  }

  // attaches/detaches event listeners
  function fnEventHelper(type, events, callback, target) {
    fnEach(events.split(' '), function (event) {
      (target || window)[type + 'EventListener'](event, callback || _boot);
    });
  }

  // creates a new fresh DOM node
  function fnCreateNode(nodeName, id, onload, _node) {
    if (id) {
      _node = document.getElementById(id);
    } else {
      _node = CONST_UNDEFINED;
    }

    if (!_node) {
      _node = document.createElement(nodeName);

      if (id) {
        _node.id = id;
      }
    }

    if (onload) {
      fnEventHelper(TYPE_ADD, EVN_LOAD, onload, _node);
    }

    return _node;
  }

  // loops through all attributes of a DOM node
  function fnLoopAttributes(node, callback) {
    fnEach(fnSlice.call(node.attributes), function (attribute) {
      callback(attribute.name, attribute.value);
    });
  }

  // a simple DOM query selector
  function fnQueryAll(selector, context) {
    return fnSlice.call((context || document).querySelectorAll(selector));
  }

  /*
  |--------------------------------------------------------------------------
  | Utility functions
  |--------------------------------------------------------------------------
  */

  // reveals a DOM node deferred by the library
  function fnDeferReveal(node, unveiledClass) {
    // reveals descendant children nodes
    fnEach(fnQueryAll('source,img', node), fnDeferReveal);

    // transforms data-xxx attributes to normal attributes
    fnLoopAttributes(node, function (name, value, _matches) {
      _matches = (/^data-(.+)/).exec(name);

      if (_matches) {
        node[FUNC_SET_ATTR](_matches[1], value);
      }
    });

    // debug
    debug('A DOM node has been unveiled.', node);

    // appends new class names
    if (unveiledClass) {
      node.className += ' ' + unveiledClass;
    }

    // calls load() method to reset the media
    if (node[EVN_LOAD]) {
      node[EVN_LOAD]();
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
          fnEach(nodes, function (entry, _node) {
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
      fnEach(fnQueryAll(selector || SELECTOR_DOM), _watch);
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
        ((lazy === CONST_UNDEFINED ? $$[META_LAZY] : lazy) ? 'true' : 'false') + ')';
      perf_begin(_debug_);

      // creates preload hint for a script node
      function _preload(node, _hint) {
        if (node.src) {
          // creates a fresh <link> node,
          _hint = fnCreateNode(TAG_LINK);

          // copies the attributes from the original node
          fnLoopAttributes(node, function (name, value) {
            if (name != ATTR_TYPE) {
              _hint[FUNC_SET_ATTR](name == ATTR_SRC ? ATTR_HREF : name, value);
            }
          });

          // appends its preload attributes
          _hint.rel = META_PRELOAD;
          _hint.as  = TAG_SCRIPT;

          // attaches the new node to the document
          fnAttach(_hint);
        }
      }

      // executes queued script tags in the order they were queued
      function _dequeue(_node, _clone) {
        // shifts the next script tag in the front of the queue
        _node = _scripts[FUNC_SHIFT]();

        if (_node) {
          // clones the node
          _clone = fnCreateNode(TAG_SCRIPT);

          // copies all attributes from the node
          fnLoopAttributes(_node, function (name, value) {
            if (name != ATTR_TYPE) {
              _clone[FUNC_SET_ATTR](name, value);
            }
          });

          // copies he node's text content
          _clone.text = _node.text;

          // replaces the original node with the cloned node
          debug('A DOM node will be replaced.', _clone);
          _node.parentNode.replaceChild(_clone, _node);

          // dequeues the next element
          // NOTE 1: the async attribute MUST be checked via getAttribute()
          // NOTE 2: a script tag without src should be loaded async
          // NOTE 3: a script tag with src and async should be loaded async
          if (_clone.src && !_clone[FUNC_GET_ATTR](ATTR_ASYNC)) {
            fnEventHelper(TYPE_ADD, EVN_LOAD + ' ' + EVN_ERROR, _dequeue, _clone);
          } else {
            _dequeue();
          }
        } else {
          perf_end(_debug_);
        }
      }

      // collects target script tags for lazy loading
      _scripts = fnQueryAll(selector || SELECTOR_JS);

      // if ($$[META_PRELOAD] !== CONST_FALSE) {
      // adds preload nodes
      fnEach(_scripts, _preload);
      // }

      // starts the lazy loading script tags
      _dequeue();
    }

    // adds the internal script to the queue
    $$(___, delay, lazy);
  }

  // the core of the Defer.css
  function fnDeferCss(fileUrl, id, delay, onload, lazy) {
    function ___(_node) {
      _node      = fnCreateNode(TAG_LINK, id, onload);
      _node.rel  = META_CSS;
      _node.href = fileUrl;

      // attaches the new node to the document
      fnAttach(_node);
    }

    // adds the internal script to the queue
    $$(___, delay, lazy);
  }

  // the core of the Defer.js
  function fnDeferJs(fileUrl, id, delay, onload, lazy) {
    function ___(_node) {
      _node     = fnCreateNode(TAG_SCRIPT, id, onload);
      _node.src = fileUrl;

      // attaches the new node to the document
      fnAttach(_node);
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
      fnEventHelper(TYPE_REMOVE, ACTION_EVENTS);

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
      fnEventHelper(TYPE_REMOVE, WINDOW_EVENT);

      // debug
      log(_DEFER_JS_ + ': ' + fastQueue.length / 2 + ' queued task(s) will execute from now!', '#f09');
      log(_DEFER_JS_ + ': ' + lazyQueue.length / 2 + ' other task(s) will be delayed until there is user interaction.', '#f90');

      // tells the core that the page has fully loaded
      isReady = $$;

      // adds user event watchers for lazy tasks if it is not empty
      if (lazyQueue[0]) {
        fnEventHelper(TYPE_ADD, ACTION_EVENTS);
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
    fnEventHelper(TYPE_ADD, WINDOW_EVENT);
  }

  // unveils the script tags with type="deferjs"
  fnDeferScripts();

})(this, 'Defer', '3.6.0');