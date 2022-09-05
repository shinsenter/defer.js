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
 * that helps you lazy load (almost) anything.
 * Core Web Vitals friendly.
 *
 * @author    Mai Nhut Tan <shin@shin.company>
 * @copyright 2022 AppSeeds <https://code.shin.company/>
 * @version   3.3.0
 * @license   {@_txtLink https://code.shin.company/defer.js/blob/master/LICENSE|MIT}
 */

/*!@shinsenter/defer.js@3.3.0*/
(function (window) {

  var namespace  = 'Defer';
  var version    = '3.3.0';
  var _debugName = namespace + ' v' + version;

  /*
  |--------------------------------------------------------------------------
  | Defines internal variables for better minification rate
  |--------------------------------------------------------------------------
  */

  // window event handler
  var _eventHandler;

  // browser features
  var document = window.document || window;
  var engine   = window.setTimeout;

  // the IntersectionObserver feature
  var IntersectionObserver = window.IntersectionObserver;

  // variables that hold the state of Defer
  var _booted       = (/p/).test(document.readyState);
  var _queueDefer   = [];
  var _queueDelay   = [];
  var _slice        = _queueDefer.slice;

  // page events
  var _load         = 'load';
  var _pageshow     = 'pageshow';
  var _userEvents   = ['mousemove', 'keydown', 'touchstart', 'wheel'];
  var _windowEvent  = 'on' + _pageshow in window ? _pageshow : _load;

  // aliases for object attributes
  var _attrCrossorigin = 'crossorigin';
  var _attrIntegrity   = 'integrity';

  // aliases for object methods
  var _fnForEach    = 'forEach';
  var _fnGetAttr    = 'getAttribute';
  var _fnSetAttr    = 'setAttribute';
  var _fnShift      = 'shift';

  // default CSS selectors
  var _selectorDOM  = '[data-src]';
  var _selectorJS   = '[type=deferjs]';

  // other reusable variables
  var _boolFalse    = false;
  var _txtLink      = 'link';
  var _txtScript    = 'script';

  /*
  |--------------------------------------------------------------------------
  | Simple loggers
  |--------------------------------------------------------------------------
  */

  function debug() {
    console.debug.bind(console, _debugName).apply(console, _slice.call(arguments));
  }

  function log(text, color) {
    console.log('%c ' + text, 'color:' + color);
  }

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
  function self(func, delay, lazy) {
    if (_booted) {
      engine(func, delay);
    } else {
      (
        typeof lazy === 'undefined' && self.lazy || lazy
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

  // attachs a DOM node into the <head> tag
  function fnAttach(node) {
    document.head.appendChild(node);

    // debug
    debug('A DOM node has been attached.', node);
  }

  // loops through all attributes of a DOM node
  function fnAttrIterator(node, callback) {
    _slice.call(node.attributes)[_fnForEach](callback);
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
  function fnCreatePreloadNode(node, _temp, _node) {
    _temp = node.src;

    if (_temp) {
      // creates a fresh node
      _node = fnCreateNode(_txtLink);

      // sets attributes
      _node.rel  = 'preload';
      _node.as   = _txtScript;
      _node.href = _temp;

      // copies crossorigin from the original node if exists
      _temp = node[_fnGetAttr](_attrCrossorigin);

      if (_temp) {
        _node[_fnSetAttr](_attrCrossorigin, _temp);
      }

      // copies integrity from the original node if exists
      _temp = node[_fnGetAttr](_attrIntegrity);

      if (_temp) {
        _node[_fnSetAttr](_attrIntegrity, _temp);
      }

      // attaches the new node into the document
      fnAttach(_node);
    }
  }

  // replaces a DOM node with a new node
  function fnReplaceNode(currentNode, newNode) {
    currentNode.parentNode.replaceChild(newNode, currentNode);

    // debug
    debug('A DOM node has been replaced.', newNode);
  }

  // a simple DOM query selector
  function fnSelect(selector, parent) {
    return _slice.call((parent || document).querySelectorAll(selector));
  }

  /*
  |--------------------------------------------------------------------------
  | Utility functions
  |--------------------------------------------------------------------------
  */

  // reveals a DOM node deferred by the library
  function fnDeferReveal(node, unveiledClass) {
    // reveals descendant children nodes
    fnSelect('source,img', node)[_fnForEach](fnDeferReveal);

    // transforms data-xxx attributes to normal attributes
    fnAttrIterator(node, function (attribute, _matches) {
      _matches = (/^data-(.+)/).exec(attribute.name);

      if (_matches) {
        node[_fnSetAttr](_matches[1], attribute.value);
      }
    });

    // appends new class names
    if (typeof unveiledClass == 'string' && unveiledClass) {
      node.className += ' ' + unveiledClass;
    }

    // debug
    debug('A DOM node has been unveiled.', node);

    // calls load() method to reset the media
    if (_load in node) {
      node[_load]();
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
    function _init(_observer) {
      // unveils an observed node
      function _unveil(node) {
        if (!resolver || resolver(node) !== _boolFalse) {
          fnDeferReveal(node, unveiledClass);
        }
      }

      // watches a node for its appeal
      function _observe(node) {
        if (node[namespace] != self) {
          // marks this element is initialized
          node[namespace] = self;

          // registers to the observer
          _observer ? _observer.observe(node) : _unveil(node);
        }
      }

      // creates intersection observer
      if (IntersectionObserver) {
        _observer = new IntersectionObserver(function (nodes) {
          nodes[_fnForEach](function (entry, _node) {
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
      fnSelect(selector || _selectorDOM)[_fnForEach](_observe);
    }

    // defers the init function without the lazy mode
    self(_init, delay, _boolFalse);
  }

  // the core of the Defer.all
  function fnDeferScripts(selector, delay, lazy) {
    function _init(_queueDefer) {
      function _nextTag(_node, _clone) {
        // pops the next script tag in front of the queue
        _node = _queueDefer[_fnShift]();

        if (_node) {
          // clones the node
          _clone = fnCreateNode(_node.nodeName);

          // copies the text content
          _clone.text = _node.text;

          // copies all attributes from the node
          fnAttrIterator(_node, function (attribute) {
            if (attribute.name != 'type') {
              _clone[_fnSetAttr](attribute.name, attribute.value);
            }
          });

          // attaches clone node to the document
          // NOTE: script tag with src and non-async will wait for its execution
          // NOTE: async attribute MUST be checked via getAttribute()
          if (_clone.src && !_clone[_fnGetAttr]('async')) {
            _clone.onload = _clone.onerror = _nextTag;
            fnReplaceNode(_node, _clone);
          } else {
            fnReplaceNode(_node, _clone);
            _nextTag();
          }
        }
      }

      // collects target script tags for lazy loading
      _queueDefer = fnSelect(selector || _selectorJS);

      // add preload nodes
      _queueDefer[_fnForEach](fnCreatePreloadNode);

      // starts the lazy loading script tags
      _nextTag();
    }

    self(_init, delay, lazy);
  }

  // the core of the Defer.css
  function fnDeferCss(fileUrl, id, delay, onload, lazy) {
    function _init(_node) {
      _node      = fnCreateNode(_txtLink, id, onload);
      _node.rel  = 'stylesheet';
      _node.href = fileUrl;
      fnAttach(_node);
    }

    self(_init, delay, lazy);
  }

  // the core of the Defer.js
  function fnDeferJs(fileUrl, id, delay, onload, lazy) {
    function _init(_node) {
      _node     = fnCreateNode(_txtScript, id, onload);
      _node.src = fileUrl;
      fnAttach(_node);
    }

    self(_init, delay, lazy);
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
      // removes browser event listening
      fnDetachWindowEvent(_windowEvent);

      // tells the core that the page has fully loaded
      _booted = self;

      // debug
      log(_debugName + ': page has fully loaded!', '#09f');
      log(_debugName + ': ' + _queueDefer.length / 2 + ' queued task(s) will execute from now!', '#f09');
      log(_debugName + ': ' + _queueDelay.length / 2 + ' other task(s) will be delayed until there is user interaction.', '#f90');

      // debug
      log(_debugName + ' is now ready!', '#9a3');

      // adds user events for delayed tasks
      _userEvents[_fnForEach](fnAttachWindowEvent);

      // selects the queue to be served
      _queue = _queueDefer;
    } else {
      // debug
      log(_debugName + ': ' + _queueDelay.length / 2 + ' delayed task(s) will execute from now!', '#f90');

      // removes user events for delayed tasks
      _userEvents[_fnForEach](fnDetachWindowEvent);

      // selects the queue to be served
      _queue = _queueDelay;
    }

    // serves all queued tasks
    while (_queue[0]) {
      engine(_queue[_fnShift](), _queue[_fnShift]());
    }
  }

  if (!_booted) {
    // adds an event listener for the page load event
    fnAttachWindowEvent(_windowEvent);
  }

  /*
  |--------------------------------------------------------------------------
  | Defines defer utility functions will be publicly exposed
  |--------------------------------------------------------------------------
  */

  // unveils the script tags with type="deferjs"
  fnDeferScripts();

  // exposes public methods
  self.all    = fnDeferScripts;
  self.dom    = fnDeferDom;
  self.css    = fnDeferCss;
  self.js     = fnDeferJs;
  self.reveal = fnDeferReveal;

  // exposes the Defer instance
  window[namespace] = self;

  // debug
  log(_debugName + ' was injected!', '#888');

})(this);