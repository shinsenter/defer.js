# @shinsenter/defer.js

🥇 A super tiny, native performant library for lazy-loading JS, CSS, images, iframes... Defer anything, easily speed up your website.


![HitCount](http://hits.dwyl.com/shinsenter/defer.js.svg)
![GitHub](https://img.shields.io/github/license/shinsenter/defer.js.svg)
![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/shinsenter/defer.js.svg)
[![Post an issue](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/shinsenter/defer.js/issues)
![GitHub issues](https://img.shields.io/github/issues-raw/shinsenter/defer.js.svg)
![GitHub Release Date](https://img.shields.io/github/release-date/shinsenter/defer.js.svg)
![npm](https://img.shields.io/npm/v/@shinsenter/defer.js.svg)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@shinsenter/defer.js.svg)
![jsDelivr hits (GitHub)](https://img.shields.io/jsdelivr/gh/hm/shinsenter/defer.js.svg)



## Table of Contents






![Scoring 100/100 in Google PageSpeed Test](docs/assets/scores.jpg)



## Key notes

Other lazy loading libraries hook up to the scroll event on elements that need to be lazy loaded. This approach forces the browser to re-layout the page and it is painfully slow.

Here we are, [defer.js](https://github.com/shinsenter/defer.js) is written in plain JavaScript, making lazy-loading more efficient and performant. This library is using the recently added [Intersection Observer](https://developers.google.com/web/updates/2016/04/intersectionobserver) with tremendous native performance benefits.

- Legacy browsers support (IE9+)
- SEO friendly
- Very easy to use
- No dependencies, no jQuery
- Works well with your favorite frameworks
- Uses [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) for optimized CPU usage
- Supports for responsive images, both `srcset` and `sizes` attributes



## Browser support

Legacy browsers support. Available in latest browsers.

- IE9+ (with [W3C's Intersection Observer polyfill](https://github.com/w3c/IntersectionObserver))
- Firefox 4+
- Safari 3+
- Chrome *
- Opera *
- Android 4+
- iOS 3.2+




## Install to your page

You can load the library via **CDN** and include it right after the opening `<head>` tag of your page.

```html
<head>
    <title>My awesome page</title>
    <script src="//cdn.jsdelivr.net/npm/@shinsenter/defer.js@latest/dist/defer_plus.min.js"></script>
    <!-- And other HTML tags from here -->
</head>
```

💡 Best practice: Because the minified version is super tiny (less than 1KB), you can inline its content directly into the HTML document and avoid the network request.



Or you can install [defer.js package](https://npmjs.com/package/@shinsenter/defer.js) with npm:

```bash
npm install @shinsenter/defer.js
```



## Basic usage

### Defer loading of JavaScript

The loading and execution of scripts that are not necessary for the initial page render may be deferred until after the initial render or other critical parts of the page have finished loading. Doing so can help reduce resource contention and improve performance.

![Defer loading of JavaScript](docs/assets/defer-script.png)
*Image source: flaviocopes.com*

All you need to do now is just wrap all your code in `defer()` function.

```html
<script type="text/javascript">
    // This will defer showing an alert message after 2 seconds
    defer(function() {
        alert("This message is shown after 2 seconds after the 'load' event.");
    }, 2000);

    // Append a HTML content to the <body> tag using jQuery
    defer(function () {
        $('body').html('<p>Your awesome content</p>');
    }, 500);
</script>
```



Or defer loading and execution of external scripts with `deferscript()` function.

```html
<script type="text/javascript">
    // Alternative way to lazy load Google Tag Manager script
    deferscript('//www.googletagmanager.com/gtag/js?id=UA-34520609-2', 'google-tag', 500, function() {
        // Run extra code right after the script has been loaded
        (window.dataLayer = window.dataLayer || []).push('config', 'UA-34520609-2');
    });
</script>
```



### Lazy-load stylesheets, CSS

Along with lazied JavaScript, lazy-loading big CSS files of the document makes sense, because some times - on a slow connection - a user may wait for a maximum of 5 to 6 seconds loading your CSS files.

While the CSS files are loading, **the website is still blank**. When the browser takes up a lot of time to load your CSS files, the user may hit the back button! You just **lost a potential subscriber**.



Luckily, you can also defer you CSS files which your users may not need yet, like this:

```html
<script type="text/javascript">
    // This will lzay-load FontAwesome icons
    deferstyle('//use.fontawesome.com/releases/v5.7.2/css/all.css', 'fontawesome-css', 1000);
</script>
```



### Lazy-load media

In order to lazy-load your content, you must use some `data-` attributes instead of the actual attributes. See examples below.

💡 Best practice: To polyfill the native IntersectionObserver API in unsupporting browsers such as IE9, you may need to include below script right after the `defer_plus.min.js`.

```html
<script src="//cdn.jsdelivr.net/npm/@shinsenter/defer.js@latest/dist/defer_plus.min.js"></script>
<script>
    deferscript('//cdn.jsdelivr.net/npm/@shinsenter/defer.js@latest/dist/polyfill.min.js', 'polyfill-js', 1);
</script>
```



#### Lazy an image or a video

Put this script anywhere you want within the `<body>` tag:

```html
<script>deferimg('img[data-src], source[data-src]')</script>
```

##### Basic HTML markup

```html
<img alt="A lazy image" data-src="lazy.jpg">
```

##### Lazy an image with low quality placeholder

```html
<img alt="A lazy image" src="low-resolution.jpg" data-src="lazy.jpg">
```

##### Lazy a responsive image with `srcset` and `sizes` attributes

```html
<img alt="A lazy image"
     data-src="lazy.jpg" data-sizes="100w"
     data-srcset="lazy-360.jpg 360w, lazy-640.jpg 640w">
```

##### Lazy a responsive image with flexible format selection

```html
<picture>
    <source type="image/webp" data-sizes="100w"
            data-srcset="lazy-360.webp 360w, lazy-640.webp 640w">
    <img alt="A lazy image"
         data-src="lazy.jpg" data-sizes="100w"
         data-srcset="lazy-360.jpg 360w, lazy-640.jpg 640w">
</picture>
```

##### Lazy a responsive image with retina or Hi-DPI support

```html
<picture>
    <source media="(min-width: 800px)"
            data-srcset="lazy-800.jpg 1x, lazy-1600.jpg 2x">
    <source media="(min-width: 640px)"
            data-srcset="lazy-640.jpg 1x, lazy-1280.jpg 2x">
    <img alt="A lazy image" data-src="lazy.jpg">
</picture>
```

##### Lazy a video

```html
<video class="lazy" controls width="720" data-src="lazy.mp4" poster="lazy.jpg">
    <source type="video/mp4" data-src="lazy.mp4">
    <source type="video/ogg" data-src="lazy.ogg">
    <source type="video/avi" data-src="lazy.avi">
</video>
```




#### Lazy an iframe

Put this script anywhere you want within the `<body>` tag:

```html
<script>deferiframe('iframe[data-src],[data-style]')</script>
```

##### Basic HTML markup

```html
<iframe src="about:blank"
        data-src="lazy-frame.html"
        data-style="background: transparent url(lazy.jpg) 50% 50% / cover no-repeat;"></iframe>
```

##### Lazy a Youtube video

```html
<iframe src="about:blank"
        data-src="https://www.youtube.com/embed/<youtube-video-id>"
        data-style="background: transparent url(https://img.youtube.com/vi/<youtube-video-id>/hqdefault.jpg) 50% 50% / cover no-repeat;"
        frameborder="0" width="560" height="315" allowfullscreen
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
```

##### Lazy a Facebook post

```html
<iframe src="about:blank"
        data-src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fappseeds%2Fposts%2F1502937099839267&width=500&show_text=true&height=500"
        width="500" height="500"
        data-style="border:none;overflow:hidden"
        scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
```




### Minimal version

If you only need the `defer()` and `deferscript()` functions for lazy-loading JavaScript, you can use a [super-super compact version](https://github.com/shinsenter/defer.js/blob/develop/dist/defer.min.js) (under 500 bytes), as below:

```html
<head>
    <title>My awesome page</title>
    <script src="//cdn.jsdelivr.net/npm/@shinsenter/defer.js@latest/dist/defer.min.js"></script>
</head>
```

Yes, you can inline the whole script in your HTML document for better pagespeed performance.



## Advanced usage (for PROs)

This is the section where you can find detailed usage of each method of defer.js. Keep calm and defer everything that you want. Let's go ahead!

### 🔌 defer

```javascript
defer(func [, delay ])
```

This is our hero: the `defer` function.
This will push your function `func` into queue with its delay time.
If browser's `load` event was fired, your function will be executed.

- @param   {function}  `func`    The function
- @param   {integer}   `delay`   The delay time to call the function
- @returns {void}



### 🔌 deferscript

```javascript
deferscript(src, id [, delay [, callback = Function ]])
```

This function will lazy-load a script from given URL in `src` argument.
The tag id and delay time can be set in `id` and `delay` arguments.
Sometimes you may call a `callback` function when the file is loaded.

- @param   {string}        `src`         The file URL
- @param   {string|false}  `id`          The id of the &lt;script&gt; tag
- @param   {integer}       `delay`       The delay time to create the tag
- @param   {function}      `callback`    The callback function when load
- @returns {void}



### 🔌 deferstyle

```javascript
deferstyle(src, id [, delay [, callback = Function ]])
```

This function will lazy-load stylesheet from given URL in `src` argument.
The tag id and delay time can be set in `id` and `delay` arguments.
Sometimes you may call a `callback` function when the file is loaded.

- @param   {string}        `src`         The file URL
- @param   {string|false}  `id`          The id of the &lt;link&gt; tag
- @param   {integer}       `delay`       The delay time to create the tag
- @param   {function}      `callback`    The callback function when load
- @returns {void}



### 🔌 deferimg

```javascript
deferimg(query_selector = 'img.lazy' [, delay [, load_class = 'lazied' [, callback = function(image) {} ]]])
```
The `this` in `callback` is a reference to the target `<img>` DOM element.

- @param   {string}        `query_selector` The query selctor (default: 'img.lazy')
- @param   {integer}       `delay`          The delay time to trigger lazy-load on the image
- @param   {string|false}  `load_class`     The class name when the image is swapped its real `src`
- @param   {function}      `callback`       The callback function when the image is loaded
- @returns {void}



### 🔌 deferiframe

```javascript
deferiframe(query_selector = 'iframe.lazy' [, delay [, load_class = 'lazied' [, callback = function(frame) {} ]]])
```

The `this` in `callback` is a reference to the target `<iframe>` DOM element.

- @param   {string}        `query_selector` The query selctor (default: 'iframe.lazy')
- @param   {integer}       `delay`          The delay time to trigger lazy-load on the iframe
- @param   {string|false}  `load_class`     The class name when the iframe is swapped its real `src`
- @param   {function}      `callback`       The callback function when the iframe is loaded
- @returns {void}



## Demo

You can view full demo of using defer.js at below link.

https://appseeds.net/defer.js/demo.html

✅ See Google Pagespeed Insights test result [here](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fappseeds.net%2Fdefer.js%2Fdemo.html).



## One more thing

I added Wordpress demo of using defer.js.

You should open both of demo links in Private Mode, or make sure browser cache were cleared before the tests.

■ Original template:
https://appseeds.net/defer.js/wp/original

■ Optimized with defer.js:
https://appseeds.net/defer.js/wp/optimized

🗂 *Sponsored:*
In this demo, I used one HTML template of [Wayfarer Theme](https://www.theme-junkie.com/introducing-new-theme-wayfarer/). Thanks [Phát Bùi](https://www.facebook.com/sight.love) for sharing the HTML source.

⚠️ *Disclamers:*
I did not minify HTML, CSS and JS files. You can not get the perfect score on Pagespeed Test with this demo.



## Tips and tricks

To be updated...



## Keep in touch

[![Become a sponsor](https://c5.patreon.com/external/logo/become_a_patron_button@2x.png)](https://www.patreon.com/appseeds)


- Become a stargazer:
  https://github.com/shinsenter/defer.js/stargazers
- Report an issue:
  https://github.com/shinsenter/defer.js/issues
- Keep up-to-date with new releases:
  https://github.com/shinsenter/defer.js/releases

---

Released under the MIT license.
https://appseeds.net/defer.js/LICENSE

Copyright (c) 2019 Mai Nhut Tan &lt;[shin@shin.company](mailto:shin@shin.company)&gt;
