# Package @shinsenter/defer.js

🥇 A JavaScript micro-library that helps you lazy load (almost) anything. Defer.js is zero-dependency, super-efficient, and Web Vitals friendly.

[![NPM](https://img.shields.io/npm/l/@shinsenter/defer.js)](https://code.shin.company/defer.js/blob/master/LICENSE)
[![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@shinsenter/defer.js)](https://snyk.io/advisor/npm-package/@shinsenter/defer.js)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/shinsenter/defer.js)](https://www.codefactor.io/repository/github/shinsenter/defer.js)
[![GitHub Release Date](https://img.shields.io/github/release-date/shinsenter/defer.js)](https://code.shin.company/defer.js/releases)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/shinsenter/defer.js)](https://code.shin.company/defer.js/releases)
[![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@shinsenter/defer.js)](https://www.npmjs.com/package/@shinsenter/defer.js)
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/@shinsenter/defer.js)](https://www.jsdelivr.com/package/npm/@shinsenter/defer.js)


* * *


## Introduction

Lagging Big CSS files, slow JavaScript, or bulky media resources can cause issues with your website's Web Vitals, leading to a slow and frustrating user experience. But what if you could fully defer these resources and improve your website's load speed?

By using Defer.js, you can say goodbye to these issues! With its lazy loading capabilities, dependency-free design, lightning-fast performance, and hard-won experience, Defer.js is the perfect solution for optimizing your website's Web Vitals. Whether you're using a modern or legacy browser, Defer.js makes it easy to enhance your website's user experience with lightning-fast loading times.

[![NPM](https://nodei.co/npm/@shinsenter/defer.js.png?downloads=true)](https://www.npmjs.com/package/@shinsenter/defer.js)

- **Package**: [@shinsenter/defer.js](https://www.npmjs.com/package/@shinsenter/defer.js)
- **Version**: 3.7.0
- **Author**: Mai Nhut Tan <shin@shin.company>
- **Copyright**: 2019-2023 SHIN Company <https://code.shin.company/>
- **License**: [MIT](https://code.shin.company/defer.js/blob/master/LICENSE)

---

## Document in other languages

> [NEED HELP] Let's make the documentation and examples better together!

### 日本語

日本人のはこちらの記事を参考にしていただければ幸いです。

- アタルさんの[Defer.js ドキュメント （日本語訳）](https://blog.gadgets-geek.net/2023/02/deferjs-doc-japanese.html)
- あトんさんの[記事](https://www.heavy-peat.com/2022/02/defer.html)
- リモスキさんの[記事](https://www.limosuki.com/2022/06/twitter-lazyload-deferjs.html)

#### Credits

I would like to express warm thanks to [@Ataruchi](https://twitter.com/Ataruchi), [@HeavyPeat](https://twitter.com/HeavyPeat) and [Limosuki](https://www.limosuki.com/) for their articles in Japanese.

***

## Why Choose Defer.js

- 🧩 Lazy load almost anything with ease
- 🚀 Lightweight and fast, with no dependencies
- 🤝 Effortlessly integrates with your favorite frameworks
- 🔰 Easy to use, even for beginners
- ⚡️ Super tiny (minzipped size is around 1KB)
- 🦾 Optimized for the latest Web Vitals standards
- 📱 Optimized for use on smartphones
- ✅ Supports legacy browsers like Internet Explorer 9

<sup>*Legacy browsers like Internet Explorer 9 require `IntersectionObserver` polyfill.</sup>

## Browser Support

Defer.js is compatible with all modern browsers, including:
- 🖥 IE9+ / Edge
- 🖥 Firefox 4+
- 🖥 Safari 3+
- 🖥 Chrome
- 🖥 Opera
- 📱 Android 4+
- 📱 iOS 3.2+

---

## Known issues

- [Discussion #122](https://code.shin.company/defer.js/discussions/122):
In iOS Safari, the first `click` event may not work when using `Defer.all()` with the `waitForUserAction` argument set to `true` and one of deferred scripts make a DOM change.

---

## Getting started

Defer.js is an easy-to-use library that will help boost your website's performance by reducing loading times. Here's how to get started:

### Basic

Add the Defer.js library to your page by including a `<script>` tag just below the opening `<head>` tag.

```html
<head>
  <meta charset="UTF-8" />
  <title>My Awesome Page</title>

  <!-- Add Defer.js here -->
  <script src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@3.7.0/dist/defer.min.js"></script>

  <!-- ... -->
</head>
```

### Inlining the library

To save an HTTP request, you can even inline the entire Defer.js library by copying its content from the [defer.min.js](https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@3.7.0/dist/defer.min.js) and replacing the comments in the script tag with its content.

```html
<head>
  <meta charset="UTF-8" />
  <title>My Awesome Page</title>

  <!-- Add the Inlined Defer.js here -->
  <script>/* Defer.js content goes here */</script>

  <!-- ... -->
</head>
```

### Compatibility with older versions

If you're using an older version of Defer.js, you can use `defer_plus.min.js` instead of `defer.min.js`.

```html
<head>
  <meta charset="UTF-8" />
  <title>My Awesome Page</title>

  <!-- Put defer_plus.min.js here -->
  <script src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@3.7.0/dist/defer_plus.min.js"></script>

  <!-- ... -->
</head>
```

### For OLD browsers (such as IE9)

To enhance performance for legacy browsers that don't support the `IntersectionObserver` feature, you can load the IntersectionObserver polyfill library after the `defer.min.js` script tag.

```html
<script>/* Defer.js content */</script>

<!-- Add the IntersectionObserver Polyfill for legacy browsers -->
<script>'IntersectionObserver'in window||document.write('<script src="https://cdn.jsdelivr.net/npm/@shinsenter/defer.js@3.7.0/dist/polyfill.min.js"><\/script>');</script>
```

*NOTE*: Modern browsers support the `IntersectionObserver` feature, so you don't have to worry about adding the polyfill if you don't have legacy browsers in mind.

---

## Functions

* [Defer(func, [delay], [waitForUserAction])](#Defer) ⇒ <code>void</code>
    * [.lazy](#Defer.lazy) : <code>boolean</code>
    * [.all([selector], [delay], [waitForUserAction])](#Defer.all) ⇒ <code>void</code>
    * [.dom([selector], [delay], [unveiledClass], [resolver], [observeOptions])](#Defer.dom) ⇒ <code>void</code>
    * [.css(fileUrl, [id_or_attributes], [delay], [onload], [waitForUserAction])](#Defer.css) ⇒ <code>void</code>
    * [.js(fileUrl, [id_or_attributes], [delay], [onload], [waitForUserAction])](#Defer.js) ⇒ <code>void</code>
    * [.reveal(node, [unveiledClass])](#Defer.reveal) ⇒ <code>void</code>
* ~~[defer(func, [delay])](#defer)~~
* ~~[deferimg([selector], [delay], [unveiledClass], [resolver], [observeOptions])](#deferimg)~~
* ~~[deferiframe([selector], [delay], [unveiledClass], [resolver], [observeOptions])](#deferiframe)~~
* ~~[deferstyle(src, [id], [delay], [onload])](#deferstyle)~~
* ~~[deferscript(src, [id], [delay], [onload])](#deferscript)~~

## Typedefs

* [Node](#Node)
* [Function](#Function)
* [NodeHandler](#NodeHandler) ⇐ [<code>Function</code>](#Function)

<a name="Defer"></a>

## Defer(func, [delay], [waitForUserAction]) ⇒ <code>void</code>
Heavy DOM manipulations may cause render-blocking issues in real scenarios.
Wrapping your script with `Defer()` may help your website prevent render-blocking issues.

**Kind**: global function  
**Since**: 2.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| func | <code>function</code> |  | A function to be executed after page fully loaded. |
| [delay] | <code>number</code> | <code>0</code> | A timespan, in milliseconds, that the page should wait before the function is executed. |
| [waitForUserAction] | <code>boolean</code> | <code>false</code> | This argument tells `Defer()` to delay the execution and wait until there is a user interaction. |

**Example**  
jQuery is used in this example to perform some DOM manipulations.
This will attach `<pre><code></code></pre>` blocks to the document
as soon as the page finished loading.

```html
<script>
  function generate_code_blocks () {
    $('.demo').each(function() {
      var code = $('<pre><code class="language-html"></code></pre>');
      var demo = $(this);
      var html = demo.html().trim().replace(/ {4}/g, '  ');

      code.children().text(html);
      demo.append(code);
    });
  }

  Defer(generate_code_blocks, 0);
</script>
```
**Example**  
Sometimes, you would like your code not to run unless there is user activity.

The third argument tells `Defer()` to delay the execution of the function
and wait until the user starts interacting with your page.

```html
<style>
  body.moving {
    background: linear-gradient(270deg, #c2fff5, #eec3f0, #a1c1ff);
    background-size: 600% 600%;
    animation: moving_bg 30s ease infinite;
  }
</style>

<script>
  function make_background_animate() {
    // jQuery is used in this example to attach a class to the <body> tag.
    // You won't see the animated background until you start interacting.
    $('body').addClass('moving');
  }

  Defer(make_background_animate, 0, true);
</script>
```

* [Defer(func, [delay], [waitForUserAction])](#Defer) ⇒ <code>void</code>
    * [.lazy](#Defer.lazy) : <code>boolean</code>
    * [.all([selector], [delay], [waitForUserAction])](#Defer.all) ⇒ <code>void</code>
    * [.dom([selector], [delay], [unveiledClass], [resolver], [observeOptions])](#Defer.dom) ⇒ <code>void</code>
    * [.css(fileUrl, [id_or_attributes], [delay], [onload], [waitForUserAction])](#Defer.css) ⇒ <code>void</code>
    * [.js(fileUrl, [id_or_attributes], [delay], [onload], [waitForUserAction])](#Defer.js) ⇒ <code>void</code>
    * [.reveal(node, [unveiledClass])](#Defer.reveal) ⇒ <code>void</code>


* * *

<a name="Defer.lazy"></a>

### Defer.lazy : <code>boolean</code>
The `Defer.lazy` variable was added since v3.0.

Setting `Defer.lazy=true` tells the library to delay the execution
of deferred scripts until the user starts interacting with the page
regardless of the page load event.

It will override the default behavior of `waitForUserAction`
argument of the `Defer()` method.

Changing this variable will also affect the behavior of these functions:
- [Defer.all()](#Defer.all)
- [Defer.css()](#Defer.css)
- [Defer.js()](#Defer.js)

**Kind**: static property of [<code>Defer</code>](#Defer)  
**Default**: <code>(not set)</code>  
**Access**: public  
**Since**: 3.0  
**Example**  
To override the default behavior of the `Defer()` method.

```html
<!-- You can put this right below the script tag containing defer.min.js -->
<script>Defer.lazy = true;</script>
```

* * *

<a name="Defer.all"></a>

### Defer.all([selector], [delay], [waitForUserAction]) ⇒ <code>void</code>
Slow scripts (third-party libraries, add-ons, widgets, etc.)
may cause [Web Vitals](https://web.dev/vitals/) issues in real scenarios.

Fully deferring `<script>` tags may help your page prevent Web Vitals issues.

You can fully defer any script tag by setting its `type` attribute to `deferjs`.
This trick also works perfectly with `<script>` tags with an `src` attribute.

**Kind**: static method of [<code>Defer</code>](#Defer)  
**Note**: (1) To avoid unexpected behavior when using
the `Defer.all()` method to delay the execution of script tags,
you should call run the `Defer.all()` method with a regular script tag.  
**Note**: (2) Lazy loading behavior changed since v3.0
when you set `Defer.lazy=true` or `waitForUserAction=true`.
A `<script>` tags with `type="deferjs"` will not execute
unless the user starts interacting with your page.  
**Note**: (3) [Resource hints](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload) feature was added since v3.2
as it is recommended to prevent issues called "[Taming the Waterfall](https://blog.cloudflare.com/too-old-to-rocket-load-too-young-to-die/#quirksitamingthewaterfall)".
This feature is discussed at [#112](https://code.shin.company/defer.js/issues/112).  
**Note**: (4) Known Issue:
In iOS Safari, the first `click` event may not work
when using `Defer.all()` with `waitForUserAction` set to `true`
and one of deferred scripts make a DOM change.
View the discussion [#122](https://code.shin.company/defer.js/discussions/122) for more details.  
**Since**: 2.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [selector] | <code>string</code> | <code>&quot;[type&#x3D;deferjs]&quot;</code> | A CSS selector selects target script tags that will be Lazy loaded. |
| [delay] | <code>number</code> | <code>0</code> | A timespan, in milliseconds, that the page should wait before a script tag is executed. |
| [waitForUserAction] | <code>boolean</code> | <code>false</code> | This argument tells the `Defer.all()` method to delay the execution of scripts until there is a user interaction. |

**Example**  
Using magic `type="deferjs"` attribute:

Before:
```html
<script type="text/javascript">
  // your JavaScript is here
  console.log('This script is a normal script tag.');
</script>
```

After:
```html
<script type="deferjs">
  // your JavaScript will still be here,
  // but it will not run unless the user starts interacting with your page.
  console.info('This script is lazy loaded with type="deferjs" attribute.');
</script>
```
**Example**  
Using your value for the type attribute, such as `type="my-magic"`:

If you hate using the `type="deferjs"` attribute,
you can even choose yours by using the `Defer.all()` method.

Notice: To avoid unexpected behavior when using
the `Defer.all()` method to delay the execution of script tags,
you should call run the `Defer.all()` method with a regular script tag.

```html
<script type="my-magic">
  // your JavaScript will still be here,
  // but it will not run unless the user starts interacting with your page.
  console.log(
    'This script is lazy loaded with type="my-magic" attribute ' +
    '5 seconds after the user started interacting with your page.'
  );
</script>

<!-- Place the below line after all other script tags -->
<!-- The 2nd argument means those script tags will be delayed 5000ms -->
<script>
  Defer.all('script[type="my-magic"]', 5000);
</script>
```
**Example**  
Using the `Defer.all()` method for script tags with `src` attribute:

Your scripts will work perfectly when you mix inline scripts
and script tags with an src attribute, like the below example.

The `waitForUserAction` argument (the fifth argument) is set to `true`,
the library will defer the load of the tippy.js library until the user starts
interacting, when the user moves his/her mouse on the button, a tooltip will show.

Notice: To avoid unexpected behavior when using
the `Defer.all()` method to delay the execution of script tags,
you should call run the `Defer.all()` method with a regular script tag.


```html
<button id="tooltip-button">My button</button>

<script type="myscript" src="https://unpkg.com/@popperjs/core@2"></script>
<script type="myscript" src="https://unpkg.com/tippy.js@6"></script>

<script type="myscript">
  tippy('#tooltip-button', { content: 'Hello from Defer.js!' });
</script>

<script>
  Defer.all('script[type="myscript"]', 500, true);
</script>
```

* * *

<a name="Defer.dom"></a>

### Defer.dom([selector], [delay], [unveiledClass], [resolver], [observeOptions]) ⇒ <code>void</code>
The `Defer.dom()` method is useful in the below use cases:

- Lazy loading images, media, iframe tags, etc. on your website.
- Prevent downloading third-party libraries or add-ons unless they are needed.
- Scroll-reveal features, such as handling AJAX updating when a block is entering the viewport.
- An element that was deferred by Defer.dom() will be unveiled as soon as the page finished loading.

An element that was deferred by the `Defer.dom()` method will be unveiled
when it going to enters the browser viewport.

The `Defer.dom()` method also converts `data-*` attributes of the elements
into non-data attributes (e.g. from `data-src` to `src`).

Please check out the below examples for more details.

**Kind**: static method of [<code>Defer</code>](#Defer)  
**Since**: 2.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [selector] | <code>string</code> | <code>&quot;[data-src]&quot;</code> | A CSS selector selects target HTML elements that will be unveiled later. |
| [delay] | <code>number</code> | <code>0</code> | A timespan, in milliseconds, that the page should wait before lazy loading is applied for target elements. |
| [unveiledClass] | <code>string</code> |  | Class names that will be added to target elements when they are unveiled. |
| [resolver] | [<code>NodeHandler</code>](#NodeHandler) |  | A [NodeHandler](#NodeHandler) will check a [Node](#Node) to determine if it will be unveiled or not. If the `resolver()` callback returns `false`, the node will not be unveiled. |
| [observeOptions] | <code>object</code> |  | [Intersection observer options](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) |

**Example**  
Using the `data-src` attribute to lazy load image tags.

The browser uses the `src` attribute of
[`<img>` tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)
to trigger the image load.
It doesn't matter if it is the first or the 1,000th image in your HTML.

If the browser gets the `src` attribute,
it will trigger the image to be downloaded,
regardless of whether it is in or out of the current view.

To defer the load, put the image URL in an attribute other than `src`.
We specify the image URL in the `data-src` attribute of the image tag.
Sometimes, the `src` attribute could be used to download
a very small placeholder image before the real image gets downloaded.

```html
<div id="demo-basic">
  <img alt="A lazy image" width="200" height="300" loading="lazy"
       data-src="https://picsum.photos/id/1003/200/300">

  <img alt="A lazy image with a low-resolution placeholder"
       width="200" height="300" loading="lazy"
       src="https://picsum.photos/id/1002/20/30?blur"
       data-src="https://picsum.photos/id/1002/200/300">
</div>

<script>
  Defer.dom('#demo-basic img');
</script>
```
**Example**  
Lazy load a responsive image with `data-srcset` and `data-sizes` attributes.

Using the `srcset` attribute has made
[responsive image](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
sizing much simpler.
It allows you to define a list of differently-sized versions of the same image,
and provide information about the size of each one.
Then, the client (browser) gets to make the decision.

We can also use the same trick as the above examples.
We specify an image URL set in
`data-srcset` and `data-sizes` attributes of the image tag.

```html
<div id="demo-srcset">
  <img alt="A lazy image with srcset attribute"
       width="200" height="300" loading="lazy"
       data-sizes="200w"
       src="https://picsum.photos/id/204/20/30?blur"
       data-src="https://picsum.photos/id/204/200/300"
       data-srcset="https://picsum.photos/id/204/400/600 2x, https://picsum.photos/id/204/600/900 3x">
</div>

<script>
  Defer.dom('#demo-srcset img');
</script>
```
**Example**  
Lazy load a responsive image with flexible format selection.

Different browsers support different image formats.
We might want to send a fancy new image format such as
[WebP](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#webp_image)
to browsers that can render it, and fall back to trusty old JPEGs in browsers that don’t.

We can also use the same trick as the above examples for
[picture tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture),
and their children's HTML nodes.

```html
<div id="demo-picture">
  <picture>
    <source type="image/webp"
         data-sizes="200w"
         data-src="https://picsum.photos/id/1054/200/300.webp"
         data-srcset="https://picsum.photos/id/1054/400/600.webp 2x, https://picsum.photos/id/1054/600/900.webp 3x">

    <img alt="A lazy image with srcset attribute"
         width="200" height="300" loading="lazy"
         data-sizes="200w"
         src="https://picsum.photos/id/1054/20/30?blur"
         data-src="https://picsum.photos/id/1054/200/300"
         data-srcset="https://picsum.photos/id/1054/400/600 2x, https://picsum.photos/id/1054/600/900 3x">
  </picture>
</div>

<script>
  Defer.dom('#demo-picture picture');
</script>
```
**Example**  
Basic usage with adding CSS class.

The `Defer.dom()` method also allows you to add CSS class names when an element is unveiled.
In this example, we will add some CSS class names to make an `<img>` tag animate.

```html
<div id="demo-basic2">
  <img alt="A lazy image with animation when loaded"
       width="200" height="300" loading="lazy"
       src="https://picsum.photos/id/1024/20/30?blur"
       data-src="https://picsum.photos/id/1024/200/300">
</div>

<script>
  // this example is using animate.css library
  // see: https://animate.style
  Defer.dom('#demo-basic2 img', 0, 'animate__animated animate__backInLeft');
</script>
```
**Example**  
Lazy load inline CSS background images.

We can also defer background images for any HTML tag other than `<img>` or `<picture>`.

```html
<style>
  #demo-inline .image {
    display: inline-block;
    height: 300px;
    width: 200px;
    background: transparent 0 0 / cover no-repeat;
    border-radius: 150px;
  }
</style>

<div id="demo-inline">
  <div class="image" data-style="background-image:url(https://picsum.photos/id/1068/400/600)"></div>
  <div class="image" data-style="background-image:url(https://picsum.photos/id/1069/400/600)"></div>
  <div class="image" data-style="background-image:url(https://picsum.photos/id/1070/400/600)"></div>
</div>

<script>
  Defer.dom('#demo-inline .image');
</script>
```
**Example**  
Lazy load CSS background images.

Just another example of lazy loading background images for HTML tags,
but we can also use CSS class names instead of inline `style` attributes.

```html
<style>
  #demo-css .image {
    display: inline-block;
    height: 300px;
    width: 200px;
    background: transparent 0 0 / cover no-repeat;
    border-radius: 150px;
  }
  #pic1.shown {
    background-image: url(https://picsum.photos/id/106/400/600);
  }
  #pic2.shown {
    background-image: url(https://picsum.photos/id/206/400/600);
  }
  #pic3.shown {
    background-image: url(https://picsum.photos/id/306/400/600);
  }
</style>

<div id="demo-css">
  <div id="pic1" class="image"></div>
  <div id="pic2" class="image"></div>
  <div id="pic3" class="image"></div>
</div>

<script>
  Defer.dom('#demo-css .image', 0, 'shown');
</script>
```
**Example**  
Lazy load a video.

With the `Defer.dom()` method, we can easily defer the load of various media tags, such as a `<video>` tag.

```html
<div id="demo-video">
  <video autoplay="true" controls="true" muted="true"
         width="480" height="270"
         data-poster="https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg">
    <source type="video/mp4" data-src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4">
    <!-- <source type="video/ogg" data-src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.ogg"> -->
    <!-- <source type="video/avi" data-src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.avi"> -->
  </video>
</div>

<script>
  Defer.dom('#demo-video video', 0, 'shown');
</script>
```
**Example**  
Lazy load an iframe.

With the `Defer.dom()` method, we can effortlessly defer the load of iframe tags.

```html
<div id="demo-iframe">
  <iframe title="An iframe example"
          width="480" height="270" frameborder="0"
          src="about:blank"
          data-src="https://shinsenter.github.io/defer.js/">
  </iframe>
</div>

<script>
  Defer.dom('#demo-iframe iframe', 0, 'iframe-loaded');
</script>
```
**Example**  
Lazy load a Youtube video.

This example uses the `Defer.dom()` method to defer a load of a Youtube iframe.

```html
<div id="demo-youtube">
  <iframe title="Understanding performance with Core Web Vitals"
          width="480" height="270" frameborder="0" allowfullscreen=""
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          src="about:blank"
          data-src="https://www.youtube.com/embed/F0NYT7DIlDQ"
          data-style="background: transparent url(https://img.youtube.com/vi/F0NYT7DIlDQ/hqdefault.jpg) 50% 50% / cover no-repeat;">
  </iframe>
</div>

<script>
  Defer.dom('#demo-youtube iframe', 0, 'youtube-loaded');
</script>
```
**Example**  
Lazy load a Facebook post.

This example uses the `Defer.dom()` method to defer a load of a Facebook post.

```html
<div id="demo-facebook">
  <iframe title="An example of Facebook post"
          width="480" height="270" frameborder="0"
          scrolling="no" allowtransparency="true" allow="encrypted-media"
          src="about:blank"
          data-src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fappseeds%2Fposts%2F1502937099839267&amp;width=480&amp;show_text=true&amp;height=200">
  </iframe>
</div>

<script>
  Defer.dom('#demo-facebook iframe', 0, 'facebook-loaded');
</script>
```
**Example**  
Lazy load a Discord chat box.

This example uses the `Defer.dom()` method to defer a load of a Discord chat box.

```html
<iframe id="discord-widget" title="Discord"
        width="480" height="270" frameborder="0"
        allowtransparency="true" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        src="about:blank"
        data-src="https://discord.com/widget?id=962919929307357234&amp;theme=dark">
</iframe>

<script>
  Defer.dom('#discord-widget', 0, 'discord-loaded');
</script>
```
**Example**  
Scroll and reveal.

The `Defer.dom()` method also helps you do an action when an element is unveiled.

In this example, when the user scrolls to the bottom of the page,
he/she will see a message as soon as an element with `id="surprise-me"` appears.

```html
<script>
  Defer.dom('#surprise-me', 1000, 'seen', function(node) {
    alert('Yay!\nYou have seen all examples. Have fun with Defer.js!');
  });
</script>
```

* * *

<a name="Defer.css"></a>

### Defer.css(fileUrl, [id_or_attributes], [delay], [onload], [waitForUserAction]) ⇒ <code>void</code>
We use the `Defer.css()` method to defer a load
of external CSS files without blocking the page rendering.

**Kind**: static method of [<code>Defer</code>](#Defer)  
**Note**: Lazy loading behavior changed since v3.0
when you set `Defer.lazy=true` or `waitForUserAction=true`.
The `fileUrl` will not be fetched unless the user starts interacting with your page.  
**Since**: 2.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fileUrl | <code>string</code> |  | The URL to the CSS file that should be lazy loaded. |
| [id_or_attributes] | <code>string</code> \| <code>object</code> |  | An ID string or an attribute object for the link tag that should be added to the page. |
| [delay] | <code>number</code> | <code>0</code> | A timespan, in milliseconds, that the page should wait before the CSS file is fetched. |
| [onload] | <code>function</code> |  | A callback function will be executed if the CSS file is successfully loaded. |
| [waitForUserAction] | <code>boolean</code> | <code>false</code> | This argument tells the `Defer.css()` method to delay downloading the CSS file until there is a user interaction. |

**Example**  
Using the `Defer.css()` method to lazy load
[FontAwesome](https://fontawesome.com/docs/web/setup/get-started) (CSS and some font files).

```html
<style>
  #demo-fontawesome .far {
    font-size: 3em;
    color: green;
  }
</style>

<div id="demo-fontawesome">
  <i class="far fa-thumbs-up"></i>
  <code>@shinsenter/defer.js</code>
</div>

<script>
  var fileUrl = 'https://pro.fontawesome.com/releases/v5.14.0/css/all.css';

  Defer.css(fileUrl, {crossorigin: 'anonymous'}, 0, function() {
    console.info('FontAwesome is loaded.'); // debug
  });
</script>
```
**Example**  
Lazy load animate.css library.


In this example, we want the download of the
[Animate.css library](https://animate.style/#documentation)
to wait for the first user interaction with your page
so the `waitForUserAction` argument (the fifth argument) is set to `true`.

When the Animate.css library was downloaded,
we will add CSS classes from Animate.css to every tag with `class=".demo"` on the page.
No tag will be animated unless the user scrolls to its position.


```html
<script>
  var origin = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1';

  // This script will lazy load animate.css library
  // only when the page is displayed on a screen-based device
  Defer.css(origin + '/animate.min.css', {media: 'screen'}, 0, function () {
    console.info('Animate.css is loaded.'); // debug

    // adds animation classes to demo blocks.
    Defer.dom('.demo', 100, 'animate__animated animate__fadeIn');
  }, true);
</script>
```

* * *

<a name="Defer.js"></a>

### Defer.js(fileUrl, [id_or_attributes], [delay], [onload], [waitForUserAction]) ⇒ <code>void</code>
We use the `Defer.js()` method to defer a load of 3rd-party
JavaScript libraries, widgets, add-ons, etc. without blocking the page rendering.

**Kind**: static method of [<code>Defer</code>](#Defer)  
**Note**: (1) Because the download of a file using the `Defer.js()` method is asynchronous,
to avoid dependency error when lazy loading a third-party library using the `Defer.js()` method,
it is highly recommended that the `onload` callback function be used
to make sure that the library you needed is completely defined.  
**Note**: (2) Lazy loading behavior changed since v3.0
when you set `Defer.lazy=true` or `waitForUserAction=true`.
The `fileUrl` will not be fetched unless the user starts interacting with your page.  
**Since**: 2.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fileUrl | <code>string</code> |  | The URL to the js file that should be lazy loaded. |
| [id_or_attributes] | <code>string</code> \| <code>object</code> |  | An ID string or an attribute object for the script tag that should be added to the page. |
| [delay] | <code>number</code> | <code>0</code> | A timespan, in milliseconds, that the page should wait before the JS file is fetched. |
| [onload] | <code>function</code> |  | A callback function will be executed if the js file is successfully loaded. |
| [waitForUserAction] | <code>boolean</code> | <code>false</code> | This argument tells the `Defer.js()` method to delay downloading the JS file until there is a user interaction. |

**Example**  
An alternative way to lazy load Google Tag Manager script.

Using the `Defer.js()` method to lazy load Google Tag Manager library and its external scripts.

In this example, we want the GTM to execute as soon as the page is loaded
so the `waitForUserAction` argument (the fifth argument) is set to `false`.

```html
<script>
  var GTM_ID = 'UA-XXXXXXX-Y';
  window.dataLayer = window.dataLayer || [];
  dataLayer.push(['js', new Date()]);
  dataLayer.push(['config', GTM_ID]);

  Defer.js('https://www.googletagmanager.com/gtag/js?id=' + GTM_ID, {'data-id': GTM_ID}, 0, function() {
    console.info('Google Tag Manager is loaded.'); // debug
  }, false);
</script>
```
**Example**  
Lazy load Prism.js library.

Using Defer.js to lazy load Prism.js library and its assets.
The `<code>` blocks on the page will be rendered
only when the user scrolls to any `code` block position.

```html
<style>
  pre {
    background-color: honeydew;
  }
</style>

<script>
  // turns on manual mode
  window.Prism = window.Prism || {};
  Prism.manual = true;

  // this script will lazy load Prism.js library and its dark theme.
  // when loading is done, it will apply code formatting to every <code> tag.
  var origin = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0';
  Defer.css(origin + '/themes/prism-tomorrow.min.css', 'prism-css');
  Defer.js(origin + '/prism.min.js', 'prism-js', 0, function () {
    // enables code highlighting for code tags using Defer.dom()
    Defer.dom('pre code', 100, 'ide-loaded', Prism.highlightElement, {rootMargin: "120%"});

    console.info('Prism.js is loaded.'); // debug
  });
</script>
```
**Example**  
Lazy load a Twitter post or timeline.

This example uses the `Defer.js()` and the `Defer.dom()` method to defer a Twitter post or a timeline.
The `.lazy-timeline` or `.lazy-tweet` blocks on the page will be rendered
only when the user scrolls to the target position.

```html
<div id="demo-twitter">
  <a class="lazy-timeline" <!-- the original is class="twitter-timeline" -->
    href="https://twitter.com/TwitterDev"
    data-chrome="nofooter noborders"
    data-height="400" data-dnt="true" data-theme="dark">
    Tweets by @TwitterDev
  </a>

  <blockquote class="lazy-tweet" <!-- the original is class="twitter-tweet" -->>
    <!-- content is truncated -->
  </blockquote>
</div>
<script>
Defer.js('https://platform.twitter.com/widgets.js', 'twitter-sdk', 0, function() {
  Defer.dom('.lazy-timeline', 0, 'twitter-loaded', function(node) {
    // adds the correct class name for tweet element
    node.className = 'twitter-timeline';

    // For better performance,
    // we only search within the parent DOM tree for uninitialized widgets
    twttr.widgets.load(node.parentNode);
    console.info('Twitter timeline is loaded.'); // debug
  }, {rootMargin: "200%"});

  Defer.dom('.lazy-tweet', 0, 'twitter-loaded', function(node) {
    // adds the correct class name for timeline element
    node.className = 'twitter-tweet';

    // For better performance,
    // we only search within the parent DOM tree for uninitialized widgets
    twttr.widgets.load(node.parentNode);
    console.info('Twitter post is loaded.'); // debug
  }, {rootMargin: "200%"});
});
</script>
```
**Example**  
Lazy load an Instgram post.

This example uses the `Defer.js()` and the `Defer.dom()` method to defer an Instagram post.
The `.lazy-instagram` block on the page will be rendered
only when the user scrolls to the target position.

```html
<div id="demo-instagram">
  <blockquote class="lazy-instagram" <!-- the original is class="instagram-media" -->
    data-instgrm-captioned=""
    data-instgrm-permalink="<!-- the URL is omitted -->">
    <!-- content is truncated -->
  </blockquote>
</div>
<script>
Defer.js('https://www.instagram.com/embed.js', 'instagram-sdk', 0, function() {
  Defer.dom('.lazy-instagram', 0, 'instagram-loaded', function(node) {
    // adds the correct class name for instagram post
    node.className = 'instagram-media';

    // For better performance,
    // we only search within the parent DOM tree for uninitialized widgets
    instgrm.Embeds.process(node.parentNode);
    console.info('Instagram post is loaded.'); // debug
  }, {rootMargin: "200%"});
});
</script>
```

* * *

<a name="Defer.reveal"></a>

### Defer.reveal(node, [unveiledClass]) ⇒ <code>void</code>
Programmatically reveal a [Node](#Node) that was lazy loaded by the library.

**Kind**: static method of [<code>Defer</code>](#Defer)  
**Since**: 2.1  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>Node</code>](#Node) | An HTML node that will be unveiled |
| [unveiledClass] | <code>string</code> | Class names that will be added to the node when it is unveiled. |

**Example**  
```js
// reveals a single element
var node = document.getElementById('my-video');
Defer.reveal(node);

// reveals multiple elements
document.querySelectorAll('.multi-lazy')
  .forEach(function(node) {
    Defer.reveal(node);
  });

// a short-hand for the above code
document.querySelectorAll('.multi-lazy').forEach(Defer.reveal);

// adds 'unveiled' classname when an element unveiled
document.querySelectorAll('.multi-lazy')
  .forEach(function(node) {
    Defer.reveal(node, 'unveiled');
  });
```

* * *

<a name="defer"></a>

## ~~defer(func, [delay])~~
***Deprecated***

Deprecated from version 2.0

**Kind**: global function  
**See**: [Defer](#Defer)  
**Since**: 1.0  

| Param | Type | Default |
| --- | --- | --- |
| func | <code>function</code> |  | 
| [delay] | <code>number</code> | <code>0</code> | 


* * *

<a name="deferimg"></a>

## ~~deferimg([selector], [delay], [unveiledClass], [resolver], [observeOptions])~~
***Deprecated***

Deprecated from version 2.0

**Kind**: global function  
**See**: [dom](#Defer.dom)  
**Since**: 1.0  

| Param | Type | Default |
| --- | --- | --- |
| [selector] | <code>string</code> | <code>&quot;[data-src]&quot;</code> | 
| [delay] | <code>number</code> | <code>0</code> | 
| [unveiledClass] | <code>string</code> |  | 
| [resolver] | [<code>NodeHandler</code>](#NodeHandler) |  | 
| [observeOptions] | <code>object</code> |  | 


* * *

<a name="deferiframe"></a>

## ~~deferiframe([selector], [delay], [unveiledClass], [resolver], [observeOptions])~~
***Deprecated***

Deprecated from version 2.0

**Kind**: global function  
**See**: [dom](#Defer.dom)  
**Since**: 1.0  

| Param | Type | Default |
| --- | --- | --- |
| [selector] | <code>string</code> | <code>&quot;[data-src]&quot;</code> | 
| [delay] | <code>number</code> | <code>0</code> | 
| [unveiledClass] | <code>string</code> |  | 
| [resolver] | [<code>NodeHandler</code>](#NodeHandler) |  | 
| [observeOptions] | <code>object</code> |  | 


* * *

<a name="deferstyle"></a>

## ~~deferstyle(src, [id], [delay], [onload])~~
***Deprecated***

Deprecated from version 2.0

**Kind**: global function  
**See**: [css](#Defer.css)  
**Since**: 1.0  

| Param | Type | Default |
| --- | --- | --- |
| src | <code>string</code> |  | 
| [id] | <code>string</code> |  | 
| [delay] | <code>number</code> | <code>0</code> | 
| [onload] | <code>function</code> |  | 


* * *

<a name="deferscript"></a>

## ~~deferscript(src, [id], [delay], [onload])~~
***Deprecated***

Deprecated from version 2.0

**Kind**: global function  
**See**: [js](#Defer.js)  
**Since**: 1.0  

| Param | Type | Default |
| --- | --- | --- |
| src | <code>string</code> |  | 
| [id] | <code>string</code> |  | 
| [delay] | <code>number</code> | <code>0</code> | 
| [onload] | <code>function</code> |  | 


* * *

<a name="Node"></a>

## Node
An abstract base class upon which many other DOM API objects are based

**Kind**: global typedef  
**See**: [https://developer.mozilla.org/docs/Web/API/Node](https://developer.mozilla.org/docs/Web/API/Node)  

* * *

<a name="Function"></a>

## Function
A code snippet that can be called, or a variable that refers to the function.

**Kind**: global typedef  
**See**: [https://developer.mozilla.org/docs/Glossary/Function](https://developer.mozilla.org/docs/Glossary/Function)  

* * *

<a name="NodeHandler"></a>

## NodeHandler ⇐ [<code>Function</code>](#Function)
A [Function](#Function) receives a DOM [Node](#Node) object as its argument.

**Kind**: global typedef  
**Extends**: [<code>Function</code>](#Function)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>Node</code>](#Node) | A [Node](#Node) object |


* * *

<!-- SPONSOR.md -->

## Community

Join our vibrant community of open-source contributors and make your mark on the project! We welcome all forms of contributions and support.

[![Become a Stargazer](https://img.shields.io/badge/Become-Stargazer-yellow)](https://code.shin.company/defer.js/stargazers) [![Report an issue](https://img.shields.io/badge/New-Discussions-green)](https://code.shin.company/defer.js/discussions/new) [![Join us on Gitter](https://badges.gitter.im/shinsenter/defer.js.svg)](https://gitter.im/shinsenter/defer.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Join us on Discord](https://img.shields.io/discord/962919929307357234?color=blueviolet)](https://discord.com/channels/962919929307357234/1000635855712559165)

We use the standard [GitHub pull request process](https://help.github.com/articles/about-pull-requests) and our reviewers will be happy to help you get started.

Don't feel confident contributing code? No problem! Improving the documentation, [reporting issues](https://code.shin.company/defer.js/issues/new/choose), and [starting discussions](https://code.shin.company/defer.js/discussions/new) are all valuable contributions that we appreciate.

> [NEED HELP] Let's make the documentation and examples better together!

* * *

## Support the Project

Love the project? Show your support by [becoming a stargazer](https://code.shin.company/defer.js/stargazers) on GitHub, joining our Gitter community, or sponsoring the project.

Consider [buying the developer a coffee](https://www.paypal.me/shinsenter) or [becoming a sponsor](https://www.patreon.com/appseeds) to help fund future development.

[![Donate via PayPal](https://img.shields.io/badge/Donate-Paypal-blue)](https://www.paypal.me/shinsenter) [![Become a sponsor](https://img.shields.io/badge/Donate-Patreon-orange)](https://www.patreon.com/appseeds)

Your support is greatly appreciated.


* * *

From Vietnam 🇻🇳 with love.
