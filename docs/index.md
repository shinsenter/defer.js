# Package @shinsenter/defer.js

🥇 A super small, super efficient library that helps you lazy load almost everything like images, video, audio, iframes as well as stylesheets, and JavaScript.

[![NPM](https://img.shields.io/npm/l/@shinsenter/defer.js)](https://raw.githubusercontent.com/shinsenter/defer.js/master/LICENSE)
[![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@shinsenter/defer.js)](https://snyk.io/advisor/npm-package/@shinsenter/defer.js)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/shinsenter/defer.js)](https://www.codefactor.io/repository/github/shinsenter/defer.js)

* * *

[![GitHub Release Date](https://img.shields.io/github/release-date/shinsenter/defer.js)](https://github.com/shinsenter/defer.js/releases)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/shinsenter/defer.js)](https://github.com/shinsenter/defer.js/releases)
[![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@shinsenter/defer.js)](https://www.npmjs.com/package/@shinsenter/defer.js)
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/@shinsenter/defer.js)](https://www.jsdelivr.com/package/npm/@shinsenter/defer.js)

[![NPM](https://nodei.co/npm/@shinsenter/defer.js.png?downloads=true)](https://www.npmjs.com/package/@shinsenter/defer.js)

- **Package**: [@shinsenter/defer.js](https://www.npmjs.com/package/@shinsenter/defer.js)
- **Version**: 2.3.0
- **Author**: Mai Nhut Tan <shin@shin.company>
- **Copyright**: 2021 AppSeeds <https://code.shin.company/>
- **License**: [MIT](https://raw.githubusercontent.com/shinsenter/defer.js/master/LICENSE)

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

Available in latest browsers,
also works perfectly with Internet Explorer 9
<sup>* (with `IntersectionObserver` polyfill library)</sup> and later.

- 🖥 IE9+ / Microsoft EDGE *
- 🖥 Firefox 4+
- 🖥 Safari 3+
- 🖥 Chrome *
- 🖥 Opera *
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
  <script src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@2.3.0/dist/defer.min.js"></script>

  <!-- To support older browsers such as Internet Explorer 9 -->
  <!-- You may want to put IntersectionObserver polyfill right after defer.min.js tag -->
  <script>'IntersectionObserver'in window||document.write('<script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"><\/script>');</script>

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
<!-- Put defer_plus.min.js here -->
<script src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@2.3.0/dist/defer_plus.min.js"></script>

<!-- To support older browsers such as Internet Explorer 9 -->
<!-- You may want to put IntersectionObserver polyfill right after defer.min.js tag -->
<script>'IntersectionObserver'in window||document.write('<script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"><\/script>');</script>
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
  <script>/* content of defer.min.js will be here */</script>

  <!-- ... -->
</head>
```
## Functions

* [Defer(func, [delay])](#Defer) ⇒ <code>void</code>
    * [.all([selector])](#Defer.all) ⇒ <code>void</code>
    * [.js(src, [id], [delay], [callback])](#Defer.js) ⇒ <code>void</code>
    * [.css(src, [id], [delay], [callback])](#Defer.css) ⇒ <code>void</code>
    * [.dom([selector], [delay], [revealedClass], [validator], [observeOptions])](#Defer.dom) ⇒ <code>void</code>
    * [.reveal(element)](#Defer.reveal) ⇒ <code>void</code>
* ~~[defer(func, [delay])](#defer)~~
* ~~[deferscript(src, [id], [delay], [callback])](#deferscript)~~
* ~~[deferstyle(src, [id], [delay], [callback])](#deferstyle)~~
* ~~[deferimg([selector], [delay], [revealedClass], [validator], [observeOptions])](#deferimg)~~
* ~~[deferiframe([selector], [delay], [revealedClass], [validator], [observeOptions])](#deferiframe)~~

## Typedefs

* [function](#function) ⇒ <code>void</code>
* [closure](#closure) ⇒ <code>void</code> \| <code>bool</code>
* [Node](#Node)

<a name="Defer"></a>

## Defer(func, [delay]) ⇒ <code>void</code>
Used to delay execution of JavaScript
which may adversely affect the loading of your web page.

All JavaScript delayed by `Defer()` will only executed
after the web page has completely loaded.

**Kind**: global function  
**Since**: 2.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| func | [<code>function</code>](#function) |  | The function that will be deferred. |
| [delay] | <code>number</code> | <code>0</code> | The duration in miliseconds to delay the `func` function. |

**Example**  
Delay some heavy DOM manipulations in JavaScript.

```js
Defer(function() {
  // Some JavaScript that may block page rendering
  // such as calling jQuery's fadeIn() feature
  jQuery('div').hide().fadeIn().show();
}); // <- script runs after the page has completely loaded
```
**Example**  
Delay the same JavaScript as above for 3000ms.

```js
Defer(function() {
  jQuery('div').hide().fadeIn().show();
}, 3000); // <- Added 3000 = Delay for 3000ms
```

* [Defer(func, [delay])](#Defer) ⇒ <code>void</code>
    * [.all([selector])](#Defer.all) ⇒ <code>void</code>
    * [.js(src, [id], [delay], [callback])](#Defer.js) ⇒ <code>void</code>
    * [.css(src, [id], [delay], [callback])](#Defer.css) ⇒ <code>void</code>
    * [.dom([selector], [delay], [revealedClass], [validator], [observeOptions])](#Defer.dom) ⇒ <code>void</code>
    * [.reveal(element)](#Defer.reveal) ⇒ <code>void</code>


* * *

<a name="Defer.all"></a>

### Defer.all([selector]) ⇒ <code>void</code>
This function is useful for lazy-loading script tags.

All script tags with attribute `<script type="deferjs">`
will be delayed and automatically executed
as soon as the page has completely loaded.

By default, this function is triggered automatically.

Note: For customized deferjs type,
please call `Defer.all()` at the bottom of the `<body>` tag.

**Kind**: static method of [<code>Defer</code>](#Defer)  
**Since**: 2.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [selector] | <code>string</code> | <code>&quot;[type&#x3D;deferjs]&quot;</code> | A CSS selector that queries script tags will be deferred. |

**Example**  
You just need to simply change `type="text/javascript"` to `type="deferjs"`,
or add `type="deferjs"` to your script tag for it to take effect.

Before:
```html
<script type="text/javascript" src="/path/to/heavy-javascript.js"></script>
<script>
    // Some heavy DOM manipulations here
</script>
```
After:
```html
<script type="deferjs" src="/path/to/heavy-javascript.js"></script>
<script type="deferjs">
    // Some heavy DOM manipulations here
</script>
```
**Example**  
If you don't want the `<script type="deferjs">` syntax,
you can easily choose your own name.

This example uses `type="myjs"` instead of `type="deferjs"`:
```html
<script type="myjs" src="/path/to/heavy-javascript.js"></script>
<script type="myjs">
    // Some heavy DOM manipulations here
</script>

<!-- Call Defer.all() at the bottom of the `<body>` tag -->
<script>Defer.all('script[type="myjs"]');</script>
```

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
| [callback] | [<code>closure</code>](#closure) |  | The callback function will be executed if the js file is successfully loaded. |

**Example**  
Delay loading of Facebook SDK after 3000ms.

```js
Defer.js('https://connect.facebook.net/en_US/sdk.js', 'fb-sdk', 3000);
```
**Example**  
Delay loading of AddThis SDK after 5000ms.

```js
var addthis_id = 'ra-5c68e61cf456f1cb';
Defer.js('https://s7.addthis.com/js/300/addthis_widget.js#pubid=' + addthis_id, 'addthis-js', 5000);
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
| [callback] | [<code>closure</code>](#closure) |  | The callback function will be executed if the css file is successfully loaded. |

**Example**  
Lazy load FontAwesome Webfont from its CDN.

```js
Defer.css('https://pro.fontawesome.com/releases/v5.10.0/css/all.css', 'fa5-css');
```
**Example**  
Delay loading animate.css from CDN for 1000ms.

```js
Defer.css('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css', 'animate-css', 1000);
```

* * *

<a name="Defer.dom"></a>

### Defer.dom([selector], [delay], [revealedClass], [validator], [observeOptions]) ⇒ <code>void</code>
For lazy loading attributes of any element on the page.

Basically, the `Defer.dom` function converts all `data-*` attributes
into regular attributes (e.g. from `data-src` to `src`)
when user scrolling to the position
where the element appears within the browser's viewport.

Most of modern browsers support
[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) feature.

To take advantage of native performance
for older browsers that doesn't support this feature (such as IE9),
you should load `IntersectionObserver` polyfill library
right after the `defer.min.js` script tag as following example:
```html
<!-- Put defer.min.js here -->
<script src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@2.3.0/dist/defer.min.js"></script>

<!-- Put polyfill right after defer.min.js tag -->
<script>'IntersectionObserver'in window||document.write('<script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"><\/script>');</script>
```

**Kind**: static method of [<code>Defer</code>](#Defer)  
**Since**: 2.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [selector] | <code>string</code> | <code>&quot;[data-src]&quot;</code> | A CSS selector that queries elements will be lazy loaded. |
| [delay] | <code>number</code> | <code>0</code> | The duration in miliseconds to delay the lazy loading for the elements. |
| [revealedClass] | <code>string</code> |  | A CSS class will be added automatically after when an element has been successfully revealed. |
| [validator] | [<code>closure</code>](#closure) |  | A function will be executed with element will be lazy loaded as its argument. If the function returns `false`, lazy loading for that element will be skipped. |
| [observeOptions] | <code>object</code> |  | [Intersection observer options](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) |

**Example**  
Basic usage:
Lazy load all `<img>` tags which have CSS class `lazy`.

```html
<script>Defer.dom('img.lazy');</script>

<!-- Here may be a very long content -->

<img class="lazy" alt="Photo 1" data-src="https://picsum.photos/200/300?random=1" width="200" height="300" />
<img class="lazy" alt="Photo 2" data-src="https://picsum.photos/200/300?random=2" width="200" height="300" />
<img class="lazy" alt="Photo 3" data-src="https://picsum.photos/200/300?random=3" width="200" height="300" />
```
**Example**  
Basic usage:
Lazy load background image of a `div` tag.

```html
<style>
  #my_div {
    width: 300px;
    height: 200px;
  }
</style>

<script>
  // Lazy load div tag which has id="my_div"
  Defer.dom('#my_div');
</script>

<!-- Here may be a very long content -->

<div id="my_div"
  data-style="background: url(https://img.youtube.com/vi/Uz970DggW7E/hqdefault.jpg) 50% 50% / cover no-repeat;">
  <!-- The content -->
</div>
```
**Example**  
Advanced usage:
Delay lazy loading `<img>` tags 200ms after the page has completely loaded.
Then it will add a CSS class `loaded` to the fully lazy loaded image element.

```html
<script>Defer.dom('img.lazy', 200, 'loaded');</script>

<!-- Here may be a very long content -->

<img class="lazy" alt="Photo 1" data-src="https://picsum.photos/200/300?random=4" width="200" height="300" />
<img class="lazy" alt="Photo 2" data-src="https://picsum.photos/200/300?random=5" width="200" height="300" />
<img class="lazy" alt="Photo 3" data-src="https://picsum.photos/200/300?random=6" width="200" height="300" />
```
**Example**  
Advanced usage: Lazy load with [Intersection observer options](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)

```html
<script>
  // Preload images within 200% of the current viewport size.
  Defer.dom("img.early-lazy", 200, "loaded", null, {
    rootMargin: "200%"
  });
</script>

<!-- Here may be a very long content -->

<img class="early-lazy" alt="Photo 1" data-src="https://picsum.photos/200/300?random=7" width="200" height="300" />
<img class="early-lazy" alt="Photo 2" data-src="https://picsum.photos/200/300?random=8" width="200" height="300" />
<img class="early-lazy" alt="Photo 3" data-src="https://picsum.photos/200/300?random=9" width="200" height="300" />
```
**Example**  
We can use CSS class that added to the lazy loaded element
to add animation to the successfully loaded elements.

```html
<script>Defer.dom('img.fade', 200, 'loaded');</script>
<style>
  img.fade {
    transition: opacity 500ms ease-in-out;
    opacity: 0;
  }
  img.fade.loaded {
    background: none;
    opacity: 1;
  }
</style>

<!-- Here may be a very long content -->

<img class="fade" alt="Photo 1" data-src="https://picsum.photos/200/300?random=10" width="200" height="300" />
<img class="fade" alt="Photo 2" data-src="https://picsum.photos/200/300?random=11" width="200" height="300" />
<img class="fade" alt="Photo 3" data-src="https://picsum.photos/200/300?random=12" width="200" height="300" />
```
**Example**  
This function can be used similarly for other tags
such as `<iframe>`, `<video>`, `<audio>`, `<picture>` tags.

```html
<script>
  // Lazy load all elements which have CSS class `multi-lazy`
  Defer.dom('.multi-lazy', 200, 'loaded');
</script>

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
```
**Example**  
Or even execute a piece of JavaScript
when the user scrolls to the element `#scroll_reveal`.

```html
<script>
  // Show an alert when user scrolled to #scroll_reveal
  Defer.dom('#scroll_reveal', null, null, function(element) {
    window.alert('You scrolled to #' + element.id);
  });
</script>

<!-- Here may be a very long content -->

<div id="scroll_reveal">
  This is my content.
</div>
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

### Defer.reveal(element) ⇒ <code>void</code>
Reveal an element which is lazyloaded by the library

**Kind**: static method of [<code>Defer</code>](#Defer)  
**Since**: 2.1  

| Param | Type | Description |
| --- | --- | --- |
| element | [<code>Node</code>](#Node) | The DOM [Node](#Node) element |

**Example**  
```js
// Show single element
var node = document.getElementById('my-video');
Defer.reveal(node);

// Show multiple elements
document.querySelectorAll('.multi-lazy').forEach(function(node) {
  Defer.reveal(node);
});

// Or even shorter way
document.querySelectorAll('.multi-lazy').forEach(Defer.reveal);
```

* * *

<a name="defer"></a>

## ~~defer(func, [delay])~~
***Deprecated***

**Kind**: global function  
**See**: [Defer](#Defer)  
**Since**: 1.0  

| Param | Type |
| --- | --- |
| func | [<code>function</code>](#function) | 
| [delay] | <code>number</code> | 


* * *

<a name="deferscript"></a>

## ~~deferscript(src, [id], [delay], [callback])~~
***Deprecated***

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

<a name="function"></a>

## function ⇒ <code>void</code>
A definition for an ordinary function,
used as a parameter to another function.

**Kind**: global typedef  

* * *

<a name="closure"></a>

## closure ⇒ <code>void</code> \| <code>bool</code>
The definition for a function that takes one parameter is a DOM [Node](#Node) element

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| element | [<code>Node</code>](#Node) | The DOM [Node](#Node) element |


* * *

<a name="Node"></a>

## Node
The DOM Node interface

**Kind**: global typedef  
**See**: [https://developer.mozilla.org/en-US/docs/Web/API/Node](https://developer.mozilla.org/en-US/docs/Web/API/Node)  

* * *

## Defer.js for another platforms

### PHP library

[https://github.com/shinsenter/defer.php/](https://github.com/shinsenter/defer.php/)

🚀 A PHP library that focuses on minimizing payload size of HTML document and optimizing processing on the browser when rendering the web page.


### Wordpress plugin

[https://github.com/shinsenter/defer-wordpress/](https://github.com/shinsenter/defer-wordpress/)

⚡️ A native, blazing fast lazy loader. ✅ Legacy browsers support (IE9+). 💯 SEO friendly. 🧩 Lazy load almost anything.


### Laravel package

[https://github.com/shinsenter/defer-laravel/](https://github.com/shinsenter/defer-laravel/)

Under development.


## Support my activities

[![Donate via Paypal](https://img.shields.io/badge/Donate-Paypal-blue)](https://www.paypal.me/shinsenter)
[![Become a sponsor](https://img.shields.io/badge/Donate-Patreon-orange)](https://www.patreon.com/appseeds)
[![Become a stargazer](https://img.shields.io/badge/Support-Stargazer-yellow)](https://github.com/shinsenter/defer.js/stargazers)
[![Report an issue](https://img.shields.io/badge/Support-Issues-red)](https://github.com/shinsenter/defer.js/issues/new)


* * *

From Vietnam 🇻🇳 with love.
