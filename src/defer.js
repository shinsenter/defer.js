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
 * @copyright 2022 AppSeeds <https://code.shin.company/>
 * @version   3.4.0
 * @license   {@link https://code.shin.company/defer.js/blob/master/LICENSE|MIT}
 */

/*!@shinsenter/defer.js@3.4.0*/
(function (window) {

  var namespace = 'Defer';
  var version   = '3.4.0';

  /*
  |--------------------------------------------------------------------------
  | Defines internal variables for better minification rate
  |--------------------------------------------------------------------------
  */

  // aliases for reusable variables
  var _boolFalse    = false;
  var _txtLink      = 'link';
  var _txtScript    = 'script';

  // aliases for events
  var _txtLoad      = 'load';
  var _txtPageshow  = 'pageshow';

  // aliases for object methods
  var _txtForEach   = 'forEach';
  var _txtGetAttr   = 'getAttribute';
  var _txtSetAttr   = 'setAttribute';
  var _txtShift     = 'shift';

  // aliases for object attributes
  var _txtXorigin   = 'crossorigin';
  var _txtIntegrity = 'integrity';

  // page events
  var _userEvents   = ['mousemove', 'keydown', 'touchstart', 'wheel'];
  var _windowEvent  = 'on' + _txtPageshow in window ? _txtPageshow : _txtLoad;

  // default CSS selectors
  var _txtDOM = '[data-src]';
  var _txtJS  = _txtScript + '[type=deferjs]';

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
  var engine   = window.setTimeout;

  // variables that hold the state of Defer
  var _booted      = (/p/).test(document.readyState);
  var _queueDefer  = [];
  var _queueDelay  = [];
  var _fnSlice     = _queueDefer.slice;

  /*
  |--------------------------------------------------------------------------
  | Simple loggers
  |--------------------------------------------------------------------------
  */

  // performance labels
  var _debugName  = namespace + ' v' + version;
  var _perfLabel  = _debugName + ' boot';
  var _loadLabel  = _debugName + ' waits from booted to the page load event';
  var _userLabel  = _debugName + ' waits from page loaded to a user event';

  function debug() {
    if (console && 'debug' in console) {
      console.debug.bind(console, _debugName).apply(console, _fnSlice.call(arguments));
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

  perf_begin(_perfLabel);

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
  log(_debugName + ' is initializing...', '#888');

  // the heart of the library
  function $(func, delay, lazy) {
    if (_booted) {
      engine(func, delay);
    } else {
      (
        lazy || $.lazy && typeof lazy === 'undefined'
          ? _queueDelay
          : _queueDefer
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
    _fnSlice.call(node.attributes)[_txtForEach](callback);
  }

  // creates a new fresh DOM node
  function fnCreateNode(nodeName, id, onload, _node) {
    _node = (id ? document.getElementById(id) : _node) ||
      document.createElement(nodeName);

    if (id) {
      _node.id = id;
    }

    if (onload) {
      _node.onload = onload;
    }

    return _node;
  }

  // creates a preload hint node
  function fnCreatePreloadNode(node, _new, _temp) {
    _temp = node.src;

    if (_temp) {
      // creates a fresh node and its preload attributes
      _new      = fnCreateNode(_txtLink);
      _new.rel  = 'preload';
      _new.as   = _txtScript;
      _new.href = _temp;

      // copies the `crossorigin` attribute from the original node
      _temp = node[_txtGetAttr](_txtXorigin);

      if (_temp) {
        _new[_txtSetAttr](_txtXorigin, _temp);
      }

      // copies the `integrity` attribute from the original node
      _temp = node[_txtGetAttr](_txtIntegrity);

      if (_temp) {
        _new[_txtSetAttr](_txtIntegrity, _temp);
      }

      // attaches the new node to the document
      fnAttach(_new);
    }
  }

  // a simple DOM query selector
  function fnQueryAll(selector, parent) {
    return _fnSlice.call((parent || document).querySelectorAll(selector));
  }

  // replaces a DOM node with a new node
  function fnReplaceNode(currentNode, newNode) {
    currentNode.parentNode.replaceChild(newNode, currentNode);

    // debug
    debug('A DOM node has been replaced.', newNode);
  }

  /*
  |--------------------------------------------------------------------------
  | Utility functions
  |--------------------------------------------------------------------------
  */

  // reveals a DOM node deferred by the library
  function fnDeferReveal(node, unveiledClass) {
    // reveals descendant children nodes
    fnQueryAll('source,img', node)[_txtForEach](fnDeferReveal);

    // transforms data-xxx attributes to normal attributes
    fnAttrIterator(node, function (attribute, _matches) {
      _matches = (/^data-(.+)/).exec(attribute.name);

      if (_matches) {
        node[_txtSetAttr](_matches[1], attribute.value);
      }
    });

    // debug
    debug('A DOM node has been unveiled.', node);

    // appends new class names
    if (typeof unveiledClass == 'string' && unveiledClass) {
      node.className += ' ' + unveiledClass;
    }

    // calls load() method to reset the media
    if (_txtLoad in node) {
      node[_txtLoad]();
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
    function __(_observer) {
      // unveils an observed node
      function _unveil(node) {
        if (!resolver || resolver(node) !== _boolFalse) {
          fnDeferReveal(node, unveiledClass);
        }
      }

      // watches a node for its appeal
      function _observe(node) {
        if (node[namespace] != $) {
          // marks this element is initialized
          node[namespace] = $;

          // observes or unveils a node
          _observer ? _observer.observe(node) : _unveil(node);
        }
      }

      // creates intersection observer
      if (IntersectionObserver) {
        _observer = new IntersectionObserver(function (nodes) {
          nodes[_txtForEach](function (entry, _node) {
            if (entry.isIntersecting) {
              _node = entry.target;
              _observer.unobserve(_node);
              _unveil(_node);
            }
          });
        }, observeOptions);
      } else {
        _observer = _boolFalse;
      }

      // collects target nodes and registers them to the observer
      fnQueryAll(selector || _txtDOM)[_txtForEach](_observe);
    }

    // adds the internal script to the queue
    // NOTE: the lazy mode should be disable for DOM manipulations
    $(__, delay, _boolFalse);
  }

  // the core of the Defer.all
  function fnDeferScripts(selector, delay, lazy) {
    function __(_queueDefer) {
      var _perfLabel = 'Defer.all(' + (selector || _txtJS) + ', ' + (delay || 0) + ', ' + (lazy ? 'true' : 'false') + ')';
      perf_begin(_perfLabel);

      function _next(_node, _clone) {
        // shifts the next script tag in the front of the queue
        _node = _queueDefer[_txtShift]();

        if (_node) {
          // clones the node and its content
          _clone = fnCreateNode(_node.nodeName);
          _clone.text = _node.text;

          // copies all attributes from the node
          fnAttrIterator(_node, function (attribute) {
            if (attribute.name != 'type') {
              _clone[_txtSetAttr](attribute.name, attribute.value);
            }
          });

          // attaches the cloned script tag to the document
          // NOTE 1: the async attribute MUST be checked via getAttribute()
          // NOTE 2: a script tag without src should be loaded async
          // NOTE 3: a script tag with src and async should be loaded async
          if (_clone.src && !_clone[_txtGetAttr]('async')) {
            _clone.onload = _clone.onerror = _next;
            fnReplaceNode(_node, _clone);
          } else {
            fnReplaceNode(_node, _clone);
            _next();
          }
        } else {
          perf_end(_perfLabel);
        }
      }

      // collects target script tags for lazy loading
      _queueDefer = fnQueryAll(selector || _txtJS);

      // add preload nodes
      _queueDefer[_txtForEach](fnCreatePreloadNode);

      // starts the lazy loading script tags
      _next();
    }

    // adds the internal script to the queue
    $(__, delay, lazy);
  }

  // the core of the Defer.css
  function fnDeferCss(fileUrl, id, delay, onload, lazy) {
    function __(_node) {
      _node      = fnCreateNode(_txtLink, id, onload);
      _node.rel  = 'stylesheet';
      _node.href = fileUrl;
      fnAttach(_node);
    }

    // adds the internal script to the queue
    $(__, delay, lazy);
  }

  // the core of the Defer.js
  function fnDeferJs(fileUrl, id, delay, onload, lazy) {
    function __(_node) {
      _node     = fnCreateNode(_txtScript, id, onload);
      _node.src = fileUrl;
      fnAttach(_node);
    }

    // adds the internal script to the queue
    $(__, delay, lazy);
  }

  /*
  |--------------------------------------------------------------------------
  | Boot function (on page load / user interactions)
  |--------------------------------------------------------------------------
  */

  // handles window events
  _eventHandler = function (event, _queue) {
    // debug
    log(_debugName + ': "' + event.type + '" event was triggered.', '#90f');

    if (_windowEvent == event.type) {
      // debug
      log(_debugName + ': page has fully loaded!', '#09f');
      perf_end(_loadLabel);

      // removes browser event listening
      fnDetachWindowEvent(_windowEvent);

      // debug
      log(_debugName + ': ' + _queueDefer.length / 2 + ' queued task(s) will execute from now!', '#f09');
      log(_debugName + ': ' + _queueDelay.length / 2 + ' other task(s) will be delayed until there is user interaction.', '#f90');

      // tells the core that the page has fully loaded
      _booted = $;

      // adds user events for delayed tasks
      _userEvents[_txtForEach](fnAttachWindowEvent);
      perf_begin(_userLabel);

      // debug
      log(_debugName + ' is now ready!', '#9a3');

      // selects the queue to be served
      _queue = _queueDefer;
    } else {
      // debug
      log(_debugName + ': a user interaction detected!', '#09f');
      perf_end(_userLabel);

      // removes user events for delayed tasks
      _userEvents[_txtForEach](fnDetachWindowEvent);

      // debug
      log(_debugName + ': ' + _queueDelay.length / 2 + ' delayed task(s) will execute from now!', '#f90');

      // selects the queue to be served
      _queue = _queueDelay;
    }

    // serves all queued tasks
    while (_queue[0]) {
      engine(_queue[_txtShift](), _queue[_txtShift]());
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
  $.all     = fnDeferScripts;
  $.dom     = fnDeferDom;
  $.css     = fnDeferCss;
  $.js      = fnDeferJs;
  $.reveal  = fnDeferReveal;

  // exposes the Defer instance
  window[namespace] = $;

  // debug
  log(_debugName + ' was injected!', '#888');
  perf_end(_perfLabel);

  if (!_booted) {
    // adds an event listener for the page load event
    fnAttachWindowEvent(_windowEvent);
    perf_begin(_loadLabel);
  }

})(this);