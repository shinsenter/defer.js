# Package @shinsenter/defer.js

🥇 A super small, super efficient library that helps you lazy load almost everything like images, video, audio, iframes as well as stylesheets, and JavaScript.

[![NPM](https://img.shields.io/npm/l/@shinsenter/defer.js)](https://code.shin.company/defer.js/blob/master/LICENSE)
[![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@shinsenter/defer.js)](https://snyk.io/advisor/npm-package/@shinsenter/defer.js)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/shinsenter/defer.js)](https://www.codefactor.io/repository/github/shinsenter/defer.js)

* * *

[![GitHub Release Date](https://img.shields.io/github/release-date/shinsenter/defer.js)](https://code.shin.company/defer.js/releases)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/shinsenter/defer.js)](https://code.shin.company/defer.js/releases)
[![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@shinsenter/defer.js)](https://www.npmjs.com/package/@shinsenter/defer.js)
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/@shinsenter/defer.js)](https://www.jsdelivr.com/package/npm/@shinsenter/defer.js)

[![NPM](https://nodei.co/npm/@shinsenter/defer.js.png?downloads=true)](https://www.npmjs.com/package/@shinsenter/defer.js)

- **Package**: [@shinsenter/defer.js](https://www.npmjs.com/package/@shinsenter/defer.js)
- **Version**: 2.6.0
- **Author**: Mai Nhut Tan <shin@shin.company>
- **Copyright**: 2021 AppSeeds <https://code.shin.company/>
- **License**: [MIT](https://code.shin.company/defer.js/blob/master/LICENSE)

* * *


## Use cases

In real life, many resources and third-party scripts,
such as jQuery, are used to enhance our website
to add additional interactivity, animations, and other effects.

Unfortunately, third-party scripts usually block page rendering
and further downloading resources of the page.

There is a [common knowledge](https://web.dev/efficiently-load-third-party-javascript/)
that you should use `<script src="..." async>`
(or `<script src="..." defer>`)
and/or put your scripts at the very bottom of the page,
so that as much as possible of the page gets loaded
and rendered to the user, as fast as possible.

But in various cases, using `async` or `defer` attributes
does not deliver faster page speed than [defer.js](#Defer) does.
Furthermore [defer.js](#Defer) also gives you very simple ways
to flexibly optimize other resources in your website.


## Why you should consider defer.js

- ⚡️ Under 1KB (mingzipped size)
- 🚀 Native API, blazing fast
- 👍 No dependencies, no jQuery
- 🧩 Lazy load almost everything
- 🎯 [Core Web Vitals](https://web.dev/vitals/) friendly
- 🔰 Very easy to use
- 📱 Smartphone browser friendly
- ✅ Supports legacy browsers (IE9+)
- 🤝 Works well with your favorite frameworks


## Browser support

Works perfectly on modern browsers.
Lazy-loading is also available for Internet Explorer 9
<sup>* (with `IntersectionObserver` polyfill library)</sup> and later.

- 🖥 IE9+ / Microsoft EDGE
- 🖥 Firefox 4+
- 🖥 Safari 3+
- 🖥 Chrome
- 🖥 Opera
- 📱 Android 4+
- 📱 iOS 3.2+


## Getting started

### Basic

Add `defer.min.js` from this library into your HTML page,
just below the opening `<head>` tag.

You may download a ZIP of this library,
or load it from a CDN like below example.

```html
<head>
  <meta charset="UTF-8" />
  <title>My Awesome Page</title>

  <!-- Put defer.min.js here -->
  <script id="defer-js" src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@2.6.0/dist/defer.min.js"></script>

  <!-- ... -->
</head>
```

### Compatibility with previous releases

I strongly recommend that you should migrate
to the latest version for better performance.

If you have no time and want to ensure compatibility
with older version, use `defer_plus.min.js`
instead of `defer.min.js`.

```html
<head>
  <meta charset="UTF-8" />
  <title>My Awesome Page</title>

  <!-- Put defer_plus.min.js here -->
  <script id="defer-js" src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@2.6.0/dist/defer_plus.min.js"></script>

  <!-- ... -->
</head>
```

### Inlining the library

Since size of [defer.js](#Defer) library is optimized
to minimum size, you can inline entire library
in the `<head>` of the HTML document
to minimize the number of requests.

```html
<head>
  <meta charset="UTF-8" />
  <title>My Awesome Page</title>

  <!-- Inlining defer.min.js -->
  <script id="defer-js">/* content of defer.min.js will be here */</script>

  <!-- ... -->
</head>
```

### For OLD browsers (such as IE9)

To take advantage of native performance
for older browsers that doesn't support this feature (such as IE9),
you should load `IntersectionObserver` polyfill library
right after the `defer.min.js` script tag as following example:
```html
<!-- To support older browsers such as Internet Explorer 9 -->
<!-- Please put IntersectionObserver polyfill right after defer.js script tag -->
<script id="polyfill-js">'IntersectionObserver'in window||document.write('<script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"><\/script>');</script>
```

*Note*: most of modern browsers support IntersectionObserver feature,
so you don't have to concern about it.
## Functions

* [Defer(func, [delay])](#Defer) ⇒ <code>void</code>
    * [.all([selector])](#Defer.all) ⇒ <code>void</code>
    * [.js(src, [id], [delay], [callback])](#Defer.js) ⇒ <code>void</code>
    * [.css(src, [id], [delay], [callback])](#Defer.css) ⇒ <code>void</code>
    * [.dom([selector], [delay], [revealedClass], [validator], [observeOptions])](#Defer.dom) ⇒ <code>void</code>
    * [.reveal(element, [revealedClass])](#Defer.reveal) ⇒ <code>void</code>
* ~~[defer(func, [delay])](#defer)~~
* ~~[deferscript(src, [id], [delay], [callback])](#deferscript)~~
* ~~[deferstyle(src, [id], [delay], [callback])](#deferstyle)~~
* ~~[deferimg([selector], [delay], [revealedClass], [validator], [observeOptions])](#deferimg)~~
* ~~[deferiframe([selector], [delay], [revealedClass], [validator], [observeOptions])](#deferiframe)~~

## Typedefs

* [Node](#Node)
* [Function](#Function)
* [Closure](#Closure) ⇐ [<code>Function</code>](#Function)

<a name="Defer"></a>

## Defer(func, [delay]) ⇒ <code>void</code>
This function is used when you want to defer a JavaScript code block
and reduce the impact of its execution on page load performance.

A JavaScript block called by the `Defer()` function
is always guaranteed to be executed after your web page
has completely loaded other essential resources.

**Kind**: global function  
**Since**: 2.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| func | <code>function</code> |  | The function that will be deferred. |
| [delay] | <code>number</code> | <code>0</code> | The duration in miliseconds to delay the `func` function. |

**Example**  
Basic example.

```js
Defer(function() {
  // Put JavaScript code block here
  // and it will be executed after your page has finished loading.
  runMyHeavyFunction();
  runLongTasks();
  // or
  runMyAjaxRequests();
  connectTo3rdPartyServices();
});
```
**Example**  
The jQuery's `get` and `fadeIn()` functions
often affect DOM structure of web page and slows down page performance.
Calling `fadeIn()` with `Defer()` will reduce the impact significantly.

```js
Defer(function() {
  // A common example of using jQuery functions.
  // These functions may affect DOM structure if not deferred.
  jQuery.get('https://appseeds.net/api', function(result) {
    jQuery('#mydiv').hide().append(result);
    jQuery('#mydiv').fadeIn().show();
  });
}, 2000);
// The number 2000 means Defer() will delay execution
// of above jQuery functions after 2000ms when the page has finished loading.
```

* [Defer(func, [delay])](#Defer) ⇒ <code>void</code>
    * [.all([selector])](#Defer.all) ⇒ <code>void</code>
    * [.js(src, [id], [delay], [callback])](#Defer.js) ⇒ <code>void</code>
    * [.css(src, [id], [delay], [callback])](#Defer.css) ⇒ <code>void</code>
    * [.dom([selector], [delay], [revealedClass], [validator], [observeOptions])](#Defer.dom) ⇒ <code>void</code>
    * [.reveal(element, [revealedClass])](#Defer.reveal) ⇒ <code>void</code>


* * *

<a name="Defer.all"></a>

### Defer.all([selector]) ⇒ <code>void</code>
Applying above `Defer()` function to all script tags on your website
may take time. The `Defer.all()` function below can be a great help.

Simply replace the `type` attribute of script tags to `type="deferjs"`
and this library will automatically lazyload
all script tags with this attribute attached.

By default, the `Defer.all()` function is triggered automatically.

**Kind**: static method of [<code>Defer</code>](#Defer)  
**Since**: 2.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [selector] | <code>string</code> | <code>&quot;[type&#x3D;deferjs]&quot;</code> | A CSS selector that queries script tags will be deferred. |

**Example**  
Basic usage.

Before:
```html
<script type="text/javascript" src="/path/to/external-javascript.js"></script>
<script>
  // Example of JavaScript code block
</script>
```

After replacing `type` attributes to `type="deferjs"`:
```html
<script type="deferjs" src="/path/to/external-javascript.js"></script>
<script type="deferjs">
  // Example of JavaScript code block
</script>
```
**Example**  
If you don't want to use `type="deferjs"` syntax,
you can easily choose your own name.

This example uses `type="myjs"` instead of `type="deferjs"`:
```html
<script type="myjs" src="/path/to/heavy-javascript.js"></script>
<script type="myjs">
  // Some heavy DOM manipulations here
</script>

<!-- HTML content trimmed -->

<!-- Call Defer.all() after all other script tags -->
<script>Defer.all('script[type="myjs"]');</script>
```

*Important note:* make sure `Defer.all('script[type="myjs"]');` is placed
after all other script tags, such as very bottom of the `body` tag.

* * *

<a name="Defer.js"></a>

### Defer.js(src, [id], [delay], [callback]) ⇒ <code>void</code>
For lazy loading external JavaScript files.

This function is useful when you don't want heavy JavaScript
(especially the widgets of social networks, ad services)
to affect your website loading speed.

**Kind**: static method of [<code>Defer</code>](#Defer)  
**Since**: 2.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| src | <code>string</code> |  | URL to the js file that should be lazy loaded. |
| [id] | <code>string</code> |  | The ID will be assigned to the script tag to avoid downloading the same file multiple times. |
| [delay] | <code>number</code> | <code>0</code> | The duration in miliseconds to delay loading the js file. |
| [callback] | [<code>Closure</code>](#Closure) |  | The callback function will be executed if the js file is successfully loaded. |

**Example**  
Delay loading of Facebook SDK after 3000ms.
Then use a `callback` function trigger a Share dialog.

```js
window.fbAsyncInit = function() {
  FB.init({
    appId            : 'your-app-id',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v11.0'
  });
};

Defer.js('https://connect.facebook.net/en_US/sdk.js', 'fb-sdk', 3000, function () {
  // trigger a Share dialog when the SDK loaded
  FB.ui({
    method: 'share',
    href: 'https://developers.facebook.com/docs/'
  }, function(response){});
});
```

* * *

<a name="Defer.css"></a>

### Defer.css(src, [id], [delay], [callback]) ⇒ <code>void</code>
For lazy loading external CSS files.

This function is useful when you don't want heavy CSS
(like Web Fonts) to affect your website loading speed.

**Kind**: static method of [<code>Defer</code>](#Defer)  
**Since**: 2.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| src | <code>string</code> |  | URL to the css file that should be lazy loaded. |
| [id] | <code>string</code> |  | The ID will be assigned to the script tag to avoid downloading the same file multiple times. |
| [delay] | <code>number</code> | <code>0</code> | The duration in miliseconds to delay loading the css file. |
| [callback] | [<code>Closure</code>](#Closure) |  | The callback function will be executed if the css file is successfully loaded. |

**Example**  
Lazy load FontAwesome Webfont from its CDN.

```js
Defer.css('https://pro.fontawesome.com/releases/v5.10.0/css/all.css', 'fa5-css');
```
**Example**  
Delay loading animate.css from CDN,
then use a `callback` function to add some animations to `h1` tag.

```js
Defer.css('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css', 'animate-css', 1000, function () {
  jQuery('h1').addClass('animate__animated animate__bounce');
});
```

* * *

<a name="Defer.dom"></a>

### Defer.dom([selector], [delay], [revealedClass], [validator], [observeOptions]) ⇒ <code>void</code>
For lazy loading attributes of any element on web page.

Basically, this library use a feature called [IntersectionObserver](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API) to reveal an element
when user is scrolling to the position
where it appears within the browser's viewport.

The `Defer.dom` function also converts its `data-*` attributes
into regular attributes (e.g. from `data-src` to `src`),
so you can use this to lazyload your images and iframes as well.

**Kind**: static method of [<code>Defer</code>](#Defer)  
**Since**: 2.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [selector] | <code>string</code> | <code>&quot;[data-src]&quot;</code> | A CSS selector that queries elements will be lazy loaded. |
| [delay] | <code>number</code> | <code>0</code> | The duration in miliseconds to delay the lazy loading for the elements. |
| [revealedClass] | <code>string</code> |  | A CSS class will be added automatically after when an element has been successfully revealed. |
| [validator] | [<code>Closure</code>](#Closure) |  | A function will be executed with element will be lazy loaded as its argument. If the function returns `false`, lazy loading for that element will be skipped. |
| [observeOptions] | <code>object</code> |  | [Intersection observer options](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) |

**Example**  
Basic usage:
Lazy load all `<img>` tags which have CSS class `lazy`.

```html
<!-- Here may be a very long content -->

<img class="lazy" alt="Photo 1" data-src="https://picsum.photos/200/300?random=1" width="200" height="300" />
<img class="lazy" alt="Photo 2" data-src="https://picsum.photos/200/300?random=2" width="200" height="300" />
<img class="lazy" alt="Photo 3" data-src="https://picsum.photos/200/300?random=3" width="200" height="300" />

<script>
  // Lazy load img tags which have class="lazy"
  Defer.dom('img.lazy');
</script>
```
**Example**  
Basic usage:
Usage with responsive images.

```html
<!-- Here may be a very long content -->

<!-- Usage with responsive images -->
<img class="lazy" alt="Responsive photo"
  width="200" height="300"
  data-src="https://picsum.photos/200/300"
  sizes="(max-width: 600px) 480px, 800px"
  data-srcset="https://picsum.photos/480/640 480w, https://picsum.photos/800/1200 800w" />

<script>
  // Lazy load img tags which have class="lazy"
  Defer.dom('img.lazy');
</script>
```
**Example**  
Basic usage:
Lazy load background images of `div` tags.

```html
<style>
  div.card {
    display: inline-block;
    background-repeat:no-repeat;
    background-size:contain;
    margin: 5px;
    width: 200px;
    height: 300px;
  }
  div.card.revealed {
    box-shadow: 0 0 5px rgb(0 0 0 / 20%);
    border-radius: 5px;
  }
</style>

<!-- Here may be a very long content -->

<div class="card" bgurl="https://picsum.photos/200/300?random=1">&nbsp;</div>
<div class="card" bgurl="https://picsum.photos/200/300?random=2">&nbsp;</div>
<div class="card" bgurl="https://picsum.photos/200/300?random=3">&nbsp;</div>
<div class="card" bgurl="https://picsum.photos/200/300?random=4">&nbsp;</div>

<script>
  // Lazy load div tags which have class="card" and bgurl attribute
  Defer.dom('div.card[bgurl]', 0, 'revealed', function (div) {
    var url = div.getAttribute('bgurl');
    if (url) {
      div.style.backgroundImage = 'url(' + url + ')';
    }
  });
</script>
```
**Example**  
Advanced usage:
Delay lazy loading `<img>` tags 200ms after the page has completely loaded.
Then it will add a CSS class `loaded` to the fully lazy loaded image elements.

```html
<!-- Here may be a very long content -->

<img class="lazy" alt="Photo 1" data-src="https://picsum.photos/200/300?random=4" width="200" height="300" />
<img class="lazy" alt="Photo 2" data-src="https://picsum.photos/200/300?random=5" width="200" height="300" />
<img class="lazy" alt="Photo 3" data-src="https://picsum.photos/200/300?random=6" width="200" height="300" />

<script>
  // Lazy load img tags which have class="lazy"
  // then add `loaded` to elements' class attribute.
  Defer.dom('img.lazy', 200, 'loaded');
</script>
```
**Example**  
Advanced usage: Lazy load with [Intersection observer options](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)

```html
<!-- Here may be a very long content -->

<img class="early-lazy" alt="Photo 1" data-src="https://picsum.photos/200/300?random=7" width="200" height="300" />
<img class="early-lazy" alt="Photo 2" data-src="https://picsum.photos/200/300?random=8" width="200" height="300" />
<img class="early-lazy" alt="Photo 3" data-src="https://picsum.photos/200/300?random=9" width="200" height="300" />

<script>
  // Preload images within 200% of the current viewport size.
  Defer.dom("img.early-lazy", 200, "loaded", null, {
    rootMargin: "200%"
  });
</script>
```
**Example**  
We can use CSS class that added to the lazy loaded element
to add animation to the successfully loaded elements.

```html
<style>
  img.fade {
    transition: opacity 500ms ease-in-out;
    opacity: 0;
  }
  img.fade.revealed {
    background: none;
    opacity: 1;
  }
</style>

<!-- Here may be a very long content -->

<img class="fade" alt="Photo 1" data-src="https://picsum.photos/200/300?random=10" width="200" height="300" />
<img class="fade" alt="Photo 2" data-src="https://picsum.photos/200/300?random=11" width="200" height="300" />
<img class="fade" alt="Photo 3" data-src="https://picsum.photos/200/300?random=12" width="200" height="300" />

<script>
  // Lazy load img tags which have class="fade"
  // then add `revealed` to elements' class attribute.
  Defer.dom('img.fade', 200, 'revealed');
</script>
```
**Example**  
This function can be used similarly for other tags
such as `<iframe>`, `<video>`, `<audio>`, `<picture>` tags.

```html
<!-- Here may be a very long content -->

<iframe class="multi-lazy" title="Youtube"
  width="400" height="300" allowfullscreen
  allow="accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture"
  data-style="background: url(https://img.youtube.com/vi/Uz970DggW7E/hqdefault.jpg) 50% 50% / cover no-repeat;"
  data-src="https://www.youtube.com/embed/Uz970DggW7E"></iframe>

<picture class="multi-lazy">
  <source media="(min-width:800px)" data-srcset="https://picsum.photos/800/1200">
  <source media="(min-width:600px)" data-srcset="https://picsum.photos/600/900">
  <img data-src="https://picsum.photos/200/300" alt="Photo" style="width:auto;">
</picture>

<audio class="multi-lazy" controls>
  <source data-src="sound.ogg" type="audio/ogg">
  <source data-src="sound.mp3" type="audio/mpeg">
  Your browser does not support the audio tag.
</audio>

<video class="multi-lazy" width="320" height="240" controls>
  <source data-src="movie.mp4" type="video/mp4">
  <source data-src="movie.ogg" type="video/ogg">
  Your browser does not support the video tag.
</video>

<script>
  // Lazy load all elements which have CSS class `multi-lazy`
  Defer.dom('.multi-lazy', 200, 'loaded');
</script>
```
**Example**  
Or even execute a piece of JavaScript
when the user scrolls to the element `#scroll_reveal`.

```html
<!-- Here may be a very long content -->

<div id="scroll_reveal">
  This is my content.
</div>

<script>
  // Show an alert when user scrolled to #scroll_reveal
  Defer.dom('#scroll_reveal', null, null, function(element) {
    window.alert('You scrolled to #' + element.id);
  });
</script>
```
**Example**  
Combine with other Defer functions.
Delay loading highlightjs library for 1000ms.
Then when you scroll to any `code` tag, enable code highlighting for it.

```js
var base = 'https://cdn.jsdelivr.net/npm/highlightjs@9.12.0';
Defer.css(base + '/styles/rainbow.css', 'hljs-css', 1000);
Defer.js(base + '/highlight.pack.min.js', 'hljs-js', 1000, function () {
  Defer.dom('pre code', 0, 'ide-loaded', function (block) {
    hljs.highlightBlock(block);
  });
});
```

* * *

<a name="Defer.reveal"></a>

### Defer.reveal(element, [revealedClass]) ⇒ <code>void</code>
Reveals an element which is lazyloaded by the library

**Kind**: static method of [<code>Defer</code>](#Defer)  
**Since**: 2.1  

| Param | Type | Description |
| --- | --- | --- |
| element | [<code>Node</code>](#Node) | The DOM [Node](#Node) element |
| [revealedClass] | <code>string</code> | A CSS class will be added automatically after when an element has been successfully revealed. |

**Example**  
```js
// Show single element
var node = document.getElementById('my-video');
Defer.reveal(node);

// Show multiple elements
document.querySelectorAll('.multi-lazy')
  .forEach(function(node) {
    Defer.reveal(node);
  });

// Or even shorter way
document.querySelectorAll('.multi-lazy').forEach(Defer.reveal);

// Add 'loaded' class name after revealed elements
document.querySelectorAll('.multi-lazy')
  .forEach(function(node) {
    Defer.reveal(node, 'loaded');
  });
```

* * *

<a name="defer"></a>

## ~~defer(func, [delay])~~
***Deprecated***

Deprecated since version 2.0

**Kind**: global function  
**See**: [Defer](#Defer)  
**Since**: 1.0  

| Param | Type |
| --- | --- |
| func | <code>function</code> | 
| [delay] | <code>number</code> | 


* * *

<a name="deferscript"></a>

## ~~deferscript(src, [id], [delay], [callback])~~
***Deprecated***

Deprecated since version 2.0

**Kind**: global function  
**See**: [js](#Defer.js)  
**Since**: 1.0  

| Param | Type |
| --- | --- |
| src | <code>string</code> | 
| [id] | <code>string</code> | 
| [delay] | <code>number</code> | 
| [callback] | <code>callback</code> | 


* * *

<a name="deferstyle"></a>

## ~~deferstyle(src, [id], [delay], [callback])~~
***Deprecated***

Deprecated since version 2.0

**Kind**: global function  
**See**: [css](#Defer.css)  
**Since**: 1.0  

| Param | Type |
| --- | --- |
| src | <code>string</code> | 
| [id] | <code>string</code> | 
| [delay] | <code>number</code> | 
| [callback] | <code>callback</code> | 


* * *

<a name="deferimg"></a>

## ~~deferimg([selector], [delay], [revealedClass], [validator], [observeOptions])~~
***Deprecated***

Deprecated since version 2.0

**Kind**: global function  
**See**: [dom](#Defer.dom)  
**Since**: 1.0  

| Param | Type |
| --- | --- |
| [selector] | <code>string</code> | 
| [delay] | <code>number</code> | 
| [revealedClass] | <code>string</code> | 
| [validator] | <code>callback</code> | 
| [observeOptions] | <code>object</code> | 


* * *

<a name="deferiframe"></a>

## ~~deferiframe([selector], [delay], [revealedClass], [validator], [observeOptions])~~
***Deprecated***

Deprecated since version 2.0

**Kind**: global function  
**See**: [dom](#Defer.dom)  
**Since**: 1.0  

| Param | Type |
| --- | --- |
| [selector] | <code>string</code> | 
| [delay] | <code>number</code> | 
| [revealedClass] | <code>string</code> | 
| [validator] | <code>callback</code> | 
| [observeOptions] | <code>object</code> | 


* * *

<a name="Node"></a>

## Node
The DOM Node interface

**Kind**: global typedef  
**See**: [https://developer.mozilla.org/docs/Web/API/Node](https://developer.mozilla.org/docs/Web/API/Node)  

* * *

<a name="Function"></a>

## Function
A function is a code snippet that can be called by other code or by itself.

**Kind**: global typedef  
**See**: [https://developer.mozilla.org/docs/Glossary/Function](https://developer.mozilla.org/docs/Glossary/Function)  

* * *

<a name="Closure"></a>

## Closure ⇐ [<code>Function</code>](#Function)
In this library, a closure is a [Function](#Function) that gives you access to a DOM [Node](#Node) element.

**Kind**: global typedef  
**Extends**: [<code>Function</code>](#Function)  
**See**: [https://developer.mozilla.org/docs/Web/JavaScript/Closures](https://developer.mozilla.org/docs/Web/JavaScript/Closures)  

| Param | Type | Description |
| --- | --- | --- |
| element | [<code>Node</code>](#Node) | The DOM [Node](#Node) element |


* * *

## Defer.js for another platforms

### PHP library

[https://code.shin.company/defer.php/](https://code.shin.company/defer.php/)

🚀 A PHP library that focuses on minimizing payload size of HTML document and optimizing processing on the browser when rendering the web page.


### Wordpress plugin

[https://code.shin.company/defer-wordpress/](https://code.shin.company/defer-wordpress/)

⚡️ A native, blazing fast lazy loader. ✅ Legacy browsers support (IE9+). 💯 SEO friendly. 🧩 Lazy load almost anything.


### Laravel package

[https://code.shin.company/defer-laravel/](https://code.shin.company/defer-laravel/)

🚀 A Laravel package that focuses on minimizing payload size of HTML document and optimizing processing on the browser when rendering the web page.


## Support my activities

[![Donate via Paypal](https://img.shields.io/badge/Donate-Paypal-blue)](https://www.paypal.me/shinsenter)
[![Become a sponsor](https://img.shields.io/badge/Donate-Patreon-orange)](https://www.patreon.com/appseeds)
[![Become a stargazer](https://img.shields.io/badge/Support-Stargazer-yellow)](https://code.shin.company/defer.js/stargazers)
[![Report an issue](https://img.shields.io/badge/Support-Issues-green)](https://code.shin.company/defer.js/issues/new)
[![Join the chat at https://gitter.im/shinsenter/defer.js](https://badges.gitter.im/shinsenter/defer.js.svg)](https://gitter.im/shinsenter/defer.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

* * *

From Vietnam 🇻🇳 with love.
