/**
 *
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
 * Fallback for older version of @shinsenter/defer.js
 * @deprecated
 */
(function (window, Defer) {

  /**
   * Deprecated from version 2.0
   *
   * @deprecated
   * @function defer
   * @alias    Defer
   * @since    1.0
   * @param    {function} func
   * @param    {number}   [delay=0]
   * @see      {@link Defer|Defer}
   */
  Defer = window.defer = window.Defer;

  /**
   * Deprecated from version 2.0
   *
   * @deprecated
   * @function deferimg
   * @alias    Defer.dom
   * @since    1.0
   * @param    {string}       [selector=[data-src]]
   * @param    {number}       [delay=0]
   * @param    {string}       [unveiledClass]
   * @param    {NodeHandler}  [resolver]
   * @param    {object}       [observeOptions]
   * @see      {@link Defer.dom|Defer.dom}
   */

  /**
   * Deprecated from version 2.0
   *
   * @deprecated
   * @function deferiframe
   * @alias    Defer.dom
   * @since    1.0
   * @param    {string}       [selector=[data-src]]
   * @param    {number}       [delay=0]
   * @param    {string}       [unveiledClass]
   * @param    {NodeHandler}  [resolver]
   * @param    {object}       [observeOptions]
   * @see      {@link Defer.dom|Defer.dom}
   */
  window.deferimg = window.deferiframe = Defer.dom;

  /**
   * Deprecated from version 2.0
   *
   * @deprecated
   * @function deferstyle
   * @alias    Defer.css
   * @since    1.0
   * @param    {string}   src
   * @param    {string}   [id]
   * @param    {number}   [delay=0]
   * @param    {Function} [onload]
   * @see      {@link Defer.css|Defer.css}
   */
  window.deferstyle = Defer.css;

  /**
   * Deprecated from version 2.0
   *
   * @deprecated
   * @function deferscript
   * @alias    Defer.js
   * @since    1.0
   * @param    {string}   src
   * @param    {string}   [id]
   * @param    {number}   [delay=0]
   * @param    {Function} [onload]
   * @see      {@link Defer.js|Defer.js}
   */
  window.deferscript = Defer.js;

})(this);
