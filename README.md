# @shinsenter/defer.js

Super tiny script to efficiently load JavaScript.

[Extended version](#extended-deferjs) supports CSS files, images and iframes. They are all easy to use.


![JavaScript Style Guide: Good Parts](https://img.shields.io/badge/code%20style-goodparts-brightgreen.svg?style=flat)
![Dependency Status](https://david-dm.org/shinsenter/defer.js.svg)
[![Post an issue](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/shinsenter/defer.js/issues)
![HitCount](http://hits.dwyl.com/shinsenter/defer.js.svg)


![Why it fast?](https://img.shields.io/badge/start%20with-why%3F-brightgreen.svg?style=flat)

**It makes your pages feel faster.**


![Scoring 100/100 on Google PageSpeed Test](assets/scores.jpg)


According to [Google's PageSpeed Insights](https://developers.google.com/speed/docs/insights/BlockingJS), loading your deferred JavaScript also means no blocking, your browsing experience needn't wait for code you may not need yet.

*TL;DR*: You can view full examples in [my demo](https://appseeds.net/defer.js/demo.html).



## Browser support

 - IE9+
 - Firefox 4+
 - Safari 3+
 - Chrome *
 - Opera *
 - Android 4+
 - iOS 3.2+

Compatibility with IE6, IE7, and IE8 has been fully dropped.



## Usage

### General usage

You need to load this library only once on a page, ideally right after the opening `<head>` tag:

```html
<head>
    <title>My awesome page</title>
    <script src="//raw.githubusercontent.com/shinsenter/defer.js/master/defer.min.js"></script>
</head>
```

Because the minified version is super tiny (less than 500 bytes), you can inline its content directly into the HTML document and avoid the network request.

If your want to lazy-load CSS files, images or iframes, let's use the [extended version](#extended-deferjs).



### Using npm

You can host [defer.js](https://npmjs.com/package/@shinsenter/defer.js) on your server, or install from [npm package](https://npmjs.com/package/@shinsenter/defer.js):

```bash
npm install @shinsenter/defer.js
```



## Methods

### defer

```javascript
defer(fn [, delay ])
```

This method allows us to delay the execution of `fn` function in `delay` miliseconds (default: 80) after the `load` event.



### deferscript

```javascript
deferscript(src, id [, delay [, callback = Function ]])
```

This method allows us to load a JavaScript file from the `src` URL, then execute it after the `load` event.

We also can assign the `id` for the `<script>` tag, and delay time in miliseconds with the `delay` argument.

The `callback` argument can be set, as you may do some great stuffs after external file is fully loaded.



## Examples

### Defer a inline script block

Delay the execution of a simple inline script (and also complex inline scipt) for 2 seconds.

```javascript
// You can use defer.js without jQuery
defer(function() {
    alert("This message is shown after 2 seconds after the 'load' event.");
}, 2000);

// Or with jQuery
defer(function () {
    $('body').html('<p>Your awesome content</p>');
}, 500);
```



### Defer libraries you may not need yet

Delay loading Google Publisher Tag script for 1 second (to prevent advertisement iframes that may block rendering).

```javascript
deferscript('//www.googletagservices.com/tag/js/gpt.js', 'gpt-js', 1000);
```

That is simple, isn't it?

---

You can delay loading Facebook, Twitter scripts for 2 second (social widgets usually are expensive resources).

```javascript
deferscript('//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.5', 'facebook-jssdk', 2000);
deferscript('//platform.twitter.com/widgets.js', 'twitter-wjs', 2000);
```

It saves huge amount of HTTP requests. Don't worry, all of your loved social widgets work well 2 seconds later.

---

We also lazy-load 3rd-party library's JavaScript and CSS.

Thanks to highlightjs for a lightweight, extensible syntax highlighter.

```html
<script type="text/javascript">
deferstyle('//highlightjs.org/static/demo/styles/tomorrow.css', 'highlightjs-css', 1000);
deferscript('//highlightjs.org/static/highlight.site.pack.js', 'highlightjs-api', 1000, function() {
    var code_blocks = [].slice.call(document.querySelectorAll('pre code'));
    code_blocks.forEach(function(block) {
        hljs.highlightBlock(block);
    });
});
</script>
```

The `deferstyle` function is a part of [extended version](#extended-deferjs) of deder.js.

Believe me, page speed performance is very important to us.



## Extended defer.js

I also added some extra helpers to lazy-load CSS files, images and iframes. They are all easy to use.

```html
<head>
    <title>My awesome page</title>
    <script src="//raw.githubusercontent.com/shinsenter/defer.js/master/defer_plus.min.js"></script>

    <!-- You may want to add small polyfill for IE 9~11 -->
    <script>deferscript('//raw.githubusercontent.com/shinsenter/defer.js/master/assets/polyfill.min.js', 'polyfill-js', 1)</script>
</head>
```

**More powerful, but still light-weight.**

You can view all full examples [here](https://appseeds.net/defer.js/demo.html).



### deferstyle

```javascript
deferstyle(src, id [, delay [, callback = Function ]])
```

Example:
```javascript
deferstyle('//highlightjs.org/static/demo/styles/tomorrow.css', 'highlightjs-css', 1000);
```



### deferimg

```javascript
deferimg(query_selector = 'img.lazy' [, delay [, load_class = 'lazied' [, callback = function(image) {} ]]])
```

The `this` in `callback` is a reference to the target `<img>` DOM element.

---

Example: Control your lazy images, anywhere, anytime.

```html
<img class="basic"
    data-src="https://picsum.photos/400/300/?image=314"
    width="400" height="300" alt="Random image" />

<script type="text/javascript">deferimg('img.basic', 100);</script>
```



### deferiframe

```javascript
deferiframe(query_selector = 'iframe.lazy' [, delay [, load_class = 'lazied' [, callback = function(frame) {} ]]])
```

The `this` in `callback` is a reference to the target `<iframe>` DOM element.

---

Example: Lazy-load iframes (Youtube videos) with CSS effect.

```html
<style type="text/css">
.fade {
    transition: opacity 500ms ease;
    opacity: 0;
}

.fade.show {
    opacity: 1;
}
</style>

<iframe class="video fade"
    data-src="https://www.youtube.com/embed/Uz970DggW7E"
    frameborder="0" width="560" height="315" allowfullscreen
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>

<script type="text/javascript">
deferiframe('iframe.video', 100, 'loaded', function(frame) {
    frame.onload = function() {
        frame.classList.add('show');
    }
});
</script>
```

---


Report an issue:

https://github.com/shinsenter/defer.js/issues

---


Released under the MIT license.
https://raw.githubusercontent.com/shinsenter/defer.js/master/LICENSE

Copyright (c) 2019 Mai Nhut Tan &lt;shin@shin.company&gt;
