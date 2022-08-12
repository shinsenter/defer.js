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
 * 🥇 A super small, super efficient library
 * that helps you lazy load (almost) anything.
 * Core Web Vitals friendly.
 *
 * @author    Mai Nhut Tan <shin@shin.company>
 * @copyright 2022 AppSeeds <https://code.shin.company/>
 * @version   3.0.0
 * @license   {@link https://code.shin.company/defer.js/blob/master/LICENSE|MIT}
 */

/*
|--------------------------------------------------------------------------
| Definitions of related terms
|--------------------------------------------------------------------------
*/

/**
 * An abstract base class upon which many other DOM API objects are based
 *
 * @typedef
 * @name Node
 * @see  {@link https://developer.mozilla.org/docs/Web/API/Node}
 */

/**
 * A code snippet that can be called, or a variable that refers to the function.
 *
 * @typedef
 * @name Function
 * @see  {@link https://developer.mozilla.org/docs/Glossary/Function}
 */

/**
 * A {@link Function} receives a DOM {@link Node} object as its argument.
 *
 * @typedef
 * @name    NodeHandler
 * @extends {Function}
 * @param   {Node} node - A {@link Node} object
 */

/*
|--------------------------------------------------------------------------
| Definitions Defer JSDoc
|--------------------------------------------------------------------------
*/

/**
 * Heavy DOM manipulations may cause render-blocking issues in real scenarios.
 * Wrapping your script with `Defer()` may help your website prevent render-blocking issues.
 *
 * @function Defer
 * @since    2.0
 * @param    {Function} func - A function to be executed after page fully loaded.
 * @param    {number}   [delay=0] - The time, in milliseconds that it should wait before the function is executed.
 * @param    {boolean}  [waitForInteraction=false] - This argument tells `Defer()` to delay the execution and wait until there is a user interaction.
 * @returns  {void}
 *
 * @example
 * jQuery is used in this example to perform some DOM manipulations.
 * This will attach `<pre><code></code></pre>` blocks to the document
 * as soon as the page finished loading.
 *
 * ```html
 * <script>
 *   function generate_code_blocks () {
 *     $('.demo').each(function() {
 *       var code = $('<pre><code class="language-html"></code></pre>');
 *       var demo = $(this);
 *       var html = demo.html().trim().replace(/ {4}/g, '  ');
 *
 *       code.children().text(html);
 *       demo.append(code);
 *     });
 *   }
 *
 *   Defer(generate_code_blocks, 0);
 * </script>
 * ```
 *
 * @example
 * Sometimes, you would like your code not to run unless there is user activity.
 *
 * The third argument tells the `Defer()` to delay the execution of the function
 * and wait until the user starts interacting with your page.
 *
 * ```html
 * <style>
 *   body.moving {
 *     background: linear-gradient(270deg, #ffffff, #e8f0c3, #ccf0c3);
 *     background-size: 600% 600%;
 *     animation: moving_bg 30s ease infinite;
 *   }
 * </style>
 *
 * <script>
 *   function make_background_animate() {
 *     // jQuery is used in this example to attach a class to the <body> tag.
 *     // You won't see the animated background until you start interacting.
 *     $('body').addClass('moving');
 *   }
 *
 *   Defer(make_background_animate, 0, true);
 * </script>
 * ```
 */


/**
 * The `Defer.lazy` variable was added since v3.0.
 *
 * Setting `Defer.lazy = true` tells the library to delay the execution
 * of deferred scripts until the user starts interacting with the page
 * regardless of the page load event.
 *
 * It will override the default behavior of `waitForInteraction`
 * argument of the `Defer()` method.
 *
 * Changing this variable will also affect the behavior of these functions:
 * - {@link Defer.all|Defer.all()}
 * - {@link Defer.css|Defer.css()}
 * - {@link Defer.js|Defer.js()}
 *
 * @access   public
 * @member   {boolean} lazy
 * @memberof Defer
 * @since    3.0
 * @default  (not set)
 *
 * @example
 * To override the default behavior of the `Defer()` method.
 *
 * ```html
 * <!-- You can put this right below the script tag containing defer.min.js -->
 * <script>Defer.lazy = true;</script>
 * ```
 */


/**
 * Slow scripts (third-party libraries, add-ons, widgets etc.)
 * may cause [Web Vitals](https://web.dev/vitals/) issues in real scenarios.
 *
 * Fully deferring `<script>` tags may help your page prevent Web Vitals issues.
 *
 * You can fully defer any script tag by setting its `type` attribute to `deferjs`.
 * This trick also works perfectly with `<script>` tags with a `src` attribute.
 *
 * @note Lazy loading behavior changed since v3.0 when you set `Defer.lazy=true`.
 * A `<script>` tags with `type="deferjs"` will not execute
 * unless the user starts interacting with your page.
 *
 * @function Defer.all
 * @since    2.0
 * @param    {string} [selector=[type=deferjs]] - A CSS selector selects target script tags which will be Lazy loaded.
 * @param    {number} [delay=0] - The time, in milliseconds that it should wait before a script tag is executed.
 * @param    {boolean}  [waitForInteraction=false] - This argument tells `Defer.all()` to delay the execution of scripts until there is a user interaction.
 * @returns  {void}
 *
 * @example
 * Using magic `type="deferjs"` attribute:
 *
 * Before:
 * ```html
 * <script type="text/javascript">
 *   // your javascript is here
 *   console.log('This script is a normal script tag.');
 * </script>
 * ```
 *
 * After:
 * ```html
 * <script type="deferjs">
 *   // your javascript will still be here,
 *   // but it will not run unless the user starts interacting with your page.
 *   console.log('This script is lazy loaded with type="deferjs" attribute.');
 * </script>
 * ```
 *
 * @example
 * Using your own type, such as `type="my-magic"`:
 *
 * If you hate using the `type="deferjs"` attribute, you can even choose your own one.
 *
 * ```html
 * <script type="my-magic">
 *   // your javascript will still be here,
 *   // but it will not run unless the user starts interacting with your page.
 *   console.log(
 *     'This script is lazy loaded with type="my-magic" attribute ' +
 *     '5 seconds after the user started interacting with your page.'
 *   );
 * </script>
 *
 * <!-- Place the below line after all other script tags -->
 * <!-- The 2nd argument means those script tag will be delayed 5000ms -->
 * <script>
 *   Defer.all('script[type="my-magic"]', 5000);
 * </script>
 * ```
 */


/**
 * The `Defer.dom()` method is useful in the below use cases:
 *
 * - Lazy loading image, media, iframe tags, etc. on your website.
 * - Prevent downloading third-party libraries or add-ons unless they are needed.
 * - Scroll-reveal features, such as handling AJAX updating when a block is entering the viewport.
 * - An element that was deferred by Defer.dom() will be unveiled as soon as the page finished loading.
 *
 * An element that was deferred by `Defer.dom()` will be unveiled
 * when it is going to enter the browser viewport.
 *
 * The `Defer.dom()` method also converts `data-*` attributes of the elements
 * into non-data attributes (e.g. from `data-src` to `src`).
 *
 * Please check out below examples for more details.
 *
 * @function Defer.dom
 * @since    2.0
 * @param    {string}       [selector=[data-src]] - A CSS selector selects target HTML elements which will be unveiled later.
 * @param    {number}       [delay=0] - The time, in milliseconds that it should wait before lazy loading is applied for target elements.
 * @param    {string}       [unveiledClass] - Class names that will be added to target elements when they are unveiled.
 * @param    {NodeHandler}  [resolver] - A {@link NodeHandler} will check a {@link Node} to determine if it will be unveiled or not.
 * If the resolver returns `false`, the node will not be unveiled.
 * @param    {object}       [observeOptions] - [Intersection observer options](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)
 * @returns  {void}
 *
 * @example
 * Using the `data-src` attribute to lazy load image tags.
 *
 * The browser uses the `src` attribute of
 * [`<img>` tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)
 * to trigger the image load.
 * It doesn't matter if it is the first or the 1,000th image in your HTML.
 *
 * If the browser gets the `src` attribute,
 * it will trigger the image to be downloaded,
 * regardless of whether it is in or out of the current view.
 *
 * To defer the load, put the image URL in an attribute other than `src`.
 * We specify the image URL in the `data-src` attribute of the image tag.
 * Sometimes, the `src` attribute could be used to download
 * a very small placeholder image before the real image gets downloaded.
 *
 * ```html
 * <div id="demo-basic">
 *   <img alt="A lazy image" width="200" height="300" loading="lazy"
 *        src=""
 *        data-src="https://picsum.photos/id/1003/200/300">
 *
 *   <img alt="A lazy image with a low resolution placeholder"
 *        width="200" height="300" loading="lazy"
 *        src="https://picsum.photos/id/1002/20/30?blur"
 *        data-src="https://picsum.photos/id/1002/200/300">
 * </div>
 *
 * <script>
 *   Defer.dom('#demo-basic img');
 * </script>
 * ```
 *
 * @example
 * Lazy load a responsive image with `data-srcset` and `data-sizes` attributes.
 *
 * Using the `srcset` attribute has made
 * [responsive image](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
 * sizing much simpler.
 * It allows you to define a list of differently-sized versions of the same image,
 * and provide information about the size of each one.
 * Then, the client (browser) gets to make the decision.
 *
 * We can also use the same trick as the above examples.
 * We specify an image URL set in
 * `data-srcset` and `data-sizes` attributes of the image tag.
 *
 * ```html
 * <div id="demo-srcset">
 *   <img alt="A lazy image with srcset attribute"
 *        width="200" height="300" loading="lazy"
 *        data-sizes="200w"
 *        src="https://picsum.photos/id/204/20/30?blur"
 *        data-src="https://picsum.photos/id/204/200/300"
 *        data-srcset="https://picsum.photos/id/204/400/600 2x, https://picsum.photos/id/204/600/900 3x">
 * </div>
 *
 * <script>
 *   Defer.dom('#demo-srcset img');
 * </script>
 * ```
 *
 * @example
 * Lazy load a responsive image with flexible format selection.
 *
 * Different browsers support different image formats.
 * We might want to send a fancy new image format such as
 * [WebP](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#webp_image)
 * to browsers that can render it, and fall back to trusty old JPEGs in browsers that don’t.
 *
 * We can also use the same trick as above examples for
 * [picture tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture),
 * and its children HTML nodes.
 *
 * ```html
 * <div id="demo-picture">
 *   <picture>
 *     <source type="image/webp"
 *          data-sizes="200w"
 *          data-src="https://picsum.photos/id/1054/200/300.webp"
 *          data-srcset="https://picsum.photos/id/1054/400/600.webp 2x, https://picsum.photos/id/1054/600/900.webp 3x">
 *
 *     <img alt="A lazy image with srcset attribute"
 *          width="200" height="300" loading="lazy"
 *          data-sizes="200w"
 *          src="https://picsum.photos/id/1054/20/30?blur"
 *          data-src="https://picsum.photos/id/1054/200/300"
 *          data-srcset="https://picsum.photos/id/1054/400/600 2x, https://picsum.photos/id/1054/600/900 3x">
 *   </picture>
 * </div>
 *
 * <script>
 *   Defer.dom('#demo-picture picture');
 * </script>
 * ```
 *
 * @example
 * Basic usage with adding CSS class.
 *
 * `Defer.dom()` also allows you to add CSS classnames when an element is unveiled.
 * In this example, we will add some CSS classnames to make an `<img>` tag animate.
 *
 * ```html
 * <div id="demo-basic2">
 *   <img alt="A lazy image with animation when loaded"
 *        width="200" height="300" loading="lazy"
 *        src="https://picsum.photos/id/1024/20/30?blur"
 *        data-src="https://picsum.photos/id/1024/200/300">
 * </div>
 *
 * <script>
 *   // this example is using animate.css library
 *   // see: https://animate.style
 *   Defer.dom('#demo-basic2 img', 0, 'animate__animated animate__backInLeft');
 * </script>
 * ```
 *
 * @example
 * Lazy load inline CSS background images.
 *
 * We can also defer background images for any HTML tag other than `<img>` or `<picture>`.
 *
 * ```html
 * <style>
 *   #demo-inline .image {
 *     display: inline-block;
 *     height: 300px;
 *     width: 200px;
 *     background: transparent 0 0 / cover no-repeat;
 *     border-radius: 150px;
 *   }
 * </style>
 *
 * <div id="demo-inline">
 *   <div class="image" data-style="background-image:url(https://picsum.photos/id/1068/400/600)"></div>
 *   <div class="image" data-style="background-image:url(https://picsum.photos/id/1069/400/600)"></div>
 *   <div class="image" data-style="background-image:url(https://picsum.photos/id/1070/400/600)"></div>
 * </div>
 *
 * <script>
 *   Defer.dom('#demo-inline .image');
 * </script>
 * ```
 *
 * @example
 * Lazy load CSS background images.
 *
 * Just another example for lazy loading background images for HTML tags,
 * but we can also use CSS classnames instead of inline `style` attributes.
 *
 * ```html
 * <style>
 *   #demo-css .image {
 *     display: inline-block;
 *     height: 300px;
 *     width: 200px;
 *     background: transparent 0 0 / cover no-repeat;
 *     border-radius: 150px;
 *   }
 *   #pic1.shown {
 *     background-image: url(https://picsum.photos/id/106/400/600);
 *   }
 *   #pic2.shown {
 *     background-image: url(https://picsum.photos/id/206/400/600);
 *   }
 *   #pic3.shown {
 *     background-image: url(https://picsum.photos/id/306/400/600);
 *   }
 * </style>
 *
 * <div id="demo-css">
 *   <div id="pic1" class="image"></div>
 *   <div id="pic2" class="image"></div>
 *   <div id="pic3" class="image"></div>
 * </div>
 *
 * <script>
 *   Defer.dom('#demo-css .image', 0, 'shown');
 * </script>
 * ```
 *
 * @example
 * Lazy load a video.
 *
 * With `Defer.dom()`, we can easily defer the load of various media tags, such as a `<video>` tag.
 *
 * ```html
 * <div id="demo-video">
 *   <video autoplay="true" controls="true" muted="true"
 *          width="480" height="270"
 *          data-poster="https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg">
 *     <source type="video/mp4" data-src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4">
 *     <!-- <source type="video/ogg" data-src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.ogg"> -->
 *     <!-- <source type="video/avi" data-src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.avi"> -->
 *   </video>
 * </div>
 *
 * <script>
 *   Defer.dom('#demo-video video', 0, 'shown');
 * </script>
 * ```
 *
 * @example
 * Lazy load an iframe.
 *
 * With `Defer.dom()`, we can effortlessly defer the load of iframe tags.
 *
 * ```html
 * <div id="demo-iframe">
 *   <iframe title="An iframe example"
 *           width="480" height="270" frameborder="0"
 *           src="about:blank"
 *           data-src="https://shinsenter.github.io/defer.js/">
 *   </iframe>
 * </div>
 *
 * <script>
 *   Defer.dom('#demo-iframe iframe', 0, 'animate__animated animate__fadeIn');
 * </script>
 * ```
 *
 * @example
 * Lazy load a Youtube video.
 *
 * This example uses `Defer.dom()` to defer the load of a Youtube iframe.
 *
 * ```html
 * <div id="demo-youtube">
 *   <iframe title="The new MacBook Air"
 *           width="480" height="270" frameborder="0" allowfullscreen=""
 *           allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
 *           src="about:blank"
 *           data-src="https://www.youtube.com/embed/jwmS1gc9S5A"
 *           data-style="background: transparent url(https://img.youtube.com/vi/jwmS1gc9S5A/hqdefault.jpg) 50% 50% / cover no-repeat;">
 *   </iframe>
 * </div>
 *
 * <script>
 *   Defer.dom('#demo-youtube iframe', 0, 'animate__animated animate__fadeIn');
 * </script>
 * ```
 *
 * @example
 * Lazy load a Facebook post.
 *
 * This example uses `Defer.dom()` to defer the load of a Facebook post.
 *
 * ```html
 * <div id="demo-facebook">
 *   <iframe title="An example of Facebook post"
 *           width="480" height="270" frameborder="0"
 *           scrolling="no" allowtransparency="true" allow="encrypted-media"
 *           src="about:blank"
 *           data-src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fappseeds%2Fposts%2F1502937099839267&amp;width=480&amp;show_text=true&amp;height=200">
 *   </iframe>
 * </div>
 *
 * <script>
 *   Defer.dom('#demo-facebook iframe', 0, 'animate__animated animate__fadeIn');
 * </script>
 * ```
 *
 * @example
 * Lazy load a Discord chat box.
 *
 * This example uses `Defer.dom()` to defer the load of a Discord chat box.
 *
 * ```html
 * <iframe id="discord-widget" title="Discord"
 *         width="480" height="270" frameborder="0"
 *         allowtransparency="true" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
 *         src="about:blank"
 *         data-src="https://discord.com/widget?id=962919929307357234&amp;theme=dark">
 * </iframe>
 *
 * <script>
 *   Defer.dom('#discord-widget', 0, 'discord-loaded');
 * </script>
 * ```
 *
 * @example
 * Scroll and reveal.
 *
 * `Defer.dom()` also helps you do an action when an element is unveiled.
 *
 * In this example, when the user scrolls to the bottom of the page,
 * he/she will see a message as soon as an element with `id="surprise-me"` appears.
 *
 * ```html
 * <script>
 *   Defer.dom('#surprise-me', 1000, 'seen', function(node) {
 *     alert('Yay!\n\nYou have seen all examples.\nHave fun coding with @shinsenter/defer.js!');
 *   });
 * </script>
 * ```
 */


/**
 * We use the `Defer.css()` method to defer the load
 * of external CSS files without blocking the page rendering.
 *
 * @note Lazy loading behavior changed since v3.0 when you set `Defer.lazy=true` or `waitForInteraction=true`.
 * The `fileUrl` will not be fetched unless the user starts interacting with your page.
 *
 * @function Defer.css
 * @since    2.0
 * @param    {string}   fileUrl - URL to the css file that should be lazy loaded.
 * @param    {string}   [id] - The ID will be assigned to the script tag to avoid downloading the same file multiple times.
 * @param    {number}   [delay=0] - The time, in milliseconds that the page should wait before the CSS file is fetched.
 * @param    {Function} [onload] - The callback function will be executed if the css file is successfully loaded.
 * @param    {boolean}  [waitForInteraction=false] - This argument tells `Defer.css()` to delay downloading the CSS file until there is a user interaction.
 * @returns  {void}
 *
 * @example
 * Using `Defer.css()` to lazy load
 * [FontAwesome](https://fontawesome.com/docs/web/setup/get-started) (CSS and some font files)..
 *
 * ```html
 * <style>
 *   #demo-fontawesome .far {
 *     font-size: 3em;
 *     color: green;
 *   }
 * </style>
 *
 * <div id="demo-fontawesome">
 *   <i class="far fa-thumbs-up"></i>
 *   <code>@shinsenter/defer.js</code>
 * </div>
 *
 * <script>
 *   var fileUrl = 'https://pro.fontawesome.com/releases/v5.14.0/css/all.css';
 *
 *   Defer.css(fileUrl, 'fa5-css', 0, function() {
 *     console.info('Debug', 'FontAwesome is loaded.'); // debug
 *   });
 * </script>
 * ```
 *
 * @example
 * Lazy load animate.css library.
 *
 *
 * In this example, we want the download of the
 * [Animate.css library](https://animate.style/#documentation)
 * to wait for the first user interaction with your page
 * so the `waitForInteraction` argument (the fifth argument) is set to `true`.
 *
 * When the Animate.css library was downloaded,
 * we will add CSS classes from Animate.css to every tag with `class=".demo"` on the page.
 * No tag will be animated unless the user scrolls to its position.
 *
 *
 * ```html
 * <script>
 *   var origin = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1';
 *
 *   // This script will lazy load animate.css library.
 *   Defer.css(origin + '/animate.min.css', 'animate-css', 0, function () {
 *     console.info('Debug', 'Animate.css is loaded.'); // debug
 *
 *     // adds animation classes to demo blocks.
 *     Defer.dom('.demo', 100, 'animate__animated animate__fadeIn');
 *   }, true);
 * </script>
 * ```
 */


/**
 * We use `Defer.js()` to defer the load of 3rd-party
 * javascript libraries, widgets, add-ons, etc. without blocking the page rendering.
 *
 * @note Lazy loading behavior changed since v3.0 when you set `Defer.lazy=true` or `waitForInteraction=true`.
 * The `fileUrl` will not be fetched unless the user starts interacting with your page.
 *
 * @function Defer.js
 * @since    2.0
 * @param    {string}   fileUrl - URL to the js file that should be lazy loaded.
 * @param    {string}   [id] - The ID will be assigned to the script tag to avoid downloading the same file multiple times.
 * @param    {number}   [delay=0] - The time, in milliseconds that the page should wait before the JS file is fetched.
 * @param    {Function} [onload] - The callback function will be executed if the js file is successfully loaded.
 * @param    {boolean}  [waitForInteraction=false] - This argument tells `Defer.js()` to delay downloading the JS file until there is a user interaction.
 * @returns  {void}
 *
 * @example
 * Alternative way to lazy load Google Tag Manager script.
 *
 * Using `Defer.js()` to lazy load Google Tag Manager library and its external scripts.
 *
 * In this example, we want the GTM to execute as soon as the page loaded
 * so the `waitForInteraction` argument (the fifth argument) is set to `false`.
 *
 * ```html
 * <script>
 *   var GTM_ID = 'UA-XXXXXXX-Y';
 *   window.dataLayer = window.dataLayer || [];
 *   dataLayer.push(['js', new Date()]);
 *   dataLayer.push(['config', GTM_ID]);
 *
 *   Defer.js('https://www.googletagmanager.com/gtag/js?id=' + GTM_ID, 'google-tag', 0, function() {
 *     console.info('Debug', 'Google Tag Manager is loaded.'); // debug
 *   }, false);
 * </script>
 * ```
 *
 * @example
 * Lazy load AddThis add-on.
 *
 * Using `Defer.js()` to lazy load
 * [AddThis Share Buttons](https://www.addthis.com/get/share/)
 * and its external resources.
 * AddThis add-on will not be loaded until the user starts interacting with the page
 * (the `waitForInteraction` argument (the fifth argument) is set to `true`).
 *
 * ```html
 * <div class="demo-addthis"></div>
 *
 * <script>
 *   var fileUrl = 'https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5c68e61cf456f1cb';
 *   var loaded  = false;
 *
 *   Defer.js(fileUrl, 'addthis-js', 0, function() {
 *     console.info('Debug', 'AddThis add-on is loaded.'); // debug
 *   }, true);
 * </script>
 * ```
 *
 * @example
 * Lazy load Prism.js library.
 *
 * Using Defer.js to lazy load Prism.js library and its assets.
 * The `<code>` blocks on the page will be rendered only when you scroll to their positions.
 *
 * ```html
 * <style>
 *   pre {
 *     background-color: honeydew;
 *   }
 * </style>
 *
 * <script>
 *   // turns on manual mode
 *   window.Prism = window.Prism || {};
 *   Prism.manual = true;
 *
 *   // this script will lazy load Prism.js library and its dark theme.
 *   // when loading is done, it will apply code formatting to every <code> tag.
 *   var origin = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0';
 *   Defer.css(origin + '/themes/prism-tomorrow.min.css', 'prism-css');
 *   Defer.js(origin + '/prism.min.js', 'prism-js', 0, function () {
 *     console.info('Debug', 'Prism.js is loaded.'); // debug
 *
 *     // enables code highlighting for code tags using Defer.dom()
 *     Defer.dom('pre code', 100, 'ide-loaded', Prism.highlightElement, {rootMargin: "120%"});
 *   });
 * </script>
 * ```
 */

/**
 * Programmatically reveal a {@link Node} which was lazy loaded by the library.
 *
 * @function Defer.reveal
 * @since    2.1
 * @param    {Node}   node - An HTML node which will be unveiled
 * @param    {string} [unveiledClass] - Class names that will be added to the node when it is unveiled.
 * @returns  {void}
   *
   * @example
   * ```js
   * // reveals a single element
   * var node = document.getElementById('my-video');
   * Defer.reveal(node);
   *
   * // reveals multiple elements
   * document.querySelectorAll('.multi-lazy')
   *   .forEach(function(node) {
   *     Defer.reveal(node);
   *   });
   *
   * // a short-hand for the above code
   * document.querySelectorAll('.multi-lazy').forEach(Defer.reveal);
   *
   * // adds 'unveiled' classname when an element unveiled
   * document.querySelectorAll('.multi-lazy')
   *   .forEach(function(node) {
   *     Defer.reveal(node, 'unveiled');
   *   });
   * ```
 */