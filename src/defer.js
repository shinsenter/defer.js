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
 * 🥇 A JavaScript micro-library that helps you lazy load (almost) anything.
 * Defer.js is zero-dependency, super-efficient, and Web Vitals friendly.
 *
 * @author    Mai Nhut Tan <shin@shin.company>
 * @copyright 2019-2023 SHIN Company <https://code.shin.company/>
 * @version   3.5.0
 * @license   {@link https://code.shin.company/defer.js/blob/master/LICENSE|MIT}
 */

/*!@shinsenter/defer.js@3.5.0*/
(function (window, CONST_UNDEFINED) {

  var namespace = 'Defer';
  var version   = '3.5.0';

  /*
  |--------------------------------------------------------------------------
  | Defines internal variables for a better minification rate
  |--------------------------------------------------------------------------
  */

  // aliases for reusable variables
  var CONST_FALSE   = false;
  var TAG_LINK      = 'link';
  var TAG_SCRIPT    = 'script';

  // default CSS selectors
  var SELECTOR_DOM  = '[data-src]';
  var SELECTOR_JS   = TAG_SCRIPT + '[type=deferjs]';

  // aliases for events
  var EVN_LOAD      = 'load';
  var EVN_PAGESHOW  = 'pageshow';

  // page events
  var ACTION_EVENTS = ['touchstart', 'keydown', 'mousemove', 'wheel'];
  var WINDOW_EVENT  = 'on' + EVN_PAGESHOW in window ? EVN_PAGESHOW : EVN_LOAD;

  // aliases for object methods
  var FUNC_FOR_EACH = 'forEach';
  var FUNC_GET_ATTR = 'getAttribute';
  var FUNC_SET_ATTR = 'setAttribute';
  var FUNC_SHIFT    = 'shift';

  // aliases for object attributes
  var ATTR_HREF     = 'href';
  var ATTR_SRC      = 'src';
  var ATTR_TYPE     = 'type';

  /*
  |--------------------------------------------------------------------------
  | Defines internal variables for holding state of the library
  |--------------------------------------------------------------------------
  */

  // window event handler
  var _eventHandler;

  // the IntersectionObserver feature
  var IntersectionObserver = window.IntersectionObserver;

  // browser features
  var console  = window.console;
  var document = window.document || window;
  var fnServe  = window.setTimeout;
  var fnSlice  = ACTION_EVENTS.slice;

  // variables that hold the state of Defer
  var _isReady     = (/p/).test(document.readyState);
  var _queuedDefer = [];
  var _queuedDelay = [];

  /*
  |--------------------------------------------------------------------------
  | Simple loggers
  |--------------------------------------------------------------------------
  */

  // performance labels
  var _DEFER_JS_  = namespace + ' v' + version;
  var _BOOTSTEP_ = _DEFER_JS_ + ' boot';
  var _LOADSTEP_ = _DEFER_JS_ + ' waits: booted -> page load event';
  var _USERSTEP_ = _DEFER_JS_ + ' waits: page loaded -> user event';

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

  perf_begin(_BOOTSTEP_);

  /*
  |--------------------------------------------------------------------------
  | Window event handlers
  |--------------------------------------------------------------------------
  */

  // shorthand for window.addEventListener
  function fnAttachWindowEvent(event) {
    window.addEventListener(event, _eventHandler);
  }

  // shorthand for window.removeEventListener
  function fnDetachWindowEvent(event) {
    window.removeEventListener(event, _eventHandler);
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
    if (_isReady) {
      fnServe(func, delay);
    } else {
      (
        (lazy === CONST_UNDEFINED ? $$.lazy : lazy) ? _queuedDelay : _queuedDefer
      ).push(func, delay);
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

  // loops through all attributes of a DOM node
  function fnAttrIterator(node, callback) {
    fnSlice.call(node.attributes)[FUNC_FOR_EACH](function(attribute) {
      callback(attribute.name, attribute.value);
    });
  }

  // creates a new fresh DOM node
  function fnCreateNode(nodeName, id, onload, _node) {
    _node = (id ? document.getElementById(id) : id) || document.createElement(nodeName);

    if (id) {
      _node.id = id;
    }

    if (onload) {
      _node.onload = onload;
    }

    return _node;
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
    fnQueryAll('source,img', node)[FUNC_FOR_EACH](fnDeferReveal);

    // transforms data-xxx attributes to normal attributes
    fnAttrIterator(node, function (name, value, _matches) {
      _matches = (/^data-(.+)/).exec(name);

      if (_matches) {
        node[FUNC_SET_ATTR](_matches[1], value);
      }
    });

    // debug
    debug('A DOM node has been unveiled.', node);

    // appends new class names
    if (typeof unveiledClass == 'string' && unveiledClass) {
      node.className += ' ' + unveiledClass;
    }

    // calls load() method to reset the media
    if (EVN_LOAD in node) {
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
        if (node[namespace] != $$) {
          // marks this element is initialized
          node[namespace] = $$;

          // observes or unveils a node
          _observer ? _observer.observe(node) : _unveil(node);
        }
      }

      // creates intersection observer
      if (IntersectionObserver) {
        _observer = new IntersectionObserver(function (nodes) {
          nodes[FUNC_FOR_EACH](function (entry, _node) {
            if (entry.isIntersecting) {
              _node = entry.target;
              _observer.unobserve(_node);
              _unveil(_node);
            }
          });
        }, observeOptions);
      } else {
        _observer = CONST_UNDEFINED;
      }

      // collects target nodes and registers them to the observer
      fnQueryAll(selector || SELECTOR_DOM)[FUNC_FOR_EACH](_watch);
    }

    // adds the internal script to the queue
    // NOTE: the lazy mode should be disable for DOM manipulations
    $$(___, delay, CONST_FALSE);
  }

  // the core of the Defer.all
  function fnDeferScripts(selector, delay, lazy) {
    function ___(_queuedDefer) {
      var _debug_ = 'Defer.all(' + (selector || SELECTOR_JS) + ', ' + (delay || 0) + ', ' + (lazy ? 'true' : 'false') + ')';
      perf_begin(_debug_);

      // creates preload hint for a script node
      function _preload(node, _hint) {
        if (node.src) {
          // creates a fresh <link> node,
          _hint = fnCreateNode(TAG_LINK);

          // copies the attributes from the original node
          fnAttrIterator(node, function(name, value) {
            if (name != ATTR_TYPE) {
              _hint[FUNC_SET_ATTR](name == ATTR_SRC ? ATTR_HREF : name, value);
            }
          });

          // appends its preload attributes
          _hint.rel = 'preload';
          _hint.as  = TAG_SCRIPT;

          // attaches the new node to the document
          fnAttach(_hint);
        }
      }

      // executes queued script tags in the order they were queued
      function _dequeue(_node, _copy) {
        // shifts the next script tag in the front of the queue
        _node = _queuedDefer[FUNC_SHIFT]();

        if (_node) {
          // clones the node
          _copy = fnCreateNode(TAG_SCRIPT);

          // copies all attributes from the node
          fnAttrIterator(_node, function (name, value) {
            if (name != ATTR_TYPE) {
              _copy[FUNC_SET_ATTR](name, value);
            }
          });

          // copies he node's text content
          _copy.text = _node.text;

          // replaces the original node with the cloned node
          debug('A DOM node will be replaced.', _copy);
          _node.parentNode.replaceChild(_copy, _node);

          // dequeues the next element
          // NOTE 1: the async attribute MUST be checked via getAttribute()
          // NOTE 2: a script tag without src should be loaded async
          // NOTE 3: a script tag with src and async should be loaded async
          if (_copy.src && !_copy[FUNC_GET_ATTR]('async')) {
            _copy.onload = _copy.onerror = _dequeue;
          } else {
            _dequeue();
          }
        } else {
          perf_end(_debug_);
        }
      }

      // collects target script tags for lazy loading
      _queuedDefer = fnQueryAll(selector || SELECTOR_JS);

      // add preload nodes
      _queuedDefer[FUNC_FOR_EACH](_preload);

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
      _node.rel  = 'stylesheet';
      _node.href = fileUrl;
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

  // handles window events
  _eventHandler = function (event, _release) {
    // debug
    log(_DEFER_JS_ + ': "' + event.type + '" event was triggered.', '#90f');

    if (event.type == WINDOW_EVENT) {
      // debug
      log(_DEFER_JS_ + ': page has fully loaded!', '#09f');
      perf_end(_LOADSTEP_);

      // removes browser event listening
      fnDetachWindowEvent(WINDOW_EVENT);

      // debug
      log(_DEFER_JS_ + ': ' + _queuedDefer.length / 2 + ' queued task(s) will execute from now!', '#f09');
      log(_DEFER_JS_ + ': ' + _queuedDelay.length / 2 + ' other task(s) will be delayed until there is user interaction.', '#f90');

      // tells the core that the page has fully loaded
      _isReady = $$;

      // adds user events for lazy tasks
      ACTION_EVENTS[FUNC_FOR_EACH](fnAttachWindowEvent);
      perf_begin(_USERSTEP_);

      // debug
      log(_DEFER_JS_ + ' is now ready!', '#9a3');

      // selects the queue to be served
      _release = _queuedDefer;
    } else {
      // debug
      log(_DEFER_JS_ + ': a user interaction detected!', '#09f');
      perf_end(_USERSTEP_);

      // removes user events for lazy tasks
      ACTION_EVENTS[FUNC_FOR_EACH](fnDetachWindowEvent);

      // debug
      log(_DEFER_JS_ + ': ' + _queuedDelay.length / 2 + ' lazy task(s) will execute from now!', '#f90');

      // selects the queue to be served
      _release = _queuedDelay;
    }

    // serves all queued tasks
    while (_release[0]) {
      fnServe(_release[FUNC_SHIFT](), _release[FUNC_SHIFT]());
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Defines defer utility functions will be publicly exposed
  |--------------------------------------------------------------------------
  */

  // unveils the script tags with type="deferjs"
  fnDeferScripts();

  // exposes public methods
  $$.all     = fnDeferScripts;
  $$.dom     = fnDeferDom;
  $$.css     = fnDeferCss;
  $$.js      = fnDeferJs;
  $$.reveal  = fnDeferReveal;

  // exposes the Defer instance
  window[namespace] = $$;

  // debug
  log(_DEFER_JS_ + ' was injected!', '#888');
  perf_end(_BOOTSTEP_);

  if (!_isReady) {
    // adds an event listener for the page load event
    fnAttachWindowEvent(WINDOW_EVENT);
    perf_begin(_LOADSTEP_);
  }

})(this);