## Functions

* [Defer(func, [delay], [waitForUserAction])](#Defer) ⇒ <code>void</code>
    * [.lazy](#Defer.lazy) : <code>boolean</code> \| <code>number</code>
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
Heavy DOM changes may slow down your page.
Wrap your scripts in `Defer()` to avoid slowing page load.

**Kind**: global function  
**Since**: 2.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| func | <code>function</code> |  | A function to be executed after the page is fully loaded. |
| [delay] | <code>number</code> | <code>0</code> | Delay in milliseconds before function runs. |
| [waitForUserAction] | <code>boolean</code> \| <code>number</code> | <code>false</code> | If set, `Defer()` waits for user interaction before running the script. |

**Example**  
This example uses jQuery to modify the DOM.
It will attach `<pre><code></code></pre>` blocks to the document
as soon as the page finishes loading.

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
Sometimes you want scripts to run only after user interaction.

The third argument tells `Defer()` to delay executing the function
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
    * [.lazy](#Defer.lazy) : <code>boolean</code> \| <code>number</code>
    * [.all([selector], [delay], [waitForUserAction])](#Defer.all) ⇒ <code>void</code>
    * [.dom([selector], [delay], [unveiledClass], [resolver], [observeOptions])](#Defer.dom) ⇒ <code>void</code>
    * [.css(fileUrl, [id_or_attributes], [delay], [onload], [waitForUserAction])](#Defer.css) ⇒ <code>void</code>
    * [.js(fileUrl, [id_or_attributes], [delay], [onload], [waitForUserAction])](#Defer.js) ⇒ <code>void</code>
    * [.reveal(node, [unveiledClass])](#Defer.reveal) ⇒ <code>void</code>


* * *

<a name="Defer.lazy"></a>

### Defer.lazy : <code>boolean</code> \| <code>number</code>
The `Defer.lazy` variable was added since v3.0.

Setting `Defer.lazy=true` delays scripts until user interaction.

Changing this variable will also affect the default value
of the `waitForUserAction` argument in these functions:
- [`Defer()`](#Defer)
- [`Defer.all()`](#Defer.all)
- [`Defer.css()`](#Defer.css)
- [`Defer.js()`](#Defer.js)

**Kind**: static property of [<code>Defer</code>](#Defer)  
**Default**: <code>(not set)</code>  
**Access**: public  
**Since**: 3.0  
**Example**  
To modify default `Defer()` behavior:

```html
<!-- You can put this right below the script tag containing defer.min.js -->
<script>Defer.lazy = true;</script>
```
**Example**  
You can set a timeout period in milliseconds for the `Defer.lazy`
variable or any `waitForUserAction` argument.
Scripts run automatically after timeout without interaction.

```html
<!-- You can set a timeout period in milliseconds -->
<script>Defer.lazy = 10000; // 10 seconds</script>
```

Added in v3.8.0.
View some use cases in [this discussion](https://github.com/shinsenter/defer.js/discussions/131#discussioncomment-8775870).

* * *

<a name="Defer.all"></a>

### Defer.all([selector], [delay], [waitForUserAction]) ⇒ <code>void</code>
Slow scripts (third-party libraries, add-ons, widgets, etc.)
may cause [Web Vitals](https://web.dev/vitals/) issues in real-world scenarios.

Fully deferring scripts can help your Web Vitals.

Set script type to `deferjs` to fully defer loading.
This trick also works perfectly with `<script>` tags that have an `src` attribute.

**Kind**: static method of [<code>Defer</code>](#Defer)  
**Note**: (1) To avoid unexpected behavior when using
the `Defer.all()` method to delay executing script tags,
you should call the `Defer.all()` method with a regular script tag.  
**Note**: (2) From v3.0, scripts using `type="deferjs"` wait until user interaction if `Defer.lazy=true`.
View some use cases in [this discussion](https://github.com/shinsenter/defer.js/discussions/131#discussioncomment-8775870).  
**Note**: (4) The [Resource hints](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload) feature was added since v3.2,
as it is recommended to prevent issues called "[Taming the Waterfall](https://blog.cloudflare.com/too-old-to-rocket-load-too-young-to-die/#quirksitamingthewaterfall)".
This feature is discussed in [#112](https://code.shin.company/defer.js/issues/112).  
**Note**: (5) Known Issue:
In iOS Safari, the first `click` event may not work
when using `Defer.all()` with `waitForUserAction` set to `true`
and one of the deferred scripts makes a DOM change.
View the discussion [#122](https://code.shin.company/defer.js/discussions/122) for more details.  
**Since**: 2.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [selector] | <code>string</code> | <code>&quot;[type&#x3D;deferjs]&quot;</code> | CSS selector for scripts to lazy-load. |
| [delay] | <code>number</code> | <code>0</code> | A timespan, in milliseconds, that the page should wait before executing a script tag. |
| [waitForUserAction] | <code>boolean</code> \| <code>number</code> | <code>false</code> | This argument tells the `Defer.all()` method to delay executing scripts until there is a user interaction. |

**Example**  
Using the special `type="deferjs"` attribute:

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

If you don't like using the `type="deferjs"` attribute,
you can choose your own by using the `Defer.all()` method.

Notice: To avoid unexpected behavior when using
the `Defer.all()` method to delay executing script tags,
you should call the `Defer.all()` method with a regular script tag.

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
Using the `Defer.all()` method for script tags with the `src` attribute:

Your scripts will work perfectly when you mix inline scripts
and script tags with a `src` attribute, like the example below.

The `waitForUserAction` argument (the fifth argument) is set to `true`,
the library will defer loading the tippy.js library until the user starts
interacting. When the user moves their mouse over the button, a tooltip will show.

Notice: To avoid unexpected behavior when using
the `Defer.all()` method to delay executing script tags,
you should call the `Defer.all()` method with a regular script tag.

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
The `Defer.dom()` method is useful in the following use cases:

- Lazy-loading images, videos, iframes, etc.
- Preventing the download of third-party libraries or add-ons unless they are needed.
- Scroll-reveal features, such as handling AJAX updates when a block enters the viewport.
- An element deferred by `Defer.dom()` will be unveiled as soon as the page finishes loading.

An element deferred by the `Defer.dom()` method will be unveiled
when it is about to enter the browser viewport.

The `Defer.dom()` method also converts `data-*` attributes of the elements
into non-data attributes (e.g., from `data-src` to `src`).

See examples below for details.

**Kind**: static method of [<code>Defer</code>](#Defer)  
**Since**: 2.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [selector] | <code>string</code> | <code>&quot;[data-src]&quot;</code> | A CSS selector that selects target HTML elements that will be unveiled later. |
| [delay] | <code>number</code> | <code>0</code> | A timespan, in milliseconds, that the page should wait before applying lazy loading to target elements. |
| [unveiledClass] | <code>string</code> |  | Class names that will be added to target elements when they are unveiled. |
| [resolver] | [<code>NodeHandler</code>](#NodeHandler) |  | A [NodeHandler](#NodeHandler) that will check a [Node](#Node) to determine if it will be unveiled or not. If the `resolver()` callback returns `false`, the node will not be unveiled. |
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
Lazy loading a responsive image with `data-srcset` and `data-sizes` attributes.

Using the `srcset` attribute has made
[responsive image](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
sizing much simpler.
It allows you to define a list of differently-sized versions of the same image,
and provide information about the size of each one.
Then, the client (browser) gets to make the decision.

We can also use the same trick as the above example.
We specify an image URL set in `data-srcset` and `data-sizes` attributes of the image tag.

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
Lazy loading a responsive image with flexible format selection.

Different browsers support different image formats.
We might want to send a fancy new image format such as
[WebP](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#webp_image)
to browsers that can render it, and fall back to trusty old JPEGs in browsers that can't.

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
Basic usage with adding CSS classes.

The `Defer.dom()` method also allows you to add CSS class names when an element is unveiled.
In this example, we will add some CSS classes from Animate.css to make an `<img>` tag animate.

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
Lazy loading inline CSS background images.

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
Lazy loading CSS background images.

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
Lazy loading a video.

With the `Defer.dom()` method, we can easily defer loading various media tags, such as a `<video>` tag.

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
Lazy loading an iframe.

With the `Defer.dom()` method, we can effortlessly defer loading iframe tags.

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
Lazy loading a YouTube video.

This example uses the `Defer.dom()` method to defer loading a YouTube iframe.

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
Lazy loading a Facebook post.

This example uses the `Defer.dom()` method to defer loading a [Facebook post](https://developers.facebook.com/docs/plugins/embedded-posts/).

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
Lazy loading a Discord chat box.

This example uses the `Defer.dom()` method to defer loading a Discord chat box.

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

The `Defer.dom()` method also helps you perform an action when an element is unveiled.

In this example, when the user scrolls to the bottom of the page,
they will see a message as soon as an element with `id="surprise-me"` appears.

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
We use the `Defer.css()` method to defer loading
external CSS files without blocking the page rendering.

**Kind**: static method of [<code>Defer</code>](#Defer)  
**Note**: (1) From v3.0, scripts using `type="deferjs"` wait until user interaction if `Defer.lazy=true`.  
**Since**: 2.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fileUrl | <code>string</code> |  | CSS file URL to lazy-load. |
| [id_or_attributes] | <code>string</code> \| <code>object</code> |  | An ID string or an attribute object for the link tag that should be added to the page. |
| [delay] | <code>number</code> | <code>0</code> | A timespan, in milliseconds, that the page should wait before fetching the CSS file. |
| [onload] | <code>function</code> |  | Callback after successful load. |
| [waitForUserAction] | <code>boolean</code> \| <code>number</code> | <code>false</code> | This argument tells the `Defer.css()` method to delay downloading the CSS file until there is a user interaction. |

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
Lazy loading the Animate.css library.

In this example,
we set `waitForUserAction=5000` (the 5th parameter of the `Defer.css` function).
This means the website will wait until there is user interaction
before starting to load the [Animate.css library](https://animate.style/#documentation).
If more than 5 seconds pass without any user interaction,
the library will still be loaded and the scripts will execute.

When the Animate.css library is downloaded,
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
  }, 5000);
</script>
```

* * *

<a name="Defer.js"></a>

### Defer.js(fileUrl, [id_or_attributes], [delay], [onload], [waitForUserAction]) ⇒ <code>void</code>
We use the `Defer.js()` method to defer loading 3rd-party
JavaScript libraries, widgets, add-ons, etc. without blocking the page rendering.

**Kind**: static method of [<code>Defer</code>](#Defer)  
**Note**: (1) Because the download of a file using the `Defer.js()` method is asynchronous,
to avoid dependency errors when lazy loading a third-party library using the `Defer.js()` method,
it is highly recommended that the `onload` callback function be used
to ensure that the required library is completely defined.  
**Note**: (2) From v3.0, scripts using `type="deferjs"` wait until user interaction if `Defer.lazy=true`.  
**Since**: 2.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fileUrl | <code>string</code> |  | JavaScript file URL to lazy-load. |
| [id_or_attributes] | <code>string</code> \| <code>object</code> |  | An ID string or an attribute object for the script tag that should be added to the page. |
| [delay] | <code>number</code> | <code>0</code> | A timespan, in milliseconds, that the page should wait before fetching the JavaScript file. |
| [onload] | <code>function</code> |  | Callback after successful load. |
| [waitForUserAction] | <code>boolean</code> \| <code>number</code> | <code>false</code> | This argument tells the `Defer.js()` method to delay downloading the JavaScript file until there is a user interaction. |

**Example**  
Another way to lazy-load Google Tag Manager.

Using the `Defer.js()` method to lazy load the Google Tag Manager library and its external scripts.

In this example, we want the GTM to execute as soon as the page is loaded,
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
Lazy loading Prism.js.

Using Defer.js to lazy load the Prism.js library and its assets.
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
Lazy loading Twitter posts or timelines.

This example uses the `Defer.js()` and the `Defer.dom()` methods to defer loading a [Twitter post or timeline](https://publish.twitter.com).
The `.lazy-timeline` or `.lazy-tweet` blocks on the page will be rendered
only when the user scrolls to the target position.

```html
<div id="demo-twitter">
  <a class="lazy-timeline" <!-- the original is class="twitter-timeline" -->
    href="https://twitter.com/xai"
    data-chrome="nofooter noborders"
    data-width="480" data-height="600" data-dnt="true" data-theme="dark">
    Tweets by @xAI
  </a>

  <blockquote class="lazy-tweet" data-width="480" <!-- the original is class="twitter-tweet" -->>
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
Lazy loading Instagram posts.

This example uses the `Defer.js()` and the `Defer.dom()` methods to defer loading an [Instagram post](https://help.instagram.com/620154495870484).
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
Manually reveal an element that was lazy-loaded.

**Kind**: static method of [<code>Defer</code>](#Defer)  
**Since**: 2.1  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>Node</code>](#Node) | An HTML node that will be unveiled. |
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

// a shorthand for the above code
document.querySelectorAll('.multi-lazy').forEach(Defer.reveal);

// adds the 'unveiled' classname when an element is unveiled
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
A basic class used by many DOM API objects.

**Kind**: global typedef  
**See**: [https://developer.mozilla.org/docs/Web/API/Node](https://developer.mozilla.org/docs/Web/API/Node)  

* * *

<a name="Function"></a>

## Function
Code that can run, or a variable pointing to a function.

**Kind**: global typedef  
**See**: [https://developer.mozilla.org/docs/Glossary/Function](https://developer.mozilla.org/docs/Glossary/Function)  

* * *

<a name="NodeHandler"></a>

## NodeHandler ⇐ [<code>Function</code>](#Function)
A [Function](#Function) that receives a DOM [Node](#Node) object as its argument.

**Kind**: global typedef  
**Extends**: [<code>Function</code>](#Function)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>Node</code>](#Node) | A [Node](#Node) object |


* * *

