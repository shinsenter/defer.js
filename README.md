# defer.js

![JavaScript Style Guide: Good Parts](https://img.shields.io/badge/code%20style-goodparts-brightgreen.svg?style=flat)
![Dependency Status](https://david-dm.org/shinsenter/defer.js.svg)
[![Post an issue](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/shinsenter/defer.js/issues)
![HitCount](http://hits.dwyl.com/shinsenter/defer.js.svg)


Super tiny script to efficiently load JavaScript (and more).

![Why it fast?](https://img.shields.io/badge/start%20with-why%3F-brightgreen.svg?style=flat)

**It makes your pages feel faster.**

According to [Google's PageSpeed Insights](https://developers.google.com/speed/docs/insights/BlockingJS), loading your deferred JavaScript also means no blocking, your browsing experience needn't wait for code you may not need yet.

*TL;DR*: You can view full examples [here](https://appseeds.net/defer.js/demo.html).


## Usage

You need to load this library only once on a page, ideally right after the opening `<head>` tag:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My awesome page</title>
    <script type="text/javascript" src="//raw.githubusercontent.com/shinsenter/defer.js/master/defer.min.js"></script>
</head>
<body>

</body>
</html>
```

Because the minified version is super tiny (less than 500 bytes), you can inline its content directly into the HTML document and avoid the network request.


## Methods

### defer

```js
defer(fn [, delay = 0 [, context = null ]])
```
This method allows us to delay the execution of `fn` function in `delay` miliseconds (default: 0) after the `onload` event.

The `context` argument sets the value of `this` when the `fn` function is called.


### deferscript

```js
deferscript(src, id [, delay = 0 [, callback = function() {} ]])
```
This method allows us to load a JavaScript file from the `src` URL, then execute it after the `onload` event.

We also can assign the `id` for the `<script>` tag, and delay time in miliseconds with the `delay` argument.

The `callback` argument can be set, as you may do some great stuffs after external file is fully loaded.



## Examples

### Defer a inline script block

Delay the execution of a simple inline script (and also complex inline scipt) for 2 seconds.
```js
defer(function() {
    alert("This message is shown after 2 seconds since 'onload' event.");
}, 2000);
```

Real life example: lazy-load your images without using jQuery
```js
// here is a simple inline code block
var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

if ("IntersectionObserver" in window) {
    var lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.srcset = lazyImage.dataset.srcset;
                lazyImage.classList.remove("lazy");
                lazyImageObserver.unobserve(lazyImage);
            }
        });
    });
    lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
    });
}

// You can try wrap your code in a function, then pass it to defer() like this

function lazyLoadImages() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    if ("IntersectionObserver" in window) {
        var lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.srcset = lazyImage.dataset.srcset;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
}

defer(lazyLoadImages);

// ... or put them together like this

defer(function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    if ("IntersectionObserver" in window) {
        var lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.srcset = lazyImage.dataset.srcset;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});
```

### Defer libraries you may not need yet

Delay loading Google Publisher Tag script for 1 second (to prevent advertisement iframes that may block rendering).
```js
deferscript('//www.googletagservices.com/tag/js/gpt.js', 'gpt-js', 1000);
```

That is simple, isn't it?


Delay loading Facebook, Twitter scripts for 2 second (social widgets usually are expensive resources).
```js
deferscript('//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.5', 'facebook-jssdk', 2000);
deferscript('//platform.twitter.com/widgets.js', 'twitter-wjs', 2000);
```

It saves huge amount of HTTP requests. Don't worry, all of your loved social widgets work well 2 seconds later.

We also lazy-load 3rd-party library's JavaScript and CSS.
Thanks to highlightjs for a lightweight, extensible syntax highlighter.

```js
<script type="text/javascript">
deferstyle('https://highlightjs.org/static/demo/styles/tomorrow.css', 'highlightjs-css', 1000);
deferscript('https://highlightjs.org/static/highlight.site.pack.js', 'highlightjs-api', 1000, function() {
    var code_blocks = [].slice.call(document.querySelectorAll('pre code'));
    code_blocks.forEach(function(block) {
        hljs.highlightBlock(block);
    });
});
</script>
```
The `deferstyle` function is a part of [extended version](#extended-deferjs) of deder.js. You can read about it below.

Believe me, page speed performance is very important to us.


## Extended defer.js

I also added some extra helpers to lazy-load CSS files, images and iframes. They are all easy to use.

```html
<!DOCTYPE html>
<html>
<head>
    <title>My awesome page</title>
    <script type="text/javascript" src="//raw.githubusercontent.com/shinsenter/defer.js/master/defer_plus.min.js"></script>
</head>
<body>

</body>
</html>
```
**More powerful, but still light-weight.**
You can view all full examples [here](https://appseeds.net/defer.js/demo.html).


### deferstyle

```js
deferstyle(src, id [, delay = 0 [, callback = function() {} ]])
```

Example:
```js
deferstyle('https://highlightjs.org/static/demo/styles/tomorrow.css', 'highlightjs-css', 1000);
```


### deferimg

```js
deferimg(query_selector = 'img.lazy' [, delay = 0 [, load_class = 'lazied' [, callback = function(image) {} ]]])
```
The `this` in `callback` is a reference to the target `<img>` DOM element.

Example: Control your lazy images, anywhere, anytime.
```html
<img class="basic"
    data-src="https://picsum.photos/400/300/?image=314"
    width="400" height="300" alt="Random image" />

<script type="text/javascript">deferimg('img.basic', 100);</script>
```


### deferiframe

```js
deferiframe(query_selector = 'iframe.lazy' [, delay = 0 [, load_class = 'lazied' [, callback = function(frame) {} ]]])
```
The `this` in `callback` is a reference to the target `<iframe>` DOM element.

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
