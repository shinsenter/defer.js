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
 * Fallback for older version of @shinsenter/defer.js
 * @deprecated
 */
(function (window, defer) {

  /**
   * Deprecated since version 2.0
   * @deprecated
   * @since    1.0
   * @function defer
   * @param    {function} func
   * @param    {number}   [delay]
   * @see      {@link Defer|Defer}
   */
  window.defer = defer = window.Defer;

  /**
   * Deprecated since version 2.0
   * @deprecated
   * @since    1.0
   * @function deferscript
   * @param    {string}   src
   * @param    {string}   [id]
   * @param    {number}   [delay]
   * @param    {callback} [callback]
   * @see      {@link Defer.js|Defer.js}
   */
  window.deferscript = defer.js;

  /**
   * Deprecated since version 2.0
   * @deprecated
   * @since    1.0
   * @function deferstyle
   * @param    {string}   src
   * @param    {string}   [id]
   * @param    {number}   [delay]
   * @param    {callback} [callback]
   * @see      {@link Defer.css|Defer.css}
   */
  window.deferstyle = defer.css;

  /**
   * Deprecated since version 2.0
   * @deprecated
   * @function deferimg
   * @since    1.0
   * @param    {string}   [selector]
   * @param    {number}   [delay]
   * @param    {string}   [revealedClass]
   * @param    {callback} [validator]
   * @param    {object}   [observeOptions]
   * @see      {@link Defer.dom|Defer.dom}
   */

  /**
   * Deprecated since version 2.0
   * @deprecated
   * @function deferiframe
   * @since    1.0
   * @param    {string}   [selector]
   * @param    {number}   [delay]
   * @param    {string}   [revealedClass]
   * @param    {callback} [validator]
   * @param    {object}   [observeOptions]
   * @see      {@link Defer.dom|Defer.dom}
   */
  window.deferimg = window.deferiframe = defer.dom;

})(this);
