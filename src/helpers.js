/**
 *
 * Package shinsenter/defer.js
 * https://github.com/shinsenter/defer.js
 *
 * Minified by UglifyJS3
 * http://lisperator.net/uglifyjs/
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

(function(window, document, console, name) {
    var NOOP            = Function();
    var GET_ATTRIBUTE   = 'getAttribute';
    var IS_CHROME       = typeof window.chrome == 'object' && window.navigator.userAgent.indexOf('Trident/') == -1;

    var COMMON_EXCEPTIONS   = ':not([data-lazied])';
    var COMMON_SELECTOR     = '[data-src]' + COMMON_EXCEPTIONS;

    var IMG_SELECTOR = [
        'img' + COMMON_SELECTOR,
        '[data-style]' + COMMON_EXCEPTIONS
    ].join(',');

    var IFRAME_SELECTOR = [
        'iframe' + COMMON_SELECTOR,
        'frame' + COMMON_SELECTOR,
        'video' + COMMON_SELECTOR
    ].join(',');

    var helper = {
        c: 'lazied',
        f: 'in',
        h: document.children.item(0),
        t: 10
    };

    var log         = (console.log || NOOP).bind(console);
    var deferimg    = window.deferimg || NOOP;
    var deferiframe = window.deferiframe || NOOP;

    function copyright () {
        var text    = '%c shinsenter %c defer.js ';
        var style1  = 'font-size:16px;background:#2a313c;padding:2px;border-radius:4px 0 0 4px;color:#fff';
        var style2  = 'font-size:16px;background:#e61e25;padding:2px;border-radius:0 4px 4px 0;color:#fff';

        if (IS_CHROME) {
            log(text, style1, style2);
        }

        log('This page was optimized with defer.js\nhttps://github.com/shinsenter/defer.js/\n\n(c) 2019 Mai Nhut Tan <shin@shin.company>');
    }

    /**
     * This function aims to provide both function
     * throttling and debouncing in as few bytes as possible.
     *
     * @param   {function}  func        The file URL
     * @param   {integer}   delay       The delay time to create the tag
     * @param   {boolean}   throttle    Set false to debounce, true to throttle
     * @param   {integer}   ticker      Placeholder for holding timer
     * @returns {function}              Return a new function
     */
    function defersmart(func, delay, throttle, ticker) {
        return function() {
            var context = this;
            var args    = arguments;

            if (!throttle) {
                clearTimeout(ticker);
            }

            if (!throttle || !ticker) {
                ticker = setTimeout(function() {
                    ticker = null;
                    func.apply(context, args);
                }, delay);
            }
        }
    }

    /*
     * Add/remove element classnames
     */
    function classFilter(haystack, needle) {
        return haystack.split(' ').filter(function(v) {
            return v != '' && v != needle;
        }).
            join(' ');
    }

    function addClass(element, classname) {
        element.className = classFilter(element.className, classname) + ' ' + classname;
    }

    function removeClass(element, classname) {
        element.className = classFilter(element.className, classname);
    }

    /*
     * Lazy-load img and iframe elements
     */
    function mediafilter(media) {
        function onload() {
            addClass(media, helper.f);
        }

        if (media.src == media[GET_ATTRIBUTE]('data-src')) {
            onload();
        } else {
            media.addEventListener('load', onload);
        }
    }

    function imgloader() {
        deferimg(IMG_SELECTOR, helper.t, helper.c, mediafilter, {rootMargin: '50%'})
    }

    function iframeloader() {
        deferiframe(IFRAME_SELECTOR, helper.t, helper.c, mediafilter, {rootMargin: '100%'})
    }

    function defermedia() {
        imgloader();
        iframeloader();
    }

    // Call the helpers
    removeClass(helper.h, 'no-deferjs');
    addClass(helper.h, 'deferjs');
    defermedia();
    copyright();

    // Expose global methods
    helper.copyright    = copyright;
    helper.debounce     = defersmart;
    helper.defermedia   = defermedia;
    helper.addClass     = addClass;
    helper.removeClass  = removeClass;

    window[name] = helper;

})(this, document, console, 'defer_helper');